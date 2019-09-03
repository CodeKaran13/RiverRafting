import Obstacles, { ObstacleType } from "../GamePlay/Obstacles";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ObstaclePool extends cc.Component {

    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // Logs: cc.Node[] = [];
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // Cyclones: cc.Node[] = [];

    public static Instance: ObstaclePool = null;

    start() {
        if (ObstaclePool.Instance == null) {
            ObstaclePool.Instance = this;
        }
    }

    addObstacleBackToPool(name: cc.Node) {
        var type = name.getComponent(Obstacles).myType;
        switch (type) {
            case ObstacleType.Log:
                // if (name.parent != null)
                //     name.parent.removeChild(name);
                name.active = false;
                // this.Logs.push(name);
                break;
            case ObstacleType.Cyclone:
                // if (name.parent != null)
                //     name.parent.removeChild(name);
                name.active = false;
                // this.Cyclones.push(name);
                break;
        }
    }

    getObstacleFromPool(obstacleType: ObstacleType) {
        switch (obstacleType) {
            case ObstacleType.Log:
                // var log = this.Logs.pop();
                // return log;
            case ObstacleType.Cyclone:
                // var cyclone = this.Cyclones.pop();
                // return cyclone;
        }
    }
}
