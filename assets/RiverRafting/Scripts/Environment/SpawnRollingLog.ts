import ObstacleSpawner from "../GamePlay/ObstacleSpawner";
import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpawnRollingLogs extends cc.Component
{
    @property({
        type: ObstacleSpawner,
        visible: true,
        serializable: true
    })
    _obstacleSpawner: ObstacleSpawner = null;

    // onLoad () {}

    start()
    {
        this._obstacleSpawner = cc.find('Script Collection/Match Manager').getComponent(MatchManager)._obstacleSpawner;
    }

    // update (dt) {}

    onCollisionEnter(other, self)
    {
        if(other.node.name == 'Player')
        {
            this._obstacleSpawner.SpawnRollingLogs(this.node.convertToWorldSpace(cc.Vec2.ZERO));
        }
    }
}
