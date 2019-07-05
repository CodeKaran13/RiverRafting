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
    BreakableDecks: cc.Node[] = [];

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
                name.parent.removeChild(name);
                name.active = false;
                this.RollingLogs.push(name);
                break;
            case 'breakablelogs':
                name.parent.removeChild(name);
                name.active = false;
                this.BreakableLogs.push(name);
                break;
        }
    }

    getObstacleFromPool(packName: string): cc.Node
    {
        switch (packName)
        {
            case 'rollinglogs':
                var rollinglog = this.RollingLogs.pop();
                // rollinglog.active = true;
                return rollinglog;
                break;

            case 'breakablelogs':
                var breakablelog = this.BreakableLogs.pop();
                // breakablelog.active = true;
                return breakablelog;
                break;
        }
    }
}
