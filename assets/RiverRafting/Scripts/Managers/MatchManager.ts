import PoolingSystem from "../GamePlay/PoolingSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchManager extends cc.Component
{

    @property(cc.Node)
    LevelPrefabs: cc.Node = null;

    @property({
        type: PoolingSystem,
        visible: true,
        serializable: true
    })
    _poolingSystem: PoolingSystem = null;

    totalHeight: number = 0;
    // onLoad () {}

    start()
    {
        this.spawnNextRiverMap(0);
    }

    // update (dt) {}

    spawnNextRiverMap(height: number)
    {

        // this.totalHeight = this.totalHeight + height;
        // var nextMap = this._poolingSystem.getRiverMapfromPool(1);

        // this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
        // nextMap.setPosition(cc.Vec2.ZERO);

        // nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
        // nextMap.active = true;

        switch (this.getRandomNumber())
        {
            case 1:
                this.totalHeight = this.totalHeight + height;
                var nextMap = this._poolingSystem.getRiverMapfromPool(1);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                nextMap.setPosition(cc.Vec2.ZERO);

                nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
                nextMap.active = true;

                for (let i = 0; i < nextMap.childrenCount; i++)
                {
                    for (let j = 0; j < nextMap.children[i].childrenCount; j++)
                    {
                        nextMap.children[i].children[j].active = true;
                    }
                }

                break;
            case 2:
                this.totalHeight = this.totalHeight + height;
                var nextMap = this._poolingSystem.getRiverMapfromPool(2);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                nextMap.setPosition(cc.Vec2.ZERO);
                nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
                nextMap.active = true;

                // for (let i = 0; i < nextMap.children[0].childrenCount; i++)
                // {
                //     nextMap.children[0].children[i].active = true;
                // }
                for (let i = 0; i < nextMap.childrenCount; i++)
                {
                    for (let j = 0; j < nextMap.children[i].childrenCount; j++)
                    {
                        nextMap.children[i].children[j].active = true;
                    }
                }

                break;
            case 3:
                this.totalHeight = this.totalHeight + height;
                var nextMap = this._poolingSystem.getRiverMapfromPool(3);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                nextMap.setPosition(cc.Vec2.ZERO);

                nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
                nextMap.active = true;

                // for (let i = 0; i < nextMap.children[0].childrenCount; i++)
                // {
                //     nextMap.children[0].children[i].active = true;
                // }
                for (let i = 0; i < nextMap.childrenCount; i++)
                {
                    for (let j = 0; j < nextMap.children[i].childrenCount; j++)
                    {
                        nextMap.children[i].children[j].active = true;
                    }
                }

                break;
            case 4:
                this.totalHeight = this.totalHeight + height;
                var nextMap = this._poolingSystem.getRiverMapfromPool(4);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                nextMap.setPosition(cc.Vec2.ZERO);

                nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
                nextMap.active = true;
                break;
        }
    }

    getRandomNumber()
    {
        // will return 1,2,3
        var rand = Math.floor(Math.random() * 3) + 1;
        // console.log('random number: ' + rand);
        return rand;
        // return 1;
    }
}