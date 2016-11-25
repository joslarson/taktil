import ApiProxy from './ApiProxy';
import BrowserFilterItem from './BrowserFilterItem';


class CursorBrowserFilterItem extends BrowserFilterItem {

}


/**
 * Instances of this interface represent entries in a browser filter column.
 *
 * @since Bitwig Studio 1.2
 */
declare interface CursorBrowserFilterItem extends BrowserFilterItem {
    /**
     * Select the parent item.
     *
     * @since Bitwig Studio 1.2
     */
    selectParent(): void;

    /**
     * Select the first child item.
     *
     * @since Bitwig Studio 1.2
     */
    selectFirstChild(): void;

    /**
     * Select the last child item.
     *
     * @since Bitwig Studio 1.2
     */
    selectLastChild(): void;

    /**
     * Select the previous item.
     *
     * @since Bitwig Studio 1.1
     */
    moveToPrevious(): void;

    /**
     * Select the next item.
     *
     * @since Bitwig Studio 1.1
     */
    moveToNext(): void;

    /**
     * Select the first item.
     *
     * @since Bitwig Studio 1.1
     */
    moveToFirst(): void;

    /**
     * Select the last item.
     *
     * @since Bitwig Studio 1.1
     */
    moveToLast(): void;

    /**
     * Select the parent item.
     *
     * @since Bitwig Studio 1.2
     */
    moveToParent(): void;

    /**
     * Move the cursor to the first child item.
     *
     * @since Bitwig Studio 1.2
     */
    moveToFirstChild(): void;

    /**
     * Move the cursor to the last child item.
     *
     * @since Bitwig Studio 1.2
     */
    moveToLastChild(): void;
}


export default CursorBrowserFilterItem;
