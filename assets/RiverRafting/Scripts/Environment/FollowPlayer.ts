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
    @property
    IsBoatWaveAnimation: boolean = false;
    @property
    IsHealthBar: boolean = false;

    @property
    OffsetX: number = 0;
    @property
    OffsetY: number = 0;

    // onLoad () {}

    start()
    {

    }

    update(dt)
    {
        if (!this.IsWaterOnly && !this.IsBoatWaveAnimation && !this.IsHealthBar)
        {
            this.node.position = new cc.Vec2(540, this._player.position.y);
        }
        else if (this.IsBoatWaveAnimation)
        {
            this.node.position = new cc.Vec2(this._player.position.x + this.OffsetX, this._player.position.y + this.OffsetY);
        }
        else if (this.IsHealthBar)
        {
            this.node.position = new cc.Vec2(this._player.position.x, this._player.position.y + this.OffsetY);
        }
        else
        {
            this.node.position = this._player.position;
        }
    }
}
