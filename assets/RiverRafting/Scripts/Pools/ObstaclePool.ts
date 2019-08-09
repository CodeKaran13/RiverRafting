import Obstacles, { ObstacleType } from "../GamePlay/Obstacles";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ObstaclePool extends cc.Component
{

    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RollingLogs: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    BreakableLogs: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    BreakableDocks: cc.Node[] = [];

    // onLoad () {}

    start()
    {

    }

    // update (dt) {}

    addObstacleBackToPool(name: cc.Node)
    {
        var type = name.getComponent(Obstacles).myType;
        switch (type)
        {
            case ObstacleType.Log:
                name.parent.removeChild(name);
                name.active = false;
                // this.BreakableLogs.push(name);
                break;
            case ObstacleType.Dock:
                name.parent.removeChild(name);
                name.active = false;
                // this.BreakableDocks.push(name);
                break;
        }
    }

    getObstacleFromPool(obstacleType: ObstacleType): cc.Node
    {
        switch (obstacleType)
        {
            case ObstacleType.Log:
                var breakablelog = this.BreakableLogs.pop();
                return breakablelog;
            case ObstacleType.Dock:
                var dock = this.BreakableDocks.pop();
                return dock;
        }
    }
}
