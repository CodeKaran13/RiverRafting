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
            for (let i = 0; i < self.node.children[0].childrenCount - 1; i++)
            {
                //self.node.children[0].children[i].active = true;
                // console.log(self.node.name);
                self.node.children[0].children[i].getComponent(cc.RenderComponent).enabled = true;
                var grandchildcount = 0;
                if (self.node.children[0].children[i].childrenCount > 0)
                {
                    grandchildcount = self.node.children[0].children[i].children[0].childrenCount;
                    if (grandchildcount > 0)
                    {
                        for (var j = 0; j < grandchildcount; j++)
                        {
                            self.node.children[0].children[i].children[0].children[j].getComponent(cc.RenderComponent).enabled = true;
                        }
                    }
                }
            }


            // var propcount = self.node.children[0].childrenCount - 1;
            // self.node.children[0].children[propcount].active = true;
            // var grandchildcount = 0;
            // if (self.node.children[0].children[propcount].childrenCount > 0) {
            //     grandchildcount = self.node.children[0].children[propcount].childrenCount;
            //     if (grandchildcount > 0) {
            //         for (var j = 0; j < grandchildcount; j++) {
            //             // if (self.node.children[0].children[propcount].children[j].getComponent(dragonBones.ArmatureDisplay) != null) {
            //             //     self.node.children[0].children[propcount].children[j].getComponent(dragonBones.ArmatureDisplay).playAnimation('tree_movement', 0);
            //             //     self.node.children[0].children[propcount].children[j].getComponent(dragonBones.ArmatureDisplay).timeScale = 1;
            //             // }
            //             self.node.children[0].children[propcount].children[j].getComponent(cc.RenderComponent).enabled = true;
            //         }
            //     }
            // }


            // console.log("reached here" + this.node.name);
            this.totalCount = this.node.children[0].childrenCount;
            this.resetSequenceProps();
            // this.resetDelayedLoopSequence();
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
        this.propsCount = this.node.children[0].children[this.totalCount - 1].childrenCount;
        this.propsIndex = this.propsCount - 1;
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
        if (this.propsIndex >= 0)
        {
            this.node.children[0].children[this.totalCount - 1].children[this.propsIndex].getComponent(cc.RenderComponent).enabled = true;
            this.propsIndex--;
        }
        else
        {
            this.node.stopAction(this.sequenceProps);
        }
    }
}
