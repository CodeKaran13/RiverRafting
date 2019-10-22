import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpawnNextWave extends cc.Component {
    
    triggerOnce: boolean = false;

    onCollisionEnter(other, self) {
        if (other.node.name == 'Player') {
            // console.log('spawn next wave');
            if (!this.triggerOnce) {
                this.triggerOnce = true;
                // console.log('spawn next wave');
                MatchManager.Instance.spawnNextWave(this.node.parent.height);
            }
        }
    }
}
