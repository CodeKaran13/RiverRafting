import Waves from "../GamePlay/Waves";
import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoolingSystem extends cc.Component {
    //All river prefabs refs
    @property(cc.Prefab)
    EasyPrefabRiverMapSet0: cc.Prefab = null;
    @property(cc.Prefab)
    MediumPrefabRiverMapSet0: cc.Prefab = null;
    @property(cc.Prefab)
    HardPrefabRiverMapSet0: cc.Prefab = null;
    @property(cc.Prefab)
    EasyPrefabRiverMapSet1: cc.Prefab = null;
    @property(cc.Prefab)
    MediumPrefabRiverMapSet1: cc.Prefab = null;
    @property(cc.Prefab)
    HardPrefabRiverMapSet1: cc.Prefab = null;
    @property(cc.Prefab)
    EasyPrefabRiverMapSet2: cc.Prefab = null;
    @property(cc.Prefab)
    MediumPrefabRiverMapSet2: cc.Prefab = null;
    @property(cc.Prefab)
    HardPrefabRiverMapSet2: cc.Prefab = null;
    @property(cc.Prefab)
    EasyPrefabRiverMapSet3: cc.Prefab = null;
    @property(cc.Prefab)
    MediumPrefabRiverMapSet3: cc.Prefab = null;
    @property(cc.Prefab)
    HardPrefabRiverMapSet3: cc.Prefab = null;
    @property(cc.Prefab)
    EasyPrefabRiverMapSet4: cc.Prefab = null;
    @property(cc.Prefab)
    MediumPrefabRiverMapSet4: cc.Prefab = null;
    @property(cc.Prefab)
    HardPrefabRiverMapSet4: cc.Prefab = null;
    @property(cc.Prefab)
    EasyPrefabRiverMapSet5: cc.Prefab = null;
    @property(cc.Prefab)
    MediumPrefabRiverMapSet5: cc.Prefab = null;
    @property(cc.Prefab)
    HardPrefabRiverMapSet5: cc.Prefab = null;
    @property(cc.Prefab)
    EasyPrefabRiverMapSet6: cc.Prefab = null;
    @property(cc.Prefab)
    MediumPrefabRiverMapSet6: cc.Prefab = null;
    @property(cc.Prefab)
    HardPrefabRiverMapSet6: cc.Prefab = null;

    EasyRiverMapSet0: cc.NodePool;
    MediumRiverMapSet0: cc.NodePool;
    HardRiverMapSet0: cc.NodePool;
    EasyRiverMapSet1: cc.NodePool;
    MediumRiverMapSet1: cc.NodePool;
    HardRiverMapSet1: cc.NodePool;
    EasyRiverMapSet2: cc.NodePool;
    MediumRiverMapSet2: cc.NodePool;
    HardRiverMapSet2: cc.NodePool;
    EasyRiverMapSet3: cc.NodePool;
    MediumRiverMapSet3: cc.NodePool;
    HardRiverMapSet3: cc.NodePool;
    EasyRiverMapSet4: cc.NodePool;
    MediumRiverMapSet4: cc.NodePool;
    HardRiverMapSet4: cc.NodePool;
    EasyRiverMapSet5: cc.NodePool;
    MediumRiverMapSet5: cc.NodePool;
    HardRiverMapSet5: cc.NodePool;
    EasyRiverMapSet6: cc.NodePool;
    MediumRiverMapSet6: cc.NodePool;
    HardRiverMapSet6: cc.NodePool;

    //Wave Prefabs
    @property({
        type: cc.Prefab,
        visible: true,
        serializable: true
    })
    WavePrefabs: cc.Prefab = null;
    WaveNodePool: cc.NodePool;

    public static Instance: PoolingSystem = null;

    onLoad() {
        if (PoolingSystem.Instance == null) {
            PoolingSystem.Instance = this;
        }
    }
    start() {
        this.WaveNodePool = new cc.NodePool();
    }

    InitNodePool() {
        PoolingSystem.Instance.EasyRiverMapSet0 = new cc.NodePool();
        PoolingSystem.Instance.MediumRiverMapSet0 = new cc.NodePool();
        PoolingSystem.Instance.HardRiverMapSet0 = new cc.NodePool();

        PoolingSystem.Instance.EasyRiverMapSet1 = new cc.NodePool();
        PoolingSystem.Instance.MediumRiverMapSet1 = new cc.NodePool();
        PoolingSystem.Instance.HardRiverMapSet1 = new cc.NodePool();

        PoolingSystem.Instance.EasyRiverMapSet2 = new cc.NodePool();
        PoolingSystem.Instance.MediumRiverMapSet2 = new cc.NodePool();
        PoolingSystem.Instance.HardRiverMapSet2 = new cc.NodePool();

        PoolingSystem.Instance.EasyRiverMapSet3 = new cc.NodePool();
        PoolingSystem.Instance.MediumRiverMapSet3 = new cc.NodePool();
        PoolingSystem.Instance.HardRiverMapSet3 = new cc.NodePool();

        PoolingSystem.Instance.EasyRiverMapSet4 = new cc.NodePool();
        PoolingSystem.Instance.MediumRiverMapSet4 = new cc.NodePool();
        PoolingSystem.Instance.HardRiverMapSet4 = new cc.NodePool();

        PoolingSystem.Instance.EasyRiverMapSet5 = new cc.NodePool();
        PoolingSystem.Instance.MediumRiverMapSet5 = new cc.NodePool();
        PoolingSystem.Instance.HardRiverMapSet5 = new cc.NodePool();

        PoolingSystem.Instance.EasyRiverMapSet6 = new cc.NodePool();
        PoolingSystem.Instance.MediumRiverMapSet6 = new cc.NodePool();
        PoolingSystem.Instance.HardRiverMapSet6 = new cc.NodePool();


        // this.fillNodePool();
    }

    fillNodePool() {
        for (let i = 0; i < MatchManager.Instance.totalPrefabsToSpawn; i++) {

            let map0Easy = cc.instantiate(PoolingSystem.Instance.EasyPrefabRiverMapSet0);
            PoolingSystem.Instance.EasyRiverMapSet0.put(map0Easy);

            let map0Medium = cc.instantiate(PoolingSystem.Instance.MediumPrefabRiverMapSet0);
            PoolingSystem.Instance.MediumRiverMapSet0.put(map0Medium);

            let map0Hard = cc.instantiate(PoolingSystem.Instance.HardPrefabRiverMapSet0);
            PoolingSystem.Instance.HardRiverMapSet0.put(map0Hard);

        }
    }

    // Pooling for wave prefabs
    addWavePrefabToPool(node: cc.Node) {
        var _waves = node.getComponent(Waves);
        _waves.IsActive = false;
        _waves.CheckPlayerLocation = false;
        _waves._spawnNextWave.triggerOnce = false;
        node.parent.removeChild(node);
        this.WaveNodePool.put(node);
    }
    getWavePrefabFromPool(): cc.Node {
        if (this.WaveNodePool.size() > 0) {
            var ref = this.WaveNodePool.get();
        }
        else {
            ref = cc.instantiate(this.WavePrefabs);
        }
        return ref;
    }
}