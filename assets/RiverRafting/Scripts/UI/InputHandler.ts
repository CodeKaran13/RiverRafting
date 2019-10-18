import Player from "../Player";
import CameraController from "../CameraController";
import GameManager, { GameState } from "../Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InputHandler extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;
    _playerRef: Player = null;

    @property
    xDir: number = 0;
    isGoingLeft: boolean = false;
    isGoingRight: boolean = false;

    isTouchActive: boolean = false;

    @property({
        type: CameraController,
        visible: true,
        serializable: true
    })
    _cameraController: CameraController = null;

    public static Instance: InputHandler = null;

    onLoad() {
        if (InputHandler.Instance == null) {
            InputHandler.Instance = this;
        }

        this._playerRef = Player.Instance;

        this.node.on('touchstart', (event: cc.Event.EventTouch) => {
            if (GameManager.currentGameState == GameState.InGame) {
                this.isTouchActive = true;
                if (this.xDir < 0) {
                    this.isGoingLeft = true;
                    if (!Player.Instance.IsCycloned) {
                        if (this.isGoingLeft) {
                            this.isGoingRight = false;
                            this._playerRef.StopAction(this._playerRef.currentAction);
                            this._playerRef.RotateLeft();
                        }
                    }

                }
                else if (this.xDir > 0) {
                    this.isGoingRight = true;
                    if (!Player.Instance.IsCycloned) {
                        if (this.isGoingRight) {
                            this.isGoingLeft = false;
                            this._playerRef.StopAction(this._playerRef.currentAction);
                            this._playerRef.RotateRight();
                        }
                    }
                }
            }
        }, this.node);

        this.node.on('touchend', (event: cc.Event.EventTouch) => {
            if (GameManager.currentGameState == GameState.InGame) {
                if (!Player.Instance.IsCycloned) {
                    this._playerRef.StopAction(this._playerRef.currentAction);
                    this._playerRef.RotateToCenter();
                }
            }
        }, this.node);
    }
}