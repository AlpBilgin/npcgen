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
        this.traits.push(new Trait(dbModel.TRAIT1));
        this.traits.push(new Trait(dbModel.TRAIT2));
        this.action = new Action(dbModel.ACTION);
        this.abilityScoreBonuses = new Array<AbilityScoreBonus>();
        this.abilityScoreBonuses.push(new AbilityScoreBonus(dbModel.ABILITY_BONUS1));
        this.abilityScoreBonuses.push(new AbilityScoreBonus(dbModel.ABILITY_BONUS2));
    }
}
