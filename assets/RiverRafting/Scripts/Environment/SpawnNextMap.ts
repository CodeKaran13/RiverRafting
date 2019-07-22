import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpawnNextMap extends cc.Component
{
    _matchManager: MatchManager = null;

    player: cc.Node = null;

    onLoad() 
    {
        this._matchManager = cc.find('Script Collection/Match Manager').getComponent('MatchManager');
        this.player = cc.find('Player');
    }

    start()
    {

    }

    update(dt)
    {

    }

    onCollisionEnter(other, self)
    {
        // console.log('collision enter');
        if (other.node.name == 'Player')
        {
            // console.log('' + this.node.parent.height);
            this._matchManager.spawnNextRiverMap(this.node.parent.height); //+ (2.5 * this.node.parent.height));
            this.node.parent.getComponent('RiverMap').CheckPlayerLocation = true;
        }
    }
}
