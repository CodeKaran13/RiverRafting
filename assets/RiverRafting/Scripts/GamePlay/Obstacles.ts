import ObstaclePool from "../Pools/ObstaclePool";

const {ccclass, property} = cc._decorator;

export enum ObstacleType
{
    Deck = 0,
    Log = 1,
    Rock = 2,
    Ramps = 3,
    Cyclone = 4
}

@ccclass
export default class Obstacles extends cc.Component {

    myType: ObstacleType = null;

    @property({
        type: ObstaclePool,
        visible: true,
        serializable: true
    })
    _ObstaclePoolRef: ObstaclePool = null;

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
