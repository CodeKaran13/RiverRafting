import MatchManager from "../Managers/MatchManager";
import Waves from "../GamePlay/Waves";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpawnNextWave extends cc.Component {
    // @property({
    //     type: MatchManager,
    //     visible: true,
    //     serializable: true
    // })
    // _matchManager: MatchManager = null;

    triggerOnce: boolean = false;

    onCollisionEnter(other, self) {
        if (other.node.name == 'Player') {
            // console.log('spawn next wave');
            if (!this.triggerOnce) {
                this.triggerOnce = true;
                MatchManager.Instance.spawnNextWave(this.node.parent.height);
            }
            // this.node.parent.getComponent(Waves).CheckPlayerLocation = true;
        }
    }
}
