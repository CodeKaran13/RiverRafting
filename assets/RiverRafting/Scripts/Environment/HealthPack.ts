import Collectibles, { CollectibleType } from "../GamePlay/Collectibles";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HealthPack extends Collectibles
{
    @property
    health: number = 20;

    start()
    {
        this.myType = CollectibleType.Health;
    }
    onEnable() 
    {
        this.myPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO).y;
    }
    onDisable()
    {
        this.myPos = 0;
    }
    update(dt) 
    {
        if (this.node.active)
        {
            if (this._player.position.y - 500 > this.myPos)
            {
                // console.log('healthpack, player is above me');
                this._CollectiblePool.addCollectibleBackToPool(this.node);
            }
        }
    }

    onCollisionEnter(other, self)
    {
        if (other.node.name == this._player.name)
        {
            // console.log('player collided health');
            this._player.getComponent('HealthManager').increaseHP(this.health);
            this._CollectiblePool.addCollectibleBackToPool(this.node);
        }
    }
}
