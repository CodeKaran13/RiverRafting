import ItemSpawner from "../GamePlay/ItemSpawner";
import ObstacleSpawner from "../GamePlay/ObstacleSpawner";
import RiverMap from "../GamePlay/RiverMap";
import Waves from "../GamePlay/Waves";
import SpawnNextWave from "../Environment/SpawnNextWave";

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
    PrefabRiverMapSet1: cc.Prefab = null;
    @property(cc.Prefab)
    PrefabRiverMapSet2: cc.Prefab = null;
    @property(cc.Prefab)
    PrefabRiverMapSet3: cc.Prefab = null;
    @property(cc.Prefab)
    PrefabRiverMapSet4: cc.Prefab = null;
    @property(cc.Prefab)
    PrefabRiverMapSet5: cc.Prefab = null;
    @property(cc.Prefab)
    PrefabRiverMapSet6: cc.Prefab = null;

    EasyRiverMapSet0: cc.NodePool;
    MediumRiverMapSet0: cc.NodePool;
    HardRiverMapSet0: cc.NodePool;
    RiverMapSet1: cc.NodePool;
    RiverMapSet2: cc.NodePool;
    RiverMapSet3: cc.NodePool;
    RiverMapSet4: cc.NodePool;
    RiverMapSet5: cc.NodePool;
    RiverMapSet6: cc.NodePool;
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // RiverMapsSet0: cc.Node[] = [];
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // RiverMapsSet1: cc.Node[] = [];
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // RiverMapsSet2: cc.Node[] = [];
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // RiverMapsSet3: cc.Node[] = [];
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // RiverMapsSet4: cc.Node[] = [];
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // RiverMapsSet5: cc.Node[] = [];
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // RiverMapsSet6: cc.Node[] = [];


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

    // Pooling for river maps prefabs
    addRiverMapToPool(riverMap: cc.Node) {
        // console.log('adding back to pool');
        riverMap.getComponent(RiverMap).IsActive = false;
        riverMap.getComponent(RiverMap).CheckPlayerLocation = false;
        // Type.destroy();
        riverMap.active = false;
        // this.RiverMapsSet1.push(Type);

        // switch (Type)
        // {
        //     case 1:

        //     default:
        //         console.log('no such case found with name: ' + Type);
        //         break;
        // }
    }

    getRiverMapfromPool(Type: number): cc.Node {
        switch (Type) {
            case 0:
            // var ref = this.RiverMapsSet0.pop();
            // return ref;
            case 1:
            // var ref = this.RiverMapsSet1.pop();
            // return ref;
            case 2:
            // var ref = this.RiverMapsSet2.pop();
            // return ref;
            case 3:
            // var ref = this.RiverMapsSet3.pop();
            // return ref;
            case 4:
            // var ref = this.RiverMapsSet4.pop();
            // return ref;
            case 5:
            // var ref = this.RiverMapsSet5.pop();
            // return ref;
            case 6:
            // var ref = this.RiverMapsSet6.pop();
            // return ref;
            default:
                console.log('no such case found with type: ' + Type);
                return null;
                break;
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
