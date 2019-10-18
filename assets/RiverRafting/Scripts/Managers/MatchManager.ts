import PoolingSystem from "../Pools/PoolingSystem";
import Waves from "../GamePlay/Waves";
import RiverMap from "../GamePlay/RiverMap";
import { PrefabSet } from "../Enums";
import SelectNextMap from "../Environment/SelectNextMap";
import StartRiverMap from "../GamePlay/StartRiverMap";
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
        type: StartRiverMap,
        visible: true,
        serializable: true
    })
    _startRiverMap1: StartRiverMap = null;
    @property({
        type: StartRiverMap,
        visible: true,
        serializable: true
    })
    _startRiverMap2: StartRiverMap = null;

    // Script variables
    @property
    totalHeight: number = 0;
    @property
    totalMapsToGenerate: number = 18;
    @property
    totalPrefabsToSpawn: number = 3;
    zOrder: number = 0;
    @property
    totalEasyPrefabsToSpawn: number = 5;
    @property
    totalMediumPrefabsToSpawn: number = 5;
    @property
    totalHardPrefabsToSpawn: number = 10;

    public static easyIndex: number = 1;
    public static normalIndex: number = 2;
    public static hardIndex: number = 3;

    public static Instance: MatchManager = null;

    onLoad() {
        this.totalHeight = 1003;
    }

    start() {
        if (MatchManager.Instance == null) {
            MatchManager.Instance = this;
        }

        PoolingSystem.Instance.InitNodePool();

        for (let i = 0; i < this.totalMapsToGenerate; i++) {
            this.spawnNextRiverMap();
        }
    }

    StartGame() {
        // this.spawnNextWave(450);
        // this._startRiverMap1.OnStartGame();
        // this._startRiverMap2.OnStartGame();
    }

    spawnNextRiverMap() {
        var rand = this.getRandomNumber();
        switch (rand) {
            case 0:
                var nextMap = SelectNextMap.Instance.selectNextMap(PrefabSet.Set_0);
                this.setRendererOff(nextMap);
                break;
            case 1:
                var nextMap = SelectNextMap.Instance.selectNextMap(PrefabSet.Set_1);
                this.setRendererOff(nextMap);
                break;
            case 2:
                var nextMap = SelectNextMap.Instance.selectNextMap(PrefabSet.Set_2);
                this.setRendererOff(nextMap);
                break;
            case 3:
                var nextMap = SelectNextMap.Instance.selectNextMap(PrefabSet.Set_3);
                this.setRendererOff(nextMap);
                break;
            case 4:
                var nextMap = SelectNextMap.Instance.selectNextMap(PrefabSet.Set_4);
                this.setRendererOff(nextMap);
                break;
            case 5:
                var nextMap = SelectNextMap.Instance.selectNextMap(PrefabSet.Set_5);
                this.setRendererOff(nextMap);
                break;
            case 6:
                var nextMap = SelectNextMap.Instance.selectNextMap(PrefabSet.Set_6);
                this.setRendererOff(nextMap);
                break;
            default:
                break;
        }
    }
    // prefabArray: Number[] = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5];
    prevRand: number = 0;
    getRandomNumber() {
        // will return 0, 1, 2, 3, 4, 5, 6
        // var rand = this.prefabArray.splice(Math.floor(Math.random() * this.prefabArray.length), 1);
        var rand = Math.floor(Math.random() * 7);
        if(rand == this.prevRand) {
            return Math.floor(Math.random() * 7);
        }
        else {
            this.prevRand = rand;
            return rand;
        }
    }
    setRendererOff(nextMap: cc.Node) {
        if (nextMap.parent != null)
            nextMap.parent.removeChild(nextMap);
        this.LevelPrefabs.addChild(nextMap, this.zOrder);
        this.zOrder--;
        nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
        nextMap.active = true;

        this.totalHeight = this.totalHeight + nextMap.getComponent(RiverMap).myHeight;

        // for (let i = 0; i < nextMap.children[0].childrenCount - 1; i++) {
        // nextMap.children[0].children[i].group = 'default';
        // var grandchildcount = 0;
        // if (nextMap.children[0].children[i].childrenCount > 0) {
        //     grandchildcount = nextMap.children[0].children[i].children[0].childrenCount;
        //     if (grandchildcount > 0) {
        //         for (var j = 0; j < grandchildcount; j++) {
        //             // nextMap.children[0].children[i].children[0].children[j].getComponent(cc.RenderComponent).enabled = false;
        //         }
        //     }
        // }
        // }

        // var propIndex = nextMap.children[0].childrenCount - 1;
        // var grandchildcount = 0;
        // if (nextMap.children[0].children[propIndex].childrenCount > 0) {
        //     grandchildcount = nextMap.children[0].children[propIndex].childrenCount;
        //     if (grandchildcount > 0) {
        //         for (var j = 0; j < grandchildcount; j++) {
        //             nextMap.children[0].children[propIndex].children[j].group = 'default';
        //             nextMap.children[0].children[propIndex].children[j].active = true;
        //             if (nextMap.children[0].children[propIndex].children[j].getComponent(dragonBones.ArmatureDisplay) != null) {
        //                 nextMap.children[0].children[propIndex].children[j].getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
        //             }
        //             if (nextMap.children[0].children[propIndex].children[j].getComponent(cc.RenderComponent) != null) {
        //                 nextMap.children[0].children[propIndex].children[j].getComponent(cc.RenderComponent).enabled = false;
        //             }
        //         }
        //     }
        // }
    }

    // Spawn Wave Prefabs
    totalWaveHeight: number = 0;
    spawnNextWave(height: number) {
        this.totalWaveHeight = this.totalWaveHeight + height;
        var wavePrefab: cc.Node = this._poolingSystem.getWavePrefabFromPool();

        if (wavePrefab.parent != null)
            wavePrefab.parent.removeChild(wavePrefab);

        this.WavePrefabs.addChild(wavePrefab, 99);

        wavePrefab.setPosition(new cc.Vec2(0, this.totalWaveHeight));
        // console.log(wavePrefab.position);
        var waves = wavePrefab.getComponent(Waves);
        waves.myPos = wavePrefab.convertToWorldSpaceAR(cc.Vec2.ZERO);

        wavePrefab.group = 'Waves';
        waves.IsActive = true;
        waves.CheckPlayerLocation = true;
    }
}