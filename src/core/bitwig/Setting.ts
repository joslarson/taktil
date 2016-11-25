import ApiProxy from './ApiProxy';


class Setting extends ApiProxy {

}


/**
 * A common base interface for labeled and categorized settings.
 *
 * @since Bitwig Studio 1.1
 */
declare interface Setting {
    /**
     * Returns the category name of the setting.
     *
     * @return {string} a string value containing the category name
     * @since Bitwig Studio 1.1
     */
    getCategory(): string;

    /**
     * Returns the label text of the setting.
     *
     * @return {string} a string value containing the label text
     * @since Bitwig Studio 1.1
     */
    getLabel(): string;

    /**
     * Marks the settings as enabled in Bitwig Studio. By default the setting is enabled.
     *
     * @since Bitwig Studio 1.1
     */
    enable(): void;

    /**
     * Marks the settings as disabled in Bitwig Studio. By default the setting is enabled.
     *
     * @since Bitwig Studio 1.1
     */
    disable(): void;

    /**
     * Shows the setting in Bitwig Studio. By default the setting is shown.
     *
     * @since Bitwig Studio 1.1
     */
    show(): void;

    /**
     * Hides the setting in Bitwig Studio. By default the setting is shown.
     *
     * @since Bitwig Studio 1.1
     */
    hide(): void;
}


export default Setting;
