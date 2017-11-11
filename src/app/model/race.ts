import { Action } from './action';
import { Trait } from './trait';
import { AbilityScoreBonus } from './abilityScore';

export class CharRaceSummary {
    ID: number;
    NAME: string;
    constructor(dbModel: any) {
        this.ID = dbModel.ID;
        this.NAME = dbModel.NAME;
    }
}
export class CharRace {
    raceName: string;
    traits: Trait[];
    action: Action;
    abilityScoreBonuses: AbilityScoreBonus[];
    constructor(dbModel: any) {
        this.raceName = dbModel.NAME;
        this.traits = new Array<Trait>();
        this.traits.push(new Trait({ NAME: dbModel.T1NAME, CONTENT: dbModel.T1CONTENT }));
        this.traits.push(new Trait({ NAME: dbModel.T2NAME, CONTENT: dbModel.T2CONTENT }));
        this.action = new Action({ NAME: dbModel.ANAME, CONTENT: dbModel.ACONTENT });
        this.abilityScoreBonuses = new Array<AbilityScoreBonus>();
        this.abilityScoreBonuses.push(new AbilityScoreBonus({ ABILITY: dbModel.AB1ABILITY, BONUS: dbModel.AB1BONUS }));
        this.abilityScoreBonuses.push(new AbilityScoreBonus({ ABILITY: dbModel.AB2ABILITY, BONUS: dbModel.AB2BONUS }));
    }
}
