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



    // onLoad () {}

    start()
    {

    }

    // update (dt) {}

    addRiverMapToPool(Type: cc.Node)
    {

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
                return ref;

            case 2:
                var ref = cc.instantiate(this.RiverMapsPrefabs[1]);
                return ref;

            case 3:
                var ref = cc.instantiate(this.RiverMapsPrefabs[2]);
                return ref;

            case 4:
                var ref = cc.instantiate(this.RiverMapsPrefabs[3]);
                return ref;

            default:
                console.log('no such case found with type: ' + Type);
                break;
        }
    }
}
