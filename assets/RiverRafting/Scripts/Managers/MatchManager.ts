import PoolingSystem from "../Pools/PoolingSystem";
import TimeManager from "./TimeManager";
import GameManager from "./GameManager";
import ScoreManager from "./ScoreManager";
import UIManager from "./UIManager";
import BonusSystem from "../GamePlay/BonusSystem";
import ItemSpawner from "../GamePlay/ItemSpawner";
import Waves from "../GamePlay/Waves";
import RiverMap from "../GamePlay/RiverMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchManager extends cc.Component {
    // RiverMap/Wave Prefabs Parent Node
    @property(cc.Node)
    LevelPrefabs: cc.Node = null;
    @property(cc.Node)
    WavePrefabs: cc.Node = null;

    // All script Refs
    @property({
        type: PoolingSystem,
        visible: true,
        serializable: true
    })
    _poolingSystem: PoolingSystem = null;
    @property({
        type: TimeManager,
        visible: true,
        serializable: true
    })
    _timeManager: TimeManager = null;
    @property({
        type: GameManager,
        visible: true,
        serializable: true
    })
    _gameManager: GameManager = null;
    _scoreManager: ScoreManager = null;
    _UIManager: UIManager = null;
    @property({
        type: BonusSystem,
        visible: true,
        serializable: true
    })
    _bonusSystem: BonusSystem = null;
    // _obstacleSpawner: ObstacleSpawner = null;
    _itemSpawner: ItemSpawner = null;

    // Script variables
    totalHeight: number = 0;
    @property
    totalObstacleToSpawnOnPrefab: number = 5;

    public static easyIndex: number = 1;
    public static normalIndex: number = 2;
    public static hardIndex: number = 3;

    public static Instance: MatchManager = null;

    onLoad() {
        this._timeManager._matchManager = this;
        this._gameManager._matchManager = this;
        // this._obstacleSpawner = this.node.getComponent(ObstacleSpawner);
        this._itemSpawner = this.node.getComponent(ItemSpawner);

        this.totalHeight = 1920;
    }

    start() {
        if (MatchManager.Instance == null) {
            MatchManager.Instance = this;
        }
        for (let i = 0; i < this.totalPrefabsToSpawn; i++) {
            this.spawnNextRiverMap();
        }
    }

    StartGame() {
        this.spawnNextWave(1920);

        // this._bonusSystem.resetBonus();
        // this._bonusSystem.restartCounter();
    }

    @property
    totalPrefabsToSpawn: number = 0;
    // counter: number = 0;
    // spawnSequence: cc.ActionInterval;
    // startSpawnSequence()
    // {
    //     var time = cc.delayTime(1);
    //     this.counter = 0;
    //     this.spawnSequence = cc.sequence(time, cc.callFunc(this.spawnNextRiverMap, this))
    //     this.node.runAction(this.spawnSequence.repeatForever());
    // }

    zOrder: number = 0;
    spawnNextRiverMap() {
        var rand = this.getRandomNumber();
        switch (rand) {
            case 0:
                var nextMap = this._poolingSystem.getRiverMapfromPool(0);
                this.setRendererOff(nextMap);
                break;
            case 1:
                var nextMap = this._poolingSystem.getRiverMapfromPool(1);
                this.setRendererOff(nextMap);
                break;
            case 2:
                var nextMap = this._poolingSystem.getRiverMapfromPool(2);
                this.setRendererOff(nextMap);
                break;
            case 3:
                var nextMap = this._poolingSystem.getRiverMapfromPool(3);
                this.setRendererOff(nextMap);
                break;
            case 4:
                var nextMap = this._poolingSystem.getRiverMapfromPool(4);
                this.setRendererOff(nextMap);
                break;
            case 5:
                var nextMap = this._poolingSystem.getRiverMapfromPool(5);
                this.setRendererOff(nextMap);
                break;
            case 6:
                var nextMap = this._poolingSystem.getRiverMapfromPool(6);
                this.setRendererOff(nextMap);
                break;
            default:
                break;
        }
    }
    prefabArray: Number[] = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5];
    getRandomNumber() {
        // will return 0, 1, 2, 3, 4, 5, 6
        var rand = this.prefabArray.splice(Math.floor(Math.random() * this.prefabArray.length), 1);
        return rand[0];
        // return 5;
    }
    setRendererOff(nextMap: cc.Node) {
        if (nextMap.parent != null)
            nextMap.parent.removeChild(nextMap);
        this.LevelPrefabs.addChild(nextMap, this.zOrder);
        this.zOrder--;

        nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
        nextMap.active = true;

        this.totalHeight = this.totalHeight + nextMap.getComponent(RiverMap).myHeight;

        for (let i = 0; i < nextMap.children[0].childrenCount - 1; i++) {
            nextMap.children[0].children[i].active = true;
            if (nextMap.children[0].children[i].getComponent(cc.RenderComponent) != null) {
                nextMap.children[0].children[i].getComponent(cc.RenderComponent).enabled = false;
            }
            var grandchildcount = 0;
            if (nextMap.children[0].children[i].childrenCount > 0) {
                grandchildcount = nextMap.children[0].children[i].children[0].childrenCount;
                if (grandchildcount > 0) {
                    for (var j = 0; j < grandchildcount; j++) {
                        nextMap.children[0].children[i].children[0].children[j].getComponent(cc.RenderComponent).enabled = false;
                    }
                }
            }
        }

        var propIndex = nextMap.children[0].childrenCount - 1;
        nextMap.children[0].children[propIndex].active = true;
        var grandchildcount = 0;
        if (nextMap.children[0].children[propIndex].childrenCount > 0) {
            grandchildcount = nextMap.children[0].children[propIndex].childrenCount;
            if (grandchildcount > 0) {
                for (var j = 0; j < grandchildcount; j++) {
                    nextMap.children[0].children[propIndex].children[j].active = true;
                    if (nextMap.children[0].children[propIndex].children[j].getComponent(dragonBones.ArmatureDisplay) != null) {
                        nextMap.children[0].children[propIndex].children[j].getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
                    }
                    if (nextMap.children[0].children[propIndex].children[j].getComponent(cc.RenderComponent) != null) {
                        nextMap.children[0].children[propIndex].children[j].getComponent(cc.RenderComponent).enabled = false;
                    }
                }
            }
        }
    }

    // Spawn Wave Prefabs
    totalWaveHeight: number = 0;
    spawnNextWave(height: number) {
        this.totalWaveHeight = this.totalWaveHeight + height;
        var wavePrefab: cc.Node = this._poolingSystem.getWavePrefabFromPool();

        if (wavePrefab.parent != null)
            wavePrefab.parent.removeChild(wavePrefab);
        this.WavePrefabs.addChild(wavePrefab);

        wavePrefab.setPosition(new cc.Vec2(0, this.totalWaveHeight));
        // console.log('pos: ' + wavePrefab.convertToWorldSpaceAR(cc.Vec2.ZERO));
        wavePrefab.getComponent(Waves).myPos = wavePrefab.convertToWorldSpaceAR(cc.Vec2.ZERO);

        wavePrefab.active = true;
        wavePrefab.getComponent(Waves).IsActive = true;
        wavePrefab.getComponent(Waves).CheckPlayerLocation = true;
    }
}