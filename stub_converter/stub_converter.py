import os
import re


# currently all method args are set to not required because of lacking info

base_dir = os.path.dirname(os.path.realpath(__file__))
stubs_dir = os.path.join(base_dir, 'api-stubs')
output_path = os.path.join(base_dir, 'src', 'api-stubs.d.ts')

# clear the definiton file
open(output_path, 'w').close()


class Stub():
    def __init__(self):
        self.doc_lines = []
        self.code_lines = []
        self.is_class = False
        self.class_name = None
        self.extends_from = None
        self.is_method = False
        self.method_args = []
        self.method_name = None
        self.is_var = False
        self.returns = 'void'

    def parse_doc_string(self):
        arg_dict = {}
        for doc_line in self.doc_lines:
            is_doc_at = line_is('doc_@', doc_line)
            if is_doc_at:
                at_type = is_doc_at.group(1)
                if at_type == 'return':
                    self.returns = self._clean_type(is_doc_at.group(2))
                elif at_type == 'param':
                    arg_dict[is_doc_at.group(3)] = self._clean_type(is_doc_at.group(2))
        self.arg_dict = arg_dict
        print(arg_dict)

    def _clean_type(self, var_type):
        var_type = 'number' if var_type == 'int' else var_type
        var_type = 'number' if var_type == 'long' else var_type
        var_type = 'number' if var_type == 'double' else var_type
        var_type = 'number[]' if var_type == 'byte[]' else var_type
        var_type = 'Array<any>' if var_type == 'Object[]' else var_type
        var_type = 'Function' if var_type == 'function' else var_type
        return var_type

    def get_args_string(self):
        args = []
        for arg in self.method_args:
            if arg == '/*...*/masks':
                args.append('...masks?: string[]')
                continue
            try:
                args.append('{}?: {}'.format(arg, self.arg_dict[arg]))
            except:
                if arg: args.append('{}?'.format(arg))

        return '({}): {}'.format(', '.join(args), self.returns)


def line_is(test_type, line):
    re_dict = {
        'doc_block_start': r'^/\*\*',
        'doc_block_end': r'^ \*/',
        'doc_@': r'@(return|param) \{([A-Za-z\[\]0-9\.]+)\}? ?([\`\{\}@a-zA-Z0-9]+)',
        'code_block_start': r'\{$',
        'code_block_end': r'\};$',
        'class_def': r'^function ([A-Za-z0-9]+)',
        'extender': r'^[A-Za-z0-9]+\.prototype \= new ([A-Za-z0-9]+)',
        'trash': r'^[A-Za-z0-9]+\.prototype\.[A-Za-z0-9]+ = (?!function)[A-Za-z0-9]+|^$|^/\* ',
        'method': r'^[A-Za-z0-9]+\.prototype\.([A-Za-z0-9]+)[ ]*=[ ]*function\(((?:[A-Za-z0-9\/\*\.]+,? ?)*)',
        'var': r'^var|^[A-Za-z0-9]+ = \{$',
    }
    return re.search(re_dict[test_type], line)


def sort_stubs(stubs):
    for stub in stubs:
        if stub.is_var:
            stubs.remove(stub)
            stubs.append(stub)


def convert(stub_file_path):
    stubs = []
    with open(stub_file_path, 'r') as stub_file:
        stub = None
        line_number = 0
        in_doc_block = False
        in_code_block = False

        for line in stub_file:
            line_number += 1
            # rm newline char an all other right whitespace
            line = line.rstrip()
            if line_is('trash', line):
                continue

            if line_is('doc_block_start', line):
                in_doc_block = True
                stub = Stub()
                stubs.append(stub)

            if in_doc_block:
                stub.doc_lines.append(line)
                if line_is('doc_block_end', line):
                    in_doc_block = False
                continue

            if line_is('code_block_start', line):
                stub.is_var = True
                in_code_block = True

            if in_code_block:
                # print(line)
                stub.code_lines.append(line)
                if line_is('code_block_end', line):
                    in_code_block = False
                continue

            # check if is class extension
            is_extender = line_is('extender', line)
            if is_extender:
                stub.extends_from = is_extender.group(1)
                continue

            # handle code lines
            is_class_def = line_is('class_def', line)
            is_method = line_is('method', line)
            is_var = line_is('var', line)
            if is_class_def or is_method or is_var:
                stub.code_lines.append(line)
                if is_class_def:
                    stub.is_class = True
                    stub.class_name = is_class_def.group(1)
                elif is_method:
                    stub.is_method = True
                    stub.method_name = is_method.group(1)
                    stub.method_args = [
                        arg.strip() for arg in is_method.group(2).split(',')]
                elif is_var:
                    stub.is_var = True
                continue
            # not sure whats on this line
            raise Exception('Unexpected file format: ' + stub_file_path + ':' + str(line_number))

    # sort the stubs with the vars at the end
    sort_stubs(stubs)

    # turn the stubs into ts compatible text and wrie it to the file
    process_stubs(stubs)


def process_stubs(stubs):
    with open(output_path, 'a') as output_file:
        def write(text):
            output_file.write(text)
            output_file.write('\n')
        doc_string = '\n'.join(stubs[0].doc_lines)
        class_name = stubs[0].class_name
        extends_from = stubs[0].extends_from
        if extends_from:
            class_signature = 'declare class {class_name} extends {extends_from} {{'.format(
                class_name=class_name, extends_from=extends_from)
        else:
            class_signature = 'declare class {class_name} {{'.format(
                class_name=stubs[0].class_name)

        result = '{doc_string}\n{class_signature}\n'.format(
            doc_string=doc_string, class_signature=class_signature)

        first_iteration = True
        class_closed = False
        for stub in stubs:
            stub.parse_doc_string()
            # print(stub.code_lines)
            if first_iteration:
                first_iteration = False
                continue;
            if stub.is_class:
                raise Exception(stub.code_lines)

            if not stub.is_var:
                doc_string = '\n    '.join(stub.doc_lines)
                result += ('    {doc_string}\n'
                           '    {method_name}{arg_string};\n\n'
                           .format(doc_string=doc_string,
                                   method_name=stub.method_name,
                                   arg_string=stub.get_args_string()))
            else:
                if not class_closed:
                    result += '}\n'
                    class_closed = True
                code_string = '\n'.join(stub.code_lines)
                # print(code_string)
                result += '\n{code_string}\n'.format(code_string=code_string)

        if not class_closed:
            result += '}\n'
        write(result)



for file_name in os.listdir(os.path.join(base_dir, 'api-stubs')):
    stub_file_path = os.path.join(stubs_dir, file_name)
    if os.path.isfile(stub_file_path):
        convert(stub_file_path)

# host_stub_file_path = os.path.join(stubs_dir, 'Host.js')
# convert(host_stub_file_path)
