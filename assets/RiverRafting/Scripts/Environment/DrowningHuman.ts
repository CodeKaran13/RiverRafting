import Collectibles, { CollectibleType } from "../GamePlay/Collectibles";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DrowningHuman extends Collectibles
{
    start()
    {
        this.myType = CollectibleType.DrowningHuman;
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
                // console.log('drowning human, player is above me');
                // this.node.getComponent(cc.RenderComponent).enabled = true;
                this._CollectiblePool.addCollectibleBackToPool(this.node);
            }
        }
    }

    onCollisionEnter(other, self)
    {
        if(other.node.name == this._player.name)
        {
            // console.log('player collided coin');

            // increase score
            this._scoreManager.totalHumanSaved += 1;
            this._scoreManager.AddScore(this._scoreManager.perHumanSavedBonus);
            // this.node.getComponent(cc.RenderComponent).enabled = true;
            this._CollectiblePool.addCollectibleBackToPool(this.node);
        }
    }
}
