const { ccclass, property } = cc._decorator;

@ccclass
export default class Canvas extends cc.Component
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
    followOffsetY: number = 0;

    // onLoad () {}

    start()
    {

    }

    update(dt)
    {
        this.node.position = new cc.Vec2(this.target.getPosition().x + this.followOffsetX, this.target.getPosition().y + this.followOffsetY);
    }
}
