import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TurnMeOn extends cc.Component {


    delaySequence: cc.ActionInterval;

    onEnable() {
        //this.setCoinPacks();
        this.setCoinsPackActive();
        // this.setCoinsPackActive();
    }

    array: number[] = [];

    setCoinPacks() {
        // if (GameManager.currentDifficulty == Difficulty.Easy) {
        //     for (let i = 0; i < this.array.length; i++) {
        //         this.array[i] = null;
        //     }
        //     for (let i = 0; i < this.node.children[0].children[MatchManager.easyIndex].childrenCount; i++) {
        //         this.array.push(i);
        //     }
        // }
        // else if (GameManager.currentDifficulty == Difficulty.Normal) {
        //     for (let i = 0; i < this.array.length; i++) {
        //         this.array[i] = null;
        //     }
        //     for (let i = 0; i < this.node.children[0].children[MatchManager.normalIndex].childrenCount; i++) {
        //         this.array.push(i);
        //     }
        // }
        // else if (GameManager.currentDifficulty == Difficulty.Hard) {
        //     for (let i = 0; i < this.array.length; i++) {
        //         this.array[i] = null;
        //     }
        //     for (let i = 0; i < this.node.children[0].children[MatchManager.hardIndex].childrenCount; i++) {
        //         this.array.push(i);
        //     }
        // }

        for (let i = 0; i < this.array.length; i++) {
            this.array[i] = null;
        }
        for (let i = 0; i < this.node.children[MatchManager.easyIndex].childrenCount; i++) {
            this.array.push(i);
        }
    }
    getRandomCoinPack() {
        //var randIndex = Math.floor(Math.random() * this.array.length);
        //return this.array.splice(randIndex, 1);
return 0;
    }
    // indexPos: number = 0;
    setCoinsPackActive() {
        var rand = this.getRandomCoinPack();
        // console.log('setting coins pack: #', rand);
        // if (GameManager.currentDifficulty == Difficulty.Easy) {
        //     this.node.children[0].children[MatchManager.easyIndex].children[rand[0]].active = true;
        // }
        // else if (GameManager.currentDifficulty == Difficulty.Normal) {
        //     this.node.children[0].children[MatchManager.normalIndex].children[rand[0]].active = true;
        // }
        // else if (GameManager.currentDifficulty == Difficulty.Hard) {
        //     this.node.children[0].children[MatchManager.hardIndex].children[rand[0]].active = true;
        // }

        this.node.children[MatchManager.easyIndex].children[rand].active = true;

        // for (let i = 0; i < this.node.children[0].children[MatchManager.easyIndex].children[rand[0]].childrenCount; i++)
        //     this.node.children[0].children[MatchManager.easyIndex].children[rand[0]].children[i].group = 'default';
    }

    triggerOnce: boolean = false;
    onCollisionExit(other, self) {
        if (self.tag == 0 && other.node.name == 'StartCollider' && !this.triggerOnce) {
            this.triggerOnce = true;
            // console.log('turn on name: ' + this.node.convertToWorldSpaceAR(cc.Vec2.ZERO).y);

            // cloud/lightning
            // if (GameManager.currentDifficulty == Difficulty.Hard) {
            //     this.node.children[this.node.childrenCount - 1].active = true;
            // }

            this.node.children[0].children[0].group = 'Waves';
            this.node.children[0].children[1].group = 'default';
            this.node.children[0].children[3].group = 'default';

            // for (let i = 0; i < this.node.children[0].children[MatchManager.easyIndex].childrenCount; i++) {
            //     if (this.node.children[0].children[MatchManager.easyIndex].children[i].active) {
            //         for (let j = 0; j < this.node.children[0].children[MatchManager.easyIndex].children[i].childrenCount; j++) {
            //             this.node.children[0].children[MatchManager.easyIndex].children[i].children[j].group = 'default';
            //         }
            //     }
            // }

            // landmass and rocks
            // for (let i = 0; i < self.node.children[0].childrenCount - 1; i++) {
            //     // console.log('landmass turn on: ' + i);
            //     this.node.children[0].children[i].group = 'default';
            //     // var grandchildcount = 0;
            //     // if (self.node.children[0].children[i].childrenCount > 0) {
            //     //     grandchildcount = self.node.children[0].children[i].children[0].childrenCount;
            //     //     if (grandchildcount > 0) {
            //     //         for (var j = 0; j < grandchildcount; j++) {
            //     //             if (self.node.children[0].children[i].children[0].children[j].getComponent(cc.RenderComponent) != null) {
            //     //                 self.node.children[0].children[i].children[0].children[j].getComponent(cc.RenderComponent).enabled = true;
            //     //             }
            //     //         }
            //     //     }
            //     // }
            // }

            // console.log("reached here" + this.node.name);
            // this.totalCount = this.node.children[0].childrenCount;
            // this.resetSequenceProps();
        }
    }

    // index: number = 0;
    // grandchildcountIndex: number = 0;
    // totalCount: number = 0;
    // resetDelayedLoopSequence() {
    //     this.index = 0;
    //     this.grandchildcountIndex = 0;
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
    //         if (this.node.children[0].children[this.index].getComponent(cc.RenderComponent) != null) {
    //             this.node.children[0].children[this.index].getComponent(cc.RenderComponent).enabled = true;
    //             var grandchildcount = 0;
    //             if (this.node.children[0].children[this.index].childrenCount > 0) {
    //                 grandchildcount = this.node.children[0].children[this.index].children[0].childrenCount;
    //                 if (this.grandchildcountIndex < grandchildcount) {
    //                     if (this.node.children[0].children[this.index].children[0].children[this.grandchildcountIndex].getComponent(cc.RenderComponent) != null)
    //                         this.node.children[0].children[this.index].children[0].children[this.grandchildcountIndex].getComponent(cc.RenderComponent).enabled = true;
    //                 }

    //                 this.grandchildcountIndex++;
    //             }
    //         }

    //         this.index++;
    //     }
    //     else {
    //         this.node.stopAction(this.delaySequence);
    //         this.resetSequenceProps();
    //     }
    // }

    // propsIndex: number = 0;
    // propsCount: number = 0;
    // sequenceProps: cc.ActionInterval;
    // resetSequenceProps() {
    //     this.propsCount = this.node.children[0].children[this.totalCount - 1].childrenCount;
    //     this.propsIndex = this.propsCount - 1;
    //     this.startSequenceProps();
    // }
    // startSequenceProps() {
    //     var time = cc.delayTime(0.2);
    //     this.sequenceProps = cc.sequence(time, cc.callFunc(this.propsDelay, this));
    //     this.node.runAction(this.sequenceProps.repeatForever());
    // }
    // propsDelay() {
    //     if (this.propsIndex >= 0) {
    //         // console.log('prop index: turn on: ' + this.propsIndex);
    //         this.node.children[0].children[this.totalCount - 1].children[this.propsIndex].group = 'default';
    //         this.propsIndex--;
    //     }
    //     else {
    //         this.node.stopAction(this.sequenceProps);
    //     }
    // }
}
