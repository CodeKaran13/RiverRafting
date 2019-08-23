import ItemSpawner from "../GamePlay/ItemSpawner";
import ObstacleSpawner from "../GamePlay/ObstacleSpawner";
import RiverMap from "../GamePlay/RiverMap";
import Waves from "../GamePlay/Waves";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoolingSystem extends cc.Component
{
    //All river prefabs refs
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RiverMapsSet0: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RiverMapsSet1: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RiverMapsSet2: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RiverMapsSet3: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RiverMapsSet4: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RiverMapsSet5: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RiverMapsSet6: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RiverMapsSet7: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RiverMapsSet8: cc.Node[] = [];

    //Wave Prefabs
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    WavePrefabs: cc.Node[] = [];

    // All script refs
    @property({
        type: ItemSpawner,
        visible: true,
        serializable: true
    })
    _itemSpawner: ItemSpawner = null;
    @property({
        type: ObstacleSpawner,
        visible: true,
        serializable: true
    })
    _obstacleSpawner: ObstacleSpawner = null;

    start()
    {

    }

    // Pooling for river maps prefabs
    addRiverMapToPool(Type: cc.Node)
    {
        // console.log('adding back to pool');
        Type.getComponent(RiverMap).IsActive = false;
        Type.getComponent(RiverMap).CheckPlayerLocation = false;
        // Type.destroy();
        Type.active = false;
        // this.RiverMapsSet1.push(Type);

        // switch (Type)
        // {
        //     case 1:

        //     default:
        //         console.log('no such case found with name: ' + Type);
        //         break;
        // }
    }

    getRiverMapfromPool(Type: number): cc.Node
    {
        switch (Type)
        {
            case 0:
                var ref = this.RiverMapsSet0.pop();
                return ref;
            case 1:
                var ref = this.RiverMapsSet1.pop();
                return ref;
            case 2:
                var ref = this.RiverMapsSet2.pop(); 
                return ref;
            case 3:
                var ref = this.RiverMapsSet3.pop(); 
                return ref;
            case 4:
                var ref = this.RiverMapsSet4.pop(); 
                return ref;
            case 5:
                var ref = this.RiverMapsSet5.pop();
                return ref;
            case 6:
                var ref = this.RiverMapsSet6.pop(); 
                return ref;
            // case 7:
            //     var ref = this.RiverMapsSet7.pop(); 
            //     return ref;
            // case 8:
            //     var ref = this.RiverMapsSet8.pop(); 
            //     return ref;
            default:
                console.log('no such case found with type: ' + Type);
                break;
        }
    }

    // Pooling for wave prefabs
    addWavePrefabToPool(node: cc.Node)
    {
        node.getComponent(Waves).IsActive = false;
        node.getComponent(Waves).CheckPlayerLocation = false;
        node.parent.removeChild(node);
        this.WavePrefabs.push(node);
    }
    getWavePrefabFromPool(): cc.Node
    {
        var ref: cc.Node = this.WavePrefabs.pop();
        return ref;
    }
}
