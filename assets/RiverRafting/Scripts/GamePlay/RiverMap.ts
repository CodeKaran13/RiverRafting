import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RiverMap extends cc.Component
{
    _matchManager: MatchManager = null;

    @property(cc.Node)
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
        this._matchManager = cc.find('Script Collection/Match Manager').getComponent('MatchManager');
    }

    update(dt)
    {
        if (this.CheckPlayerLocation)
        {
            if (this.player.position.y > this._matchManager.totalHeight + 300)
            {
                // console.log('player above me river prefab');
                this._matchManager._poolingSystem.addRiverMapToPool(this.node);
                this.CheckPlayerLocation = false;
            }
        }
    }
}