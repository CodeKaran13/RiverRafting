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

    getRiverMapfromPool(Type: number) : cc.Node
    {
        switch (Type)
        {
            case 1:
                var ref = this.RiverMapsSet0.pop();
                return ref;

            case 2:
                var ref = this.RiverMapsSet1.pop();
                return ref;

            case 3:
                // var ref = cc.instantiate(this.RiverMapsSet0[2]);
                // var rivermap = ref.getComponent(RiverMap);
                // rivermap.IsActive = true;
                // for (let i = 0; i < rivermap.SpawnLocations.length; i++)
                // {
                //     this._itemSpawner.SpawnPos[i] = rivermap.SpawnLocations[i];
                // }
                // ref.getComponent(RiverMap).IsActive = true;
                // return ref;
                break;

            case 4:
                // var ref = cc.instantiate(this.RiverMapsSet0[3]);
                // var rivermap = ref.getComponent(RiverMap);
                // rivermap.IsActive = true;
                // for (let i = 0; i < rivermap.SpawnLocations.length; i++)
                // {
                //     this._itemSpawner.SpawnPos[i] = rivermap.SpawnLocations[i];
                // }
                // ref.getComponent(RiverMap).IsActive = true;
                // return ref;
                break;

            default:
                console.log('no such case found with type: ' + Type);
                break;
        }
    }

    // Pooling for wave prefabs
    addWavePrefabToPool(prefab: cc.Node)
    {
        prefab.getComponent(Waves).IsActive = false;
        prefab.getComponent(Waves).CheckPlayerLocation = false;
        prefab.parent.removeChild(prefab);
        this.WavePrefabs.push(prefab);
    }
    getWavePrefabFromPool(): cc.Node
    {
        var ref: cc.Node = this.WavePrefabs.pop();
        // ref.getComponent(Waves).IsActive = true;
        return ref;
    }
}
