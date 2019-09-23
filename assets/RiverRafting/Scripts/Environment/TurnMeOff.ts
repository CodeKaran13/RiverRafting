import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TurnMeOff extends cc.Component {

    onCollisionExit(other, self: cc.BoxCollider) {
        if (self.tag == 1 && other.node.name == 'EndCollider') {
            // console.log('deactivating me');
            // this.resetSequenceProps();
            // var pos: number[] = [self.node.position.y];
            // cc.systemEvent.emit(Renderer.TURN_OFF, { pos });

            // for clouds and lightning if active in scene
            // this.node.children[this.node.childrenCount - 1].active = false;

            this.node.children[0].children[0].children[0].group = 'Cull';
            this.node.children[0].children[0].children[2].group = 'Cull';

            // for (let i = 0; i < this.node.children[0].children[MatchManager.easyIndex].childrenCount; i++) {
            //     if (this.node.children[0].children[MatchManager.easyIndex].children[i].active) {
            //         for (let j = 0; j < this.node.children[0].children[MatchManager.easyIndex].children[i].childrenCount; j++) {
            //             this.node.children[0].children[MatchManager.easyIndex].children[i].children[j].group = 'Cull';
            //         }
            //     }
            // }

            MatchManager.Instance.spawnNextRiverMap();
        }
    }

    // index: number = 0;
    // totalCount: number = 0;
    // delaySequence: cc.ActionInterval;
    // resetDelayedLoopSequence() {
    //     this.index = 0;
    //     this.totalCount = this.node.children[0].childrenCount;
    //     this.startSequence();
    // }
    // startSequence() {
    //     var time = cc.delayTime(0.2);
    //     this.delaySequence = cc.sequence(time, cc.callFunc(this.delayedLoop, this));
    //     this.node.runAction(this.delaySequence.repeatForever());
    // }
    // delayedLoop() {
    //     if (this.index < this.totalCount) {
    //         this.node.children[0].children[this.index].active = false;
    //         this.index++;
    //     }
    //     else {
    //         this.node.stopAction(this.delaySequence);
    //         // this.resetSequenceProps();
    //     }
    // }

    // propsIndex: number = 0;
    // propsCount: number = 0;
    // sequenceProps: cc.ActionInterval;
    // resetSequenceProps() {
    //     this.propsIndex = 0;
    //     this.totalCount = this.node.children[0].childrenCount;
    //     this.propsCount = this.node.children[0].children[this.totalCount - 1].childrenCount;
    //     this.startSequenceProps();
    // }
    // startSequenceProps() {
    //     var time = cc.delayTime(0.2);
    //     this.sequenceProps = cc.sequence(time, cc.callFunc(this.propsDelay, this));
    //     this.node.runAction(this.sequenceProps.repeatForever());
    // }
    // propsDelay() {
    //     if (this.propsIndex < this.propsCount) {
    //         this.node.children[0].children[this.totalCount - 1].children[this.propsIndex].active = false;
    //         // console.log('' + this.node.children[0].children[this.totalCount - 1].children[this.propsIndex].name);
    //         // if(this.node.children[0].children[this.totalCount-1].children[this.propsIndex].getComponent(dragonBones.ArmatureDisplay)!=null)
    //         // {
    //         //     this.node.children[0].children[this.totalCount-1].children[this.propsIndex].getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
    //         // }
    //         this.propsIndex++;
    //     }
    //     else {
    //         this.node.stopAction(this.sequenceProps);
    //         this.resetDelayedLoopSequence();
    //     }
    // }
}