import { AbilityScores, AbilityScoreBonus } from './abilityScore';
import { Dice } from './dice';
import { Action } from './action';

export class CharClassSummary {
    ID: number;
    NAME: string;
    constructor(dbModel: any) {
        this.ID = dbModel.ID;
        this.NAME = dbModel.NAME;
    }
}
export class CharClass {
    public className: string;
    public classStatPriorities: AbilityScores[];
    public classHitDie: Dice;
    public classActions: Action[];
    constructor(dbModel: any) {
        this.className = dbModel.NAME;
        this.classActions = new Array<Action>();
        this.classActions.push(new Action(dbModel.ACTION1));
        this.classActions.push(new Action(dbModel.ACTION2));
        this.classStatPriorities = new Array<AbilityScores>();
        this.classStatPriorities.push(AbilityScoreBonus.mapString2Enum(dbModel.STAT1));
        this.classStatPriorities.push(AbilityScoreBonus.mapString2Enum(dbModel.STAT2));
        this.classStatPriorities.push(AbilityScoreBonus.mapString2Enum(dbModel.STAT3));
        this.classStatPriorities.push(AbilityScoreBonus.mapString2Enum(dbModel.STAT4));
        this.classStatPriorities.push(AbilityScoreBonus.mapString2Enum(dbModel.STAT5));
        this.classStatPriorities.push(AbilityScoreBonus.mapString2Enum(dbModel.STAT6));
        // TODO fix this after backend is patched
        this.classHitDie = new Dice(1, 10, 0, 0);
    }
}
