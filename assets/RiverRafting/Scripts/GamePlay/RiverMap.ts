import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RiverMap extends cc.Component {

    @property({
        type: MatchManager,
        visible: true,
        serializable: true
    })
    _matchManagerRef: MatchManager = null;

    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    player: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._matchManagerRef = cc.find('Script Collection/Match Manager').getComponent('MatchManager');
        this.player = cc.find('Player');
    }

    start() {

    }

    onCollisionEnter(other, self) {
        console.log('collision enter');
        if (other.node.name == 'Player') {
            this._matchManagerRef.spawnNextRiverMap(this.node.height);
            this.destroy();
        }
    }

    update(dt) {
        // if (this.player != null) {
        //     if (this.player.position.y > this.node.height - 1920) {
        //         this._matchManagerRef.spawnNextRiverMap(this.node.height);
        //         this.destroy();
        //     }
        // }
    }
}
