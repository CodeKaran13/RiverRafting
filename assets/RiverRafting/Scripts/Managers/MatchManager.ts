const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchManager extends cc.Component {

    @property(cc.Node)
    LevelPrefabs: cc.Node = null;

    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RiverMapsNode: cc.Node = null;

    // onLoad () {}

    start() {
        this.spawnNextRiverMap();
    }

    // update (dt) {}

    spawnNextRiverMap() {
        var nextMap = this.RiverMapsNode.children[0];
        this.RiverMapsNode.removeChild(nextMap);
         
        this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
        nextMap.setPosition(cc.Vec2.ZERO);
        nextMap.active = true;
    }
}