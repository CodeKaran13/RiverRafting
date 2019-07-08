import Collectibles, { CollectibleType } from "./Collectibles";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HealthPack extends Collectibles
{
    @property
    health: number = 20;

    myPos: any;

    onLoad() 
    {

    }

    start()
    {
        this.myType = CollectibleType.Health;
    }

    onEnable() 
    {
        this.myPos = this.node.convertToWorldSpace(cc.Vec2.ZERO).y;
    }

    onDisable()
    {
        this.myPos = 0;
    }

    update(dt) 
    {
        if (this.node.active)
        {
            if (cc.find('Player').position.y - 500 > this.myPos)
            {
                console.log('player is above me');
                this._CollectiblePoolRef.addCollectibleBackToPool(this.node);
            }
        }
    }

    onCollisionEnter(other, self)
    {
        if (other.node.name == 'Player')
        {
            // console.log('player collided health');
            other.node.getComponent('HealthManager').increaseHP(this.health);
            this._CollectiblePoolRef.addCollectibleBackToPool(this.node);
        }
    }
}
