import MatchManager from "../Managers/MatchManager";
import Player from "../Player";
import SpawnNextWave from "../Environment/SpawnNextWave";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Waves extends cc.Component {
    @property({
        type: SpawnNextWave,
        visible: true,
        serializable: true
    })
    _spawnNextWave: SpawnNextWave = null;

    // Script variables
    CheckPlayerLocation: boolean = false;
    IsActive: boolean = false;
    myPos: cc.Vec2;

    start() {
        this.startSequence();
    }

    sequence: cc.ActionInterval;
    // @property(cc.BoxCollider)
    // myCol: cc.BoxCollider = null;
    startSequence() {
        var time = cc.delayTime(1);
        this.sequence = cc.sequence(time, cc.callFunc(this.checkPosition, this));
        this.node.runAction(this.sequence.repeatForever());
    }
    checkPosition() {
        if (this.IsActive && this.CheckPlayerLocation) {
            var checkpoint = this.node.height + this.myPos.y;
            if (Player.Instance.node.position.y > checkpoint + 150) {
                // console.log('changed to cull group');
                this.changeToCullGroup();
            }
        }
    }

    changeToDefaultGroup() {
        // this.myCol.enabled = true;
        this.node.group = 'Waves';
    }
    changeToCullGroup() {
        // this.myCol.enabled = false;
        this.node.group = 'Cull';
        MatchManager.Instance._poolingSystem.addWavePrefabToPool(this.node);
        this.node.stopAction(this.sequence);
    }
}
