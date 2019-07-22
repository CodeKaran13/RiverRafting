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
    waveOffsetX: number = 0;
    @property
    waveOffsetY: number = 0;

    // onLoad () {}

    start()
    {

    }

    update(dt)
    {
        if (!this.IsWaterOnly && !this.IsBoatWaveAnimation)
        {
            this.node.position = new cc.Vec2(540, this._player.position.y);
        }
        else if (this.IsBoatWaveAnimation)
        {
            this.node.position = new cc.Vec2(this._player.position.x + this.waveOffsetX, this._player.position.y + this.waveOffsetY);
        }
        else
        {
            this.node.position = this._player.position;
        }
    }
}
