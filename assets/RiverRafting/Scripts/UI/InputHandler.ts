import Player from "../Player";
import CameraController from "../CameraController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InputHandler extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;
    _playerRef: Player = null;

    @property
    xDir: number = 0;

    isTouchActive: boolean = false;

    @property({
        type: CameraController,
        visible: true,
        serializable: true
    })
    _cameraController: CameraController = null;

    onLoad() {
        this._playerRef = this.player.getComponent('Player');

        this.node.on('touchstart', (event: cc.Event.EventTouch) => {
            this.isTouchActive = true;
            if (this.xDir < 0) {
                // this._playerRef.ApplyBrakeSequence();
                if (!Player.Instance.IsCycloned) {
                    this._playerRef.StopAction(this._playerRef.currentAction);
                    this._playerRef.RotateLeft();
                }

                // this._cameraController.startZoomIn();
            }
            else if (this.xDir > 0) {
                // this._playerRef.ApplyBrakeSequence();
                if (!Player.Instance.IsCycloned) {
                    this._playerRef.StopAction(this._playerRef.currentAction);
                    this._playerRef.RotateRight();
                }
                // this._cameraController.startZoomIn();
            }
            // this._playerRef.restartCounter();
            // this._playerRef.startCounter();
        }, this.node);

        this.node.on('touchend', (event: cc.Event.EventTouch) => {
            // this.isTouchActive = false;
            if (!Player.Instance.IsCycloned) {
                this._playerRef.StopAction(this._playerRef.currentAction);
                this._playerRef.RotateToCenter();
            }
            // this._cameraController.shouldZoomIn = false;
            // this._cameraController.startNormalize();
            // this._playerRef.restartCounter();
            // this.onKeyUp();
        }, this.node);
    }

    onKeyDown() {
        // this.player.setPosition(new cc.Vec2(this.player.position.x + (this.xDir * this._playerRef.turnSpeed), this.player.position.y));

    }

    onKeyUp() {

    }
}