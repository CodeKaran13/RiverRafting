import GameManager from "../Managers/GameManager";
import { Difficulty } from "../Enums";
import MatchManager from "../Managers/MatchManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TurnMeOn extends cc.Component {
    // All class Refs
    // @property({
    //     type: ItemSpawner,
    //     visible: true,
    //     serializable: true
    // })
    // _itemSpawner: ItemSpawner = null;
    // @property({
    //     type: ObstacleSpawner,
    //     visible: true,
    //     serializable: true
    // })
    // _obstacleSpawner: ObstacleSpawner = null;

    // class variables
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // heartSpawnLocations: cc.Node[] = [];
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // logsSpawnLocation: cc.Node[] = [];
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // cycloneSpawnLocation: cc.Node[] = [];
    // @property({
    //     type: cc.Node,
    //     visible: true,
    //     serializable: true
    // })
    // humanSpawnLocation: cc.Node[] = [];
    delaySequence: cc.ActionInterval;

    onSetPosition() {
        // console.log('assigning spawn positions');
        // for (let i = 0; i < this.heartSpawnLocations.length; i++) {
        //     this._itemSpawner.healthSpawnPos[i] = null;
        //     this._itemSpawner.healthSpawnPos[i] = this.heartSpawnLocations[i];
        // }
        // for (let i = 0; i < this.humanSpawnLocation.length; i++) {
        //     this._itemSpawner.humanSpawnPos[i] = null;
        //     this._itemSpawner.humanSpawnPos[i] = this.humanSpawnLocation[i];
        // }
        // for (let i = 0; i < this.cycloneSpawnLocation.length; i++) {
        //     this._obstacleSpawner.CycloneSpawnPos[i] = null;
        //     this._obstacleSpawner.CycloneSpawnPos[i] = this.cycloneSpawnLocation[i];
        // }
        // for (let i = 0; i < this.cycloneSpawnLocation.length; i++) {
        //     this._obstacleSpawner.LogsSpawnPos[i] = null;
        //     this._obstacleSpawner.LogsSpawnPos[i] = this.logsSpawnLocation[i];
        // }
    }

    array: number[] = [];

    setCoinPacks() {
        if (GameManager.currentDifficulty == Difficulty.Easy) {
            for (let i = 0; i < this.array.length; i++) {
                this.array[i] = null;
            }
            for (let i = 0; i < this.node.children[MatchManager.easyIndex].childrenCount; i++) {
                this.array.push(i);
            }
        }
        else if (GameManager.currentDifficulty == Difficulty.Normal) {
            for (let i = 0; i < this.array.length; i++) {
                this.array[i] = null;
            }
            for (let i = 0; i < this.node.children[MatchManager.normalIndex].childrenCount; i++) {
                this.array.push(i);
            }
        }
        else if (GameManager.currentDifficulty == Difficulty.Hard) {
            for (let i = 0; i < this.array.length; i++) {
                this.array[i] = null;
            }
            for (let i = 0; i < this.node.children[MatchManager.hardIndex].childrenCount; i++) {
                this.array.push(i);
            }
        }
    }
    getRandomCoinPack() {
        var randIndex = Math.floor(Math.random() * this.array.length);
        return this.array.splice(randIndex, 1);
    }
    indexPos: number = 0;
    setCoinsPosition() {
        var rand = this.getRandomCoinPack();

        if (GameManager.currentDifficulty == Difficulty.Easy) {
            // for (let i = 0; i < this.node.children[4].children[rand[0]].childrenCount; i++) {
            //     this._itemSpawner.coinSpawnPos[this.indexPos] = null;
            //     this._itemSpawner.coinSpawnPos[this.indexPos] = this.node.children[4].children[rand[0]].children[i];
            //     this.indexPos++;
            // }
            this.node.children[MatchManager.easyIndex].children[rand[0]].active = true;
        }
        else if (GameManager.currentDifficulty == Difficulty.Normal) {
            // for (let i = 0; i < this.node.children[4].children[rand[0]].childrenCount; i++) {
            //     this._itemSpawner.coinSpawnPos[this.indexPos] = null;
            //     this._itemSpawner.coinSpawnPos[this.indexPos] = this.node.children[4].children[rand[0]].children[i];
            //     this.indexPos++;
            // }
            this.node.children[MatchManager.normalIndex].children[rand[0]].active = true;
        }
        else if (GameManager.currentDifficulty == Difficulty.Hard) {
            // for (let i = 0; i < this.node.children[4].children[rand[0]].childrenCount; i++) {
            //     this._itemSpawner.coinSpawnPos[this.indexPos] = null;
            //     this._itemSpawner.coinSpawnPos[this.indexPos] = this.node.children[4].children[rand[0]].children[i];
            //     this.indexPos++;
            // }
            this.node.children[MatchManager.hardIndex].children[rand[0]].active = true;
        }
    }

    triggerOnce: boolean = false;
    onCollisionExit(other, self) {
        if (self.tag == 0 && other.node.name == 'StartCollider' && !this.triggerOnce) {
            this.triggerOnce = true;
            // this.onSetPosition();
            // this.indexPos = 0;
            this.setCoinPacks();
            this.setCoinsPosition();
            this.setCoinsPosition();
            // this._itemSpawner.SpawnHealthPack();
            // this._itemSpawner.SpawnStarPack();
            // this._itemSpawner.SpawnDrowningHumans();
            // this._obstacleSpawner.SpawnLogs();
            // this._obstacleSpawner.SpawnCyclones();

            // cloud/lightning
            if (GameManager.currentDifficulty == Difficulty.Hard)
                this.node.children[this.node.childrenCount - 1].active = true;

            // props
            for (let i = 0; i < self.node.children[0].childrenCount - 1; i++) {
                if (self.node.children[0].children[i].getComponent(cc.RenderComponent) != null) {
                    self.node.children[0].children[i].getComponent(cc.RenderComponent).enabled = true;
                }
                var grandchildcount = 0;
                if (self.node.children[0].children[i].childrenCount > 0) {
                    grandchildcount = self.node.children[0].children[i].children[0].childrenCount;
                    if (grandchildcount > 0) {
                        for (var j = 0; j < grandchildcount; j++) {
                            if (self.node.children[0].children[i].children[0].children[j].getComponent(cc.RenderComponent) != null) {
                                self.node.children[0].children[i].children[0].children[j].getComponent(cc.RenderComponent).enabled = true;
                            }
                        }
                    }
                }
            }

            // console.log("reached here" + this.node.name);
            this.totalCount = this.node.children[0].childrenCount;
            this.resetSequenceProps();
            // this.resetDelayedLoopSequence();
        }
    }

    index: number = 0;
    totalCount: number = 0;
    resetDelayedLoopSequence() {
        this.index = 0;
        this.totalCount = this.node.children[0].childrenCount;
        this.startSequence();
    }
    startSequence() {
        var time = cc.delayTime(0.2);
        this.delaySequence = cc.sequence(time, cc.callFunc(this.delayedLoop, this));
        this.node.runAction(this.delaySequence.repeatForever());
    }
    delayedLoop() {
        if (this.index < this.totalCount) {
            this.node.children[0].children[this.index].active = true;
            this.index++;
        }
        else {
            this.node.stopAction(this.delaySequence);
            this.resetSequenceProps();
        }
    }

    propsIndex: number = 0;
    propsCount: number = 0;
    sequenceProps: cc.ActionInterval;
    resetSequenceProps() {
        this.propsCount = this.node.children[0].children[this.totalCount - 1].childrenCount;
        this.propsIndex = this.propsCount - 1;
        this.startSequenceProps();
    }
    startSequenceProps() {
        var time = cc.delayTime(0.1);
        this.sequenceProps = cc.sequence(time, cc.callFunc(this.propsDelay, this));
        this.node.runAction(this.sequenceProps.repeatForever());
    }
    propsDelay() {
        if (this.propsIndex >= 0) {
            if (this.node.children[0].children[this.totalCount - 1].children[this.propsIndex].getComponent(cc.RenderComponent) != null) {
                this.node.children[0].children[this.totalCount - 1].children[this.propsIndex].getComponent(cc.RenderComponent).enabled = true;
                if (GameManager.isHighEndDevice) {
                    if (this.node.children[0].children[this.totalCount - 1].children[this.propsIndex].getComponent(dragonBones.ArmatureDisplay) != null)
                        this.node.children[0].children[this.totalCount - 1].children[this.propsIndex].getComponent(dragonBones.ArmatureDisplay).timeScale = 0.5;
                }
            }
            this.propsIndex--;
        }
        else {
            this.node.stopAction(this.sequenceProps);
        }
    }
}
