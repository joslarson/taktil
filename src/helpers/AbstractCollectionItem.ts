import Collection from './Collection';
import {guid} from '../utils';


abstract class AbstractCollectionItem {
    id: string = guid();
    private collection: Collection<AbstractCollectionItem>;

    hasCollection(): boolean {
        return Boolean(this.collection);
    }

    getCollection(): Collection<AbstractCollectionItem> {
        return this.collection;
    }

    setCollection(collection: Collection<AbstractCollectionItem>): void {
        if (this.collection) throw 'Item already belongs to a collection.';
        this.collection = collection;
    }

    unsetCollection(): void {
        this.collection = undefined;
        if (this.collection.has(this)) this.collection.remove(this);
    }

    name(): string {
        return this.collection.keyOf(this);
    }
}


export default AbstractCollectionItem;
