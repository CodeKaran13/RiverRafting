import Player from "../Player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Cyclone extends cc.Component
{
    @property({
        type: Player,
        visible: true,
        serializable: true
    })
    _player: Player = null;

    triggerOnce: boolean = false;

    onCollisionEnter(other, self)
    {
        if (self.tag == 0 && other.node.name == 'Player')
        {
            if (!this.triggerOnce)
            {
                this.triggerOnce = true;
                // this.node.getComponent(cc.CircleCollider).enabled = false;
                console.log('entered cyclone');
                other.node.getComponent(Player).IsCycloned = true;
                other.node.getComponent(Player).startCyclone(this.node.convertToWorldSpaceAR(cc.Vec2.ZERO));
                other.node.getComponent(Player).startCycloneEffect();
            }
        }
        if (self.tag == 1 && other.node.name == 'Player')
        {
            console.log('center');
            this.node.active = false;
            other.node.getComponent(Player).reachedCenter = true
        }
    }
}