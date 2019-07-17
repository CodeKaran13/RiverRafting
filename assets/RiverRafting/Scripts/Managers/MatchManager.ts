import PoolingSystem from "../Pools/PoolingSystem";
import TimeManager from "./TimeManager";
import GameManager from "./GameManager";
import ScoreManager from "./ScoreManager";
import UIManager from "./UIManager";
import ObstacleSpawner from "../GamePlay/ObstacleSpawner";
import BonusSystem from "../GamePlay/BonusSystem";
import ItemSpawner from "../GamePlay/ItemSpawner";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MatchManager extends cc.Component
{
    // RiverMap Prefabs Parent Node
    @property(cc.Node)
    LevelPrefabs: cc.Node = null;

    // All script Refs
    @property({
        type: PoolingSystem,
        visible: true,
        serializable: true
    })
    _poolingSystem: PoolingSystem = null;
    @property({
        type: TimeManager,
        visible: true,
        serializable: true
    })
    _timeManager: TimeManager = null;
    @property({
        type: GameManager,
        visible: true,
        serializable: true
    })
    _gameManager: GameManager = null;
    _scoreManager: ScoreManager = null;
    _UIManager: UIManager = null;
    @property({
        type: BonusSystem,
        visible: true,
        serializable: true
    })
    _bonusSystem: BonusSystem = null;
    _obstacleSpawner: ObstacleSpawner = null;
    _itemSpawner: ItemSpawner = null;

    // Script variables
    totalHeight: number = 0;
    @property
    totalObstacleToSpawnOnPrefab: number = 5;

    onLoad() 
    {
        this._timeManager._matchManager = this;
        this._gameManager._matchManager = this;
        this._obstacleSpawner = this.node.getComponent(ObstacleSpawner);
        this._itemSpawner = this.node.getComponent(ItemSpawner);
    }

    StartGame()
    {
        this.spawnNextRiverMap(0);

        this._bonusSystem.resetBonus();
        this._bonusSystem.restartCounter();

        this._itemSpawner.onGameStart();
    }

    spawnNextRiverMap(height: number)
    {
        switch (this.getRandomNumber())
        {
            case 1:
                this.totalHeight = this.totalHeight + height;
                var nextMap = this._poolingSystem.getRiverMapfromPool(1);

                this.LevelPrefabs.addChild(nextMap);
                nextMap.setPosition(cc.Vec2.ZERO);

                nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
                nextMap.active = true;

                for (let i = 0; i < nextMap.children[0].childrenCount; i++)
                {
                    nextMap.children[0].children[i].active = true;
                }

                this._obstacleSpawner.SpawnDocks();

                break;
            case 2:
                this.totalHeight = this.totalHeight + height;
                var nextMap = this._poolingSystem.getRiverMapfromPool(2);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                nextMap.setPosition(cc.Vec2.ZERO);
                nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
                nextMap.active = true;

                for (let i = 0; i < nextMap.children[0].childrenCount; i++)
                {
                    nextMap.children[0].children[i].active = true;
                }

                break;
            case 3:
                this.totalHeight = this.totalHeight + height;
                var nextMap = this._poolingSystem.getRiverMapfromPool(3);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                nextMap.setPosition(cc.Vec2.ZERO);

                nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
                nextMap.active = true;

                for (let i = 0; i < nextMap.children[0].childrenCount; i++)
                {
                    nextMap.children[0].children[i].active = true;
                }

                break;
            case 4:
                this.totalHeight = this.totalHeight + height;
                var nextMap = this._poolingSystem.getRiverMapfromPool(4);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                nextMap.setPosition(cc.Vec2.ZERO);

                nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
                nextMap.active = true;

                for (let i = 0; i < nextMap.children[0].childrenCount; i++)
                {
                    nextMap.children[0].children[i].active = true;
                }
                break;
            case 5:
                this.totalHeight = this.totalHeight + height;
                var nextMap = this._poolingSystem.getRiverMapfromPool(5);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                nextMap.setPosition(cc.Vec2.ZERO);

                nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
                nextMap.active = true;

                for (let i = 0; i < nextMap.children[0].childrenCount; i++)
                {
                    nextMap.children[0].children[i].active = true;
                }
                break;
            case 6:
                this.totalHeight = this.totalHeight + height;
                var nextMap = this._poolingSystem.getRiverMapfromPool(6);

                this.LevelPrefabs.addChild(nextMap, 0, nextMap.name);
                nextMap.setPosition(cc.Vec2.ZERO);

                nextMap.setPosition(new cc.Vec2(0, this.totalHeight));
                nextMap.active = true;

                for (let i = 0; i < nextMap.children[0].childrenCount; i++)
                {
                    nextMap.children[0].children[i].active = true;
                }
                break;
        }
    }

    getRandomNumber()
    {
        // will return 1,2,3,4
        // var rand = Math.floor(Math.random() * 4) + 1;
        // console.log('random number: ' + rand);
        // return rand;
        return 2;
    }
}