import ObstaclePool from "../Pools/ObstaclePool";
import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ObstacleSpawner extends cc.Component
{
    @property({
        type: MatchManager,
        visible: true,
        serializable: true
    })
    _matchManagerRef: MatchManager = null;

    @property({
        type: ObstaclePool,
        visible: true,
        serializable: true
    })
    _ObstaclePoolRef: ObstaclePool = null;

    LogsSpawnPos: cc.Node[] = [];

    DockSpawnPos: cc.Node[] = [];

    onLoad()
    {
        this._matchManagerRef._poolingSystem._obstacleSpawner = this;
    }

    start()
    {

    }

    // update (dt) {}

    SpawnDocks()
    {
        var dock = this._ObstaclePoolRef.getObstacleFromPool('docks');

        var parent = this.getDockSpawnPos();
        if (dock.parent != null)
        {
            dock.parent.removeChild(dock);
        }

        parent.active = true;
        parent.addChild(dock);
        dock.setPosition(cc.Vec2.ZERO);

        dock.active = true;
    }

    SpawnRollingLogs()
    {
        var rollinglog = this._ObstaclePoolRef.getObstacleFromPool('rollinglogs');
    }

    SpawnLogs()
    {

    }

    getDockSpawnPos()
    {
        var rand = Math.floor(Math.random() * this.DockSpawnPos.length);
        // console.log('rand: ' + rand);
        return (this.DockSpawnPos[rand]);
    }
}
