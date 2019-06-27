const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraController extends cc.Component
{

    @property
    smoothFollow: boolean = true;

    @property
    overview: boolean = false;

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

    onLoad()
    {

    }

    start()
    {

    }

    update(dt)
    {

        if (this.startFollow)
        {
            this.node.position = new cc.Vec2(this.target.getPosition().x + this.followOffsetX, this.target.getPosition().y + this.followOffsetY);
        }
    }
}