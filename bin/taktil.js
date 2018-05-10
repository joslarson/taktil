#!/usr/bin/env node
const program = require('commander');
const uuid = require('uuid/v1');
const colors = require('colors/safe');

const init = require('./tasks/init');
const build = require('./tasks/build');

// taktil init command
program
    .command('init [dirname]')
    .description('Initialize a new project with dirname (defaults to current directory).')
    .option('-t, --typescript', 'setup project to use TypeScript')
    .action((dirname, options) => init(dirname, options.typescript));

// taktil build command
program
    .command('build [project_root]')
    .description('Build Taktil project located at project_root (defaults to current directory).')
    .option('-p, --production', "build using Webpack's production mode")
    .action((project_root, { production }) => build(project_root, { production }));

// taktil watch command
program
    .command('watch [project_root]')
    .description('Watches Taktil project located at project_root (defaults to current directory).')
    .option('-p, --production', "build using Webpack's production mode")
    .action((project_root, { production }) => build(project_root, { production, watch: true }));

// taktil uuid generator
program
    .command('uuid')
    .description('Generate a UUID')
    .action(() => console.log(colors.bold(colors.magenta(`[taktil]`)), colors.green(uuid())));

// parse args and run commands
program.parse(process.argv);

// no command? print help
if (!process.argv.slice(2).length) program.outputHelp();
