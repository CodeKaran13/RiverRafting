import GameManager, { GameState } from "./Managers/GameManager";
import MatchManager from "./Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraController extends cc.Component {
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    target: cc.Node = null;
    @property
    followOffsetX: number = 0;
    @property
    followOffsetY: number = 500;
    startFollow = false;

    // camera shake
    @property(cc.Float)
    shakeDuration: number = 0.5;
    @property(cc.Animation)
    anim: cc.Animation = null;
    @property(cc.Camera)
    camera: cc.Camera = null;
    @property(cc.Camera)
    waveCamera: cc.Camera = null;


    // camera zoom
    initZoomRatio: number = 0;
    previousPos: cc.Vec2;

    public static Instance: CameraController = null;

    onLoad() {

    }

    start() {
        if (CameraController.Instance == null) {
            CameraController.Instance = this;
        }
        this.initZoomRatio = this.camera.zoomRatio;
        this.previousPos = this.node.position;
    }

    update(dt) {
        if (GameManager.currentGameState == GameState.InGame && !this.startFollow) {
            this.startFollow = true;
            this.startZoomIn();
        }

        if (this.startFollow) {
            // this.node.position = new cc.Vec2(this.target.getPosition().x + this.followOffsetX, this.target.getPosition().y + this.followOffsetY);
            var Pos = new cc.Vec2(this.target.position.x + this.followOffsetX, this.target.position.y + this.followOffsetY);
            this.node.position = this.node.parent.convertToNodeSpaceAR(Pos);
        }

        // console.log('camera zoom: ' + this.camera.zoomRatio);
    }

    cameraShake() {
        this.anim.play('shake');
        this.scheduleOnce(this.stopShake.bind(this), this.shakeDuration);
    }

    stopShake() {
        this.anim.stop();
        this.camera.node.position = cc.p(0, 0);
    }

    zoominsequence: cc.ActionInterval;
    shouldZoomIn: boolean = false;
    startZoomIn() {
        var time = cc.delayTime(0.02);
        this.shouldZoomIn = true;
        this.zoominsequence = cc.sequence(time, cc.callFunc(this.CameraZoomIn, this));
        this.node.runAction(this.zoominsequence.repeatForever());
    }

    CameraZoomIn() {
        if (this.shouldZoomIn) {
            if (this.camera.zoomRatio <= 3.5) {
                // console.log('zooming in..');
                var end = this.camera.zoomRatio + 0.2;
                var end1 = this.waveCamera.zoomRatio + 0.2;
                this.camera.zoomRatio = this.lerp(this.camera.zoomRatio, end, 0.1);
                this.waveCamera.zoomRatio = this.lerp(this.waveCamera.zoomRatio, end1, 0.1);
            }
            else {
                this.shouldZoomIn = false;
            }
        }
        else {
            this.node.stopAction(this.zoominsequence);
            // MatchManager.Instance._startRiverMap1.OnStartGame();
            // MatchManager.Instance._startRiverMap2.OnStartGame();
        }
    }

    zoomnormalizeseq: cc.ActionInterval;
    shouldNormalize: boolean = false;
    startNormalize() {
        var time = cc.delayTime(0.1);
        this.shouldNormalize = true;
        this.zoomnormalizeseq = cc.sequence(time, cc.callFunc(this.CameraZoomNormalize, this));
        this.node.runAction(this.zoomnormalizeseq.repeatForever());
    }

    CameraZoomNormalize() {
        if (this.shouldNormalize) {
            if (this.camera.zoomRatio > 1) {
                var end = this.camera.zoomRatio - 0.1;
                this.camera.zoomRatio = this.lerp(this.camera.zoomRatio, end, 0.1);
            }
            else {
                this.shouldZoomIn = false;
            }
        }
        else {
            this.node.stopAction(this.zoomnormalizeseq);
        }
    }

    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }
}

