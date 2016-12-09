import ApiProxy from './ApiProxy';
import Settings from './Settings';
import Signal from './Signal';
import EnumValue from './EnumValue';
import StringValue from './StringValue';
import RangedValue from './RangedValue';


class Preferences extends Settings {

}


/**
 * This interface is used to store custom controller settings into the Bitwig Studio preferences.
 * The settings are shown to the user in the controller preferences dialog of Bitwig Studio.
 *
 * @since Bitwig Studio 1.1
 */
declare interface Preferences extends Settings {
    getSignalSetting(label: string, category: string, action: string): Signal;

    getNumberSetting(label: string, category: string, minValue: number, maxValue: number, stepResolution: number, unit: string, initialValue: number): RangedValue;

    getEnumSetting(label: string, category: string, options: string[], initialValue: string): EnumValue;

    getStringSetting(label: string, category: string, numChars: number, initialText: string): StringValue;
}


export default Preferences;
