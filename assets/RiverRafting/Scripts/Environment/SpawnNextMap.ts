import MatchManager from "../Managers/MatchManager";
import RiverMap from "../GamePlay/RiverMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpawnNextMap extends cc.Component
{
    @property({
        type: MatchManager,
        visible: true,
        serializable: true
    })
    _matchManager: MatchManager = null;

    onCollisionEnter(other, self)
    {
        if (other.node.name == 'Player')
        {
            // this._matchManager.totalHeight = this._matchManager.totalHeight + this.node.parent.height;
            // this._matchManager.spawnNextRiverMap(this.node.parent.height);
            this.node.parent.getComponent(RiverMap).CheckPlayerLocation = true;
        }
    }
}