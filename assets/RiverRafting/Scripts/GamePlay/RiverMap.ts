import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RiverMap extends cc.Component
{

    @property({
        type: MatchManager,
        visible: true,
        serializable: true
    })
    _matchManagerRef: MatchManager = null;

    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    player: cc.Node = null;

    CheckPlayerLocation: boolean = false;

    onLoad()
    {
        this._matchManagerRef = cc.find('Script Collection/Match Manager').getComponent('MatchManager');
        this.player = cc.find('Player');
    }

    start()
    {

    }

    update(dt)
    {
        if (this.CheckPlayerLocation)
        {
            if (this.player.getPosition().y > this._matchManagerRef.totalHeight)
            {
                this._matchManagerRef._poolingSystem.addRiverMapToPool(this.node);
                this.CheckPlayerLocation = false;
            }
        }
    }

    onCollisionEnter(other, self)
    {
        // console.log('collision enter');
        if (other.node.name == 'Player')
        {
            this._matchManagerRef.spawnNextRiverMap(this.node.height + (0.8 * this.node.height));
            this.CheckPlayerLocation = true;
        }
    }
}