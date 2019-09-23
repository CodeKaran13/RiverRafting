import MatchManager from "../Managers/MatchManager";
import Player from "../Player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Waves extends cc.Component
{
    // Script variables
    CheckPlayerLocation: boolean = false;
    IsActive: boolean = false;
    myPos: cc.Vec2;

    onLoad()
    {
        // this._matchManager = cc.find('Script Collection/Match Manager').getComponent(MatchManager);
        // this._player = cc.find('Player');
    }

    update(dt)
    {
        if(this.IsActive && this.CheckPlayerLocation)
        {
            // console.log('wave pos: ' + this.myPos.y);
            // console.log('player pos: ' + this._player.position.y);
            var checkpoint = this.node.height + this.myPos.y;
            if(Player.Instance.node.position.y > checkpoint + 150)
            {
                // console.log('adding waves back to pool');
                MatchManager.Instance._poolingSystem.addWavePrefabToPool(this.node);
            }
        }
    }
}
