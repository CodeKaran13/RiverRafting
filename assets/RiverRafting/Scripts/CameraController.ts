import GameManager, { GameState } from "./Managers/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraController extends cc.Component
{
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


    // camera zoom
    initZoomRatio: number = 0;
    previousPos: cc.Vec2;

    onLoad()
    {

    }

    start()
    {
        this.initZoomRatio = this.camera.zoomRatio;
        this.previousPos = this.node.position;
    }

    update(dt)
    {
        if (GameManager.currentGameState == GameState.InGame && !this.startFollow)
        {
            this.startFollow = true;
        }

        if (this.startFollow)
        {
            // this.node.position = new cc.Vec2(this.target.getPosition().x + this.followOffsetX, this.target.getPosition().y + this.followOffsetY);
            var Pos = new cc.Vec2(this.target.position.x + this.followOffsetX, this.target.position.y + this.followOffsetY);
            this.node.position = this.node.parent.convertToNodeSpaceAR(Pos);
        }

        // console.log('camera zoom: ' + this.camera.zoomRatio);
    }

    cameraShake()
    {
        this.anim.play('shake');
        this.scheduleOnce(this.stopShake.bind(this), this.shakeDuration);
    }

    stopShake()
    {
        this.anim.stop();
        this.camera.node.position = cc.p(0, 0);
    }

    zoominsequence: cc.ActionInterval;
    shouldZoomIn: boolean = false;
    startZoomIn()
    {
        var time = cc.delayTime(0.1);
        this.shouldZoomIn = true;
        this.zoominsequence = cc.sequence(time, cc.callFunc(this.CameraZoomIn, this));
        this.node.runAction(this.zoominsequence.repeatForever());
    }

    CameraZoomIn()
    {
        if (this.shouldZoomIn)
        {
            if (this.camera.zoomRatio < 1.2)
            {
                // console.log('zooming in..');
                var end = this.camera.zoomRatio + 0.1;
                this.camera.zoomRatio = this.lerp(this.camera.zoomRatio, end, 0.1);
            }
            else
            {
                this.shouldZoomIn = false;
            }
        }
        else
        {
            this.node.stopAction(this.zoominsequence);
        }
    }

    zoomnormalizeseq: cc.ActionInterval;
    shouldNormalize: boolean = false;
    startNormalize()
    {
        var time = cc.delayTime(0.1);
        this.shouldNormalize = true;
        this.zoomnormalizeseq = cc.sequence(time, cc.callFunc(this.CameraZoomNormalize, this));
        this.node.runAction(this.zoomnormalizeseq.repeatForever());
    }

    CameraZoomNormalize()
    {
        if (this.shouldNormalize)
        {
            if (this.camera.zoomRatio > 1)
            {
                var end = this.camera.zoomRatio - 0.1;
                this.camera.zoomRatio = this.lerp(this.camera.zoomRatio, end, 0.1);
            }
            else
            {
                this.shouldZoomIn = false;
            }
        }
        else
        {
            this.node.stopAction(this.zoomnormalizeseq);
        }
    }

    lerp(start, end, amt)
    {
        return (1 - amt) * start + amt * end;
    }
}