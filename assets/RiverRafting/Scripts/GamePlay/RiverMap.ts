import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RiverMap extends cc.Component
{

    _matchManagerRef: MatchManager = null;

    player: cc.Node = null;

    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    SpawnLocations: cc.Node[] = [];

    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    DocksSpawnLocation: cc.Node[] = [];

    CheckPlayerLocation: boolean = false;
    IsActive: boolean = false;

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
            if (this.player.getPosition().y > this._matchManagerRef.totalHeight + 800)
            {
                this._matchManagerRef._poolingSystem.addRiverMapToPool(this.node);
                this.CheckPlayerLocation = false;
            }
        }
    }
}