import ItemSpawner from "../GamePlay/ItemSpawner";
import ObstacleSpawner from "../GamePlay/ObstacleSpawner";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TurnMeOn extends cc.Component {
    // All class Refs
    @property({
        type: ItemSpawner,
        visible: true,
        serializable: true
    })
    _itemSpawner: ItemSpawner = null;
    @property({
        type: ObstacleSpawner,
        visible: true,
        serializable: true
    })
    _obstacleSpawner: ObstacleSpawner = null;

    // class variables
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    heartSpawnLocations: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    logsSpawnLocation: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    cycloneSpawnLocation: cc.Node[] = [];
    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    humanSpawnLocation: cc.Node[] = [];
    delaySequence: cc.ActionInterval;

    onSetPosition() {
        // console.log('assigning spawn positions');
        for (let i = 0; i < this.heartSpawnLocations.length; i++) {
            this._itemSpawner.healthSpawnPos[i] = null;
            this._itemSpawner.healthSpawnPos[i] = this.heartSpawnLocations[i];
        }
        for (let i = 0; i < this.humanSpawnLocation.length; i++) {
            this._itemSpawner.humanSpawnPos[i] = null;
            this._itemSpawner.humanSpawnPos[i] = this.humanSpawnLocation[i];
        }
        for (let i = 0; i < this.cycloneSpawnLocation.length; i++) {
            this._obstacleSpawner.CycloneSpawnPos[i] = null;
            this._obstacleSpawner.CycloneSpawnPos[i] = this.cycloneSpawnLocation[i];
        }
        for (let i = 0; i < this.cycloneSpawnLocation.length; i++) {
            this._obstacleSpawner.LogsSpawnPos[i] = null;
            this._obstacleSpawner.LogsSpawnPos[i] = this.logsSpawnLocation[i];
        }
    }

    onCollisionExit(other, self) {
        if (self.tag == 0 && other.node.name == 'StartCollider') {
            this.onSetPosition();
            this._itemSpawner.SpawnHealthPack();
            // this._itemSpawner.SpawnCoinPack();
            // console.log('collider spotted');
            for (let i = 0; i < self.node.children[0].childrenCount - 1; i++) {
                // self.node.children[0].children[i].active = true;
                // console.log(self.node.name);
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
        var time = cc.delayTime(0.2);
        this.sequenceProps = cc.sequence(time, cc.callFunc(this.propsDelay, this));
        this.node.runAction(this.sequenceProps.repeatForever());
    }
    propsDelay() {
        if (this.propsIndex >= 0) {
            if (this.node.children[0].children[this.totalCount - 1].children[this.propsIndex].getComponent(cc.RenderComponent) != null) {
                this.node.children[0].children[this.totalCount - 1].children[this.propsIndex].getComponent(cc.RenderComponent).enabled = true;
            }
            this.propsIndex--;
        }
        else {
            this.node.stopAction(this.sequenceProps);
        }
    }
}
