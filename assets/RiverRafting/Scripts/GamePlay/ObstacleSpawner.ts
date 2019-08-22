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


    SpawnLogs() {
        var log = this._ObstaclePoolRef.getObstacleFromPool(ObstacleType.Log);
        var spawnPos = this.getLogsSpawnPos();
        if (log.parent != null) {
            log.parent.removeChild(log);
        }
        spawnPos.addChild(log);
        log.setPosition(cc.Vec2.ZERO);

        log.active = true;
    }
    SpawnCyclones() {
        var cyclone = this._ObstaclePoolRef.getObstacleFromPool(ObstacleType.Cyclone)
        var spawnPos = this.getCycloneSpawnPos();
        if (cyclone.parent != null) {
            cyclone.parent.removeChild(cyclone);
        }
        spawnPos.addChild(cyclone);
        cyclone.setPosition(cc.Vec2.ZERO);

        cyclone.active = true;
    }


    getLogsSpawnPos() {
        var rand = Math.floor(Math.random() * this.LogsSpawnPos.length);
        return (this.LogsSpawnPos[rand]);
    }
    getCycloneSpawnPos() {
        var rand = Math.floor(Math.random() * this.CycloneSpawnPos.length);
        return (this.CycloneSpawnPos[rand]);
    }
}