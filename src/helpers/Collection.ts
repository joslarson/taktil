import AbstractCollectionItem from './AbstractCollectionItem';


export default class Collection<ItemType extends AbstractCollectionItem> {
    protected _keys: string[] = [];
    protected _items: ItemType[] = [];

    keys(): string[] {
        return this._keys.slice(0);  // cloned this._keys
    }

    items(): ItemType[] {
        return this._items.slice(0);  // cloned this._items
    }

    get(key: string) {
        return this._items[this.indexOf(key)];
    }

    add(key: string, item: ItemType): void {
        if (this.has(key)) this.remove(key);
        this._items.push(item);
        this._keys.push(key);
        item.setCollection(this);
    }

    remove(keyOrItem:string|ItemType): void {
        let index = this.indexOf(keyOrItem);
        let item = this._items[index];

        // remove item from collection
        this._items.splice(index, 1);
        this._keys.splice(index, 1);
        // remove collection link from item
        if (item.hasCollection()) item.unsetCollection();
    }

    has(keyOrItem:string|ItemType): boolean {
        return this.indexOf(keyOrItem) > -1;
    }

    indexOf(keyOrItem:string|ItemType): number {
        if (keyOrItem instanceof AbstractCollectionItem) {
            let item = keyOrItem;
            return this._items.indexOf(item);
        } else {
            let key = keyOrItem;
            return this._keys.indexOf(key);
        }
    }

    keyOf(item:ItemType): string {
        return this._keys[this.indexOf(item)];
    }
}
