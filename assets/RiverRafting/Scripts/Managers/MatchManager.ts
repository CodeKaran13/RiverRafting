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

    @property({
        type: cc.Prefab,
        visible: true,
        serializable: true
    })
    RiverMaps: cc.Prefab[] = [];

    // onLoad () {}

    start() {
        this.spawnNextRiverMap(0);
    }

    // update (dt) {}

    spawnNextRiverMap(height: number) {
        var previousHeight = 0;
        previousHeight = previousHeight + height;
        console.log('height', height);
        console.log('preheight', previousHeight);
        switch (this.getRandomNumber()) {
            case 0:
                var nextMap = cc.instantiate(this.RiverMaps[0]); //this.RiverMapsNode.children[0];
                // this.RiverMapsNode.removeChild(nextMap);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                nextMap.setPosition(cc.Vec2.ZERO);

                nextMap.setPosition(new cc.Vec2(0, previousHeight + height));
                nextMap.active = true;
                break;
            case 1:
                var nextMap = cc.instantiate(this.RiverMaps[1]); //this.RiverMapsNode.children[1];
                // this.RiverMapsNode.removeChild(nextMap);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                // nextMap.setPosition(cc.Vec2.ZERO);
                nextMap.setPosition(new cc.Vec2(0, previousHeight + height));
                nextMap.active = true;
                break;
            case 2:
                var nextMap = cc.instantiate(this.RiverMaps[2]); //this.RiverMapsNode.children[2];
                // this.RiverMapsNode.removeChild(nextMap);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                // nextMap.setPosition(cc.Vec2.ZERO);
                nextMap.setPosition(new cc.Vec2(0, previousHeight + height));
                nextMap.active = true;
                break;
            case 3:
                var nextMap = cc.instantiate(this.RiverMaps[3]); //this.RiverMapsNode.children[3];
                // this.RiverMapsNode.removeChild(nextMap);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                // nextMap.setPosition(cc.Vec2.ZERO);
                nextMap.setPosition(new cc.Vec2(0, previousHeight + height));
                nextMap.active = true;
                break;
        }
    }

    getRandomNumber() {
        var rand = Math.floor(Math.random() * 3);

        return rand;
    }
}