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
    startFollow = true;

    // camera shake
    @property(cc.Float)
    shakeDuration: number = 0.5;
    @property(cc.Animation)
    anim: cc.Animation = null;
    @property(cc.Camera)
    camera: cc.Camera = null;


    //
    initZoomRatio: number = 0;
    previousPos: cc.Vec2;

    onLoad()
    {

    }

    start()
    {
        // this.previousPos = this.camera.node.position;
        // this.initZoomRatio = this.camera.zoomRatio;
    }

    update(dt)
    {
        if (this.startFollow)
        {
            this.node.position = new cc.Vec2(this.target.getPosition().x + this.followOffsetX, this.target.getPosition().y + this.followOffsetY);
        }
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

    // zoomoutsequence: cc.ActionInterval;
    // shouldZoomOut: boolean = false;
    // startZoomOut()
    // {
    //     var time = cc.delayTime(0.1);
    //     this.shouldZoomOut = true;
    //     this.zoomoutsequence = cc.sequence(time, cc.callFunc(this.CameraZoomOut, this));
    //     this.node.runAction(this.zoomoutsequence);
    // }

    // CameraZoomOut()
    // {
    //     if (this.shouldZoomOut)
    //     {
    //         if (this.camera.zoomRatio > 1.2)
    //         {
    //             var end = this.camera.zoomRatio - 0.02;
    //             this.camera.zoomRatio = this.lerp(this.camera.zoomRatio, end, 0.1);
    //         }
    //         else
    //         {
    //             this.shouldZoomOut = false;
    //         }
    //     }
    //     else
    //     {
    //         this.node.stopAction(this.zoomoutsequence);
    //     }
    // }

    // zoominsequence: cc.ActionInterval;
    // shouldZoomIn: boolean = false;
    // startZoomIn()
    // {
    //     var time = cc.delayTime(0.1);
    //     this.shouldZoomIn = true;
    //     this.zoominsequence = cc.sequence(time, cc.callFunc(this.CameraZoomNormalize, this));
    //     this.node.runAction(this.zoominsequence.repeatForever());
    // }

    // CameraZoomNormalize()
    // {
    //     if (this.shouldZoomIn)
    //     {
    //         if (this.initZoomRatio < 1)
    //         {
    //             var end = this.camera.zoomRatio + 0.013;
    //             this.camera.zoomRatio = this.lerp(this.camera.zoomRatio, end, 0.1);
    //         }
    //         else
    //         {
    //             this.shouldZoomIn = false;
    //         }
    //     }
    //     else
    //     {
    //         this.node.stopAction(this.zoominsequence);
    //     }
    // }

    // lerp(start, end, amt)
    // {
    //     return (1 - amt) * start + amt * end;
    // }
}