const { ccclass, property } = cc._decorator;

@ccclass
export default class TurnMeOn extends cc.Component
{
    delaySequence: cc.ActionInterval;

    onCollisionExit(other, self)
    {
        if (other.node.name == 'StartCollider')
        {
            // console.log('collider spotted');
            // for (let i = 0; i < self.node.children[0].childrenCount; i++)
            // {
            //     self.node.children[0].children[i].active = true;
            // }
            // for (let i = 0; i < self.node.children[2].childrenCount; i++)
            // {
            //     self.node.children[2].children[i].active = true;
            // }
            this.resetDelayedLoopSequence();
        }
    }

    index: number = 0;
    totalCount: number = 0;
    resetDelayedLoopSequence()
    {
        this.index = 0;
        this.totalCount = this.node.children[0].childrenCount;
        this.startSequence();
    }
    startSequence()
    {
        var time = cc.delayTime(0.2);
        this.delaySequence = cc.sequence(time, cc.callFunc(this.delayedLoop, this));
        this.node.runAction(this.delaySequence.repeatForever());
    }
    delayedLoop()
    {
        if (this.index < this.totalCount)
        {
            this.node.children[0].children[this.index].active = true;
            this.index++;
        }
        else
        {
            this.node.stopAction(this.delaySequence);
            this.resetSequenceProps();
        }
    }

    propsIndex: number = 0;
    propsCount: number = 0;
    sequenceProps: cc.ActionInterval;
    resetSequenceProps()
    {
        this.propsIndex = 0;
        this.propsCount = this.node.children[0].children[this.totalCount - 1].childrenCount;
        this.startSequenceProps();
    }
    startSequenceProps()
    {
        var time = cc.delayTime(0.2);
        this.sequenceProps = cc.sequence(time, cc.callFunc(this.propsDelay, this));
        this.node.runAction(this.sequenceProps.repeatForever());
    }
    propsDelay()
    {
        if (this.propsIndex < this.propsCount)
        {
            this.node.children[0].children[this.totalCount - 1].children[this.propsIndex].active = true;
            this.propsIndex++;
        }
        else
        {
            this.node.stopAction(this.sequenceProps);
        }
    }
}
