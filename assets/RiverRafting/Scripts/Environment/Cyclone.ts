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
        if (other.node.name == 'Player')
        {
            if (!this.triggerOnce)
            {
                this.triggerOnce = true;
                console.log('entered cyclone');
                // other.node.getComponent(Player).IsCycloned = true;
                // other.node.getComponent(Player).startCyclone();
            }
        }
    }
}
