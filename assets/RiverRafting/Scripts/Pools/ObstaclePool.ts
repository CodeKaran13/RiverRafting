const { ccclass, property } = cc._decorator;

@ccclass
export default class ObstaclePool extends cc.Component
{

    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    RollingLogs: cc.Node[] = [];

    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    BreakableLogs: cc.Node[] = [];

    @property({
        type: cc.Node,
        visible: true,
        serializable: true
    })
    BreakableDocks: cc.Node[] = [];

    // onLoad () {}

    start()
    {

    }

    // update (dt) {}

    addObstacleBackToPool(name: cc.Node)
    {
        switch (name.name)
        {
            case 'rollinglogs':
                // name.parent.removeChild(name);
                name.getComponent('RollingLogs').enabled = false;
                name.active = false;
                this.RollingLogs.push(name);
                break;
            case 'breakablelogs':
                name.parent.removeChild(name);
                name.active = false;
                this.BreakableLogs.push(name);
                break;
            case 'docks':
                name.parent.removeChild(name);
                name.active = false;
                this.BreakableDocks.push(name);
                break;
        }
    }

    getObstacleFromPool(obstacleName: string): cc.Node
    {
        switch (obstacleName)
        {
            case 'rollinglogs':
                console.log('get rolling log');
                var rollinglog = this.RollingLogs.pop();
                rollinglog.active = true;
                return rollinglog;
            case 'breakablelogs':
                var breakablelog = this.BreakableLogs.pop();
                // breakablelog.active = true;
                return breakablelog;
            case 'docks':
                var dock = this.BreakableDocks.pop();
                return dock;
        }
    }
}
