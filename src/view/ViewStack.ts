import { View } from './View';

export function ViewStack(...views: typeof View[]): typeof View {
    return class extends View {
        static extends = views;
    };
}
