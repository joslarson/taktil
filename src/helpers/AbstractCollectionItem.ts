import Collection from './Collection';
import { guid } from '../utils';


abstract class AbstractCollectionItem {
    id: string = guid();
    private _collection: Collection<AbstractCollectionItem>;

    hasCollection(): boolean {
        return Boolean(this._collection);
    }

    getCollection(): Collection<AbstractCollectionItem> {
        return this._collection;
    }

    setCollection(collection: Collection<AbstractCollectionItem>): void {
        if (this._collection) throw 'Item already belongs to a collection.';
        this._collection = collection;
    }

    unsetCollection(): void {
        this._collection = undefined;
        if (this._collection.has(this)) this._collection.remove(this);
    }

    getName(): string {
        return this._collection.keyOf(this);
    }
}


export default AbstractCollectionItem;
