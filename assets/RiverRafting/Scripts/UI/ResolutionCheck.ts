import UIManager from "../Managers/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResolutionCheck extends cc.Component {
    @property(cc.Canvas)
    canvas: cc.Canvas = null;

    @property(cc.Camera)
    mainCamera: cc.Camera = null;

    // @property(cc.Camera)
    // secondCamera: cc.Camera = null;

    value: number = 0.51;

    start() {
        this.getResolution();
    }

    getResolution() {
        var x = window.screen.width * window.devicePixelRatio;
        var y = window.screen.height * window.devicePixelRatio;

        // console.log(screen.width);
        // console.log(screen.height);
        // console.log(x + ', ' + y);

        // this.canvas.designResolution.width = x;
        // this.canvas.designResolution.height = y;


        var ratio = x / y;

        if (ratio > this.value) {
            // this.mainCamera.zoomRatio = 0.8;
            // this.secondCamera.zoomRatio = 1;

        }
        else {
            UIManager.Instance.GameWindow.children[3].setPosition(0, (y / 2) - 200);
            // this.mainCamera.zoomRatio = 1;
            // this.secondCamera.zoomRatio = 0.8;
        }
    }

}
