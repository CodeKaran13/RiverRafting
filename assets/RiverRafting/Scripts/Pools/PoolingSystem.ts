import ItemSpawner from "../GamePlay/ItemSpawner";
import ObstacleSpawner from "../GamePlay/ObstacleSpawner";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoolingSystem extends cc.Component
{

    @property({
        type: cc.Prefab,
        visible: true,
        serializable: true
    })
    RiverMapsPrefabs: cc.Prefab[] = [];

    @property({
        type: ItemSpawner,
        visible: true,
        serializable: true
    })
    _itemSpawner: ItemSpawner = null;

    _obstacleSpawner: ObstacleSpawner = null;

    // onLoad () {}

    start()
    {

    }

    // update (dt) {}

    addRiverMapToPool(Type: cc.Node)
    {
        Type.getComponent('RiverMap').IsActive = false;
        Type.destroy();

        // switch (Type) {


        //     default:
        //         console.log('no such case found with name: ' + Type);
        //         break;
        // }
    }

    getRiverMapfromPool(Type: number)
    {
        switch (Type)
        {
            case 1:
                var ref = cc.instantiate(this.RiverMapsPrefabs[0]);
                var rivermap = ref.getComponent('RiverMap');
                rivermap.IsActive = true;
                for (let i = 0; i < rivermap.SpawnLocations.length; i++)
                {
                    this._itemSpawner.SpawnPos[i] = rivermap.SpawnLocations[i];
                }

                for(let i = 0; i < rivermap.DocksSpawnLocation.length; i++)
                {
                    this._obstacleSpawner.DockSpawnPos[i] = rivermap.DocksSpawnLocation[i];
                }

                return ref;

            case 2:
                var ref = cc.instantiate(this.RiverMapsPrefabs[1]);
                var rivermap = ref.getComponent('RiverMap');
                rivermap.IsActive = true;
                for (let i = 0; i < rivermap.SpawnLocations.length; i++)
                {
                    this._itemSpawner.SpawnPos[i] = rivermap.SpawnLocations[i];
                }
                ref.getComponent('RiverMap').IsActive = true;
                return ref;

            case 3:
                var ref = cc.instantiate(this.RiverMapsPrefabs[2]);
                var rivermap = ref.getComponent('RiverMap');
                rivermap.IsActive = true;
                for (let i = 0; i < rivermap.SpawnLocations.length; i++)
                {
                    this._itemSpawner.SpawnPos[i] = rivermap.SpawnLocations[i];
                }
                ref.getComponent('RiverMap').IsActive = true;
                return ref;

            case 4:
                var ref = cc.instantiate(this.RiverMapsPrefabs[3]);
                var rivermap = ref.getComponent('RiverMap');
                rivermap.IsActive = true;
                for (let i = 0; i < rivermap.SpawnLocations.length; i++)
                {
                    this._itemSpawner.SpawnPos[i] = rivermap.SpawnLocations[i];
                }
                ref.getComponent('RiverMap').IsActive = true;
                return ref;

            default:
                console.log('no such case found with type: ' + Type);
                break;
        }
    }
}
