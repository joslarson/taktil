import { AbstractButton, AbstractSimpleControl, Color, session } from 'taktil';

import store from 'store';


interface SceneButtonState {
    on: boolean;
    color: Color;
    exists: boolean;
    empty: boolean;
}

export default class SceneButton extends AbstractButton<{ index: number }, SceneButtonState> {
    scene: API.Scene;
    
    getInitialState() {
        return { on: false, exists: false, empty: true, color: { r: .5, g: 0, b: 1 } };
    }

    getControlOutput(control: AbstractSimpleControl) {
        const { on, empty, color } = this.state;
        return { value: on ? 1 : 0, disabled: empty, color: color };
    }

    onInit() {
        this.scene = store.sceneBank.getScene(this.options.index);

        this.scene.addIsSelectedInEditorObserver(isSelected => {
            this.setState({ on: isSelected })
        });

        this.scene.exists().addValueObserver(sceneExists => {
            this.setState({ exists: sceneExists });
        });

        this.scene.clipCount().addValueObserver(clipCount => {
            this.setState({ empty: clipCount === 0 });
        });
    }

    onPress() {
        if (!session.modeIsActive('SELECT')) {
            if (!this.scene.exists().get()) {
                for (let i = 0; i <= this.options.index; i++) {
                    if (!store.sceneBank.getScene(i).exists().get()) store.createScene.invoke();
                }
            } else {
                this.scene.launch();
            }
        }
        this.scene.selectInEditor();
    }
}
