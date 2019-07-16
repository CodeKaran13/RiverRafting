const { ccclass, property } = cc._decorator;

@ccclass
export default class FollowPlayer extends cc.Component
{
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    _player: cc.Node = null;

    @property
    IsWaterOnly: boolean = false;

    // onLoad () {}

    start()
    {

    }

    update(dt)
    {
        if (!this.IsWaterOnly)
        {
            this.node.position = new cc.Vec2(540, this._player.position.y);
        }
        else
        {
            this.node.position = this._player.position;
        }
    }
}
