import ObstaclePool from "../Pools/ObstaclePool";
import MatchManager from "../Managers/MatchManager";
import { ObstacleType } from "./Obstacles";
import Logs from "../Environment/Logs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ObstacleSpawner extends cc.Component {
    @property(MatchManager)
    _matchManager: MatchManager = null;

    @property({
        type: ObstaclePool,
        visible: true,
        serializable: true
    })
    _ObstaclePoolRef: ObstaclePool = null;

    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    _player: cc.Node = null;

    LogsSpawnPos: cc.Node[] = [];
    CycloneSpawnPos: cc.Node[] = [];


    SpawnLogs(pos: cc.Vec2) {
        var log = this._ObstaclePoolRef.getObstacleFromPool(ObstacleType.Log);

        if (log != null) {
            
        }
    }
    SpawnCyclones() {
        var cyclone = this._ObstaclePoolRef.getObstacleFromPool(ObstacleType.Cyclone)

        if (cyclone != null) {
            // cyclone.position = 
        }
    }

    // getDockSpawnPos() {
    //     var rand = Math.floor(Math.random() * this.DockSpawnPos.length);
    //     // console.log('rand: ' + rand);
    //     return (this.DockSpawnPos[rand]);
    // }
    getLogsSpawnPos() {
        var rand = Math.floor(Math.random() * this.LogsSpawnPos.length);
        return (this.LogsSpawnPos[rand]);
    }
    getCyclonePos() {
        var rand = Math.floor(Math.random() * this.CycloneSpawnPos.length);
        return (this.CycloneSpawnPos[rand]);
    }
}