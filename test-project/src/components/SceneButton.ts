import { AbstractButton, SimpleControl, session } from 'taktil';

import store from 'store';


export default class SceneButton extends AbstractButton<{ index: number }> {
    scene: API.Scene;
    state = { ...this.state, exists: false, color: { r: 1, g: 0, b: 1 } };

    updateControlState(control: SimpleControl) {
        control.setState({
            value: this.state.on ? control.maxValue : control.minValue,
            disabled: !this.state.exists,
            color: this.state.color,
        });
    }

    onInit() {
        this.scene = store.sceneBank.getScene(this.options.index);

        this.scene.addIsSelectedInEditorObserver(isSelected => {
            this.setState({ ...this.state, on: isSelected })
        });

        this.scene.exists().addValueObserver(sceneExists => {
            this.setState({ ...this.state, exists: sceneExists });
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
