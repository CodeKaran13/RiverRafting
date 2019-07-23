import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Waves extends cc.Component
{
    // References
    @property(cc.Node)
    _player: cc.Node = null;

    // All script reference
    _matchManager: MatchManager = null;

    // Script variables
    CheckPlayerLocation: boolean = false;
    IsActive: boolean = false;

    onLoad()
    {
        this._matchManager = cc.find('Script Collection/Match Manager').getComponent(MatchManager);
        this._player = cc.find('Player');
    }

    update(dt)
    {
        if(this.IsActive && this.CheckPlayerLocation)
        {
            if(this._player.position.y > this._matchManager.totalWaveHeight + 300)
            {
                this.CheckPlayerLocation = false;
                this._matchManager._poolingSystem.addWavePrefabToPool(this.node);
            }
        }
    }
}
