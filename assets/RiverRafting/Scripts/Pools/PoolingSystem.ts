import ItemSpawner from "../GamePlay/ItemSpawner";

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
    _itemSpawnerRef: ItemSpawner = null;

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
                    // console.log('1: ' + i);
                    this._itemSpawnerRef.SpawnPos[i] = rivermap.SpawnLocations[i];
                }
                return ref;

            case 2:
                var ref = cc.instantiate(this.RiverMapsPrefabs[1]);
                var rivermap = ref.getComponent('RiverMap');
                rivermap.IsActive = true;
                for (let i = 0; i < rivermap.SpawnLocations.length; i++)
                {
                    // console.log('2: ' + i);
                    this._itemSpawnerRef.SpawnPos[i] = rivermap.SpawnLocations[i];
                }
                ref.getComponent('RiverMap').IsActive = true;
                return ref;

            case 3:
                var ref = cc.instantiate(this.RiverMapsPrefabs[2]);
                var rivermap = ref.getComponent('RiverMap');
                rivermap.IsActive = true;
                for (let i = 0; i < rivermap.SpawnLocations.length; i++)
                {
                    // console.log('3: ' + i);
                    this._itemSpawnerRef.SpawnPos[i] = rivermap.SpawnLocations[i];
                }
                ref.getComponent('RiverMap').IsActive = true;
                return ref;

            case 4:
                var ref = cc.instantiate(this.RiverMapsPrefabs[3]);
                var rivermap = ref.getComponent('RiverMap');
                rivermap.IsActive = true;
                for (let i = 0; i < rivermap.SpawnLocations.length; i++)
                {
                    this._itemSpawnerRef.SpawnPos[i] = rivermap.SpawnLocations[i];
                }
                ref.getComponent('RiverMap').IsActive = true;
                return ref;

            default:
                console.log('no such case found with type: ' + Type);
                break;
        }
    }
}
