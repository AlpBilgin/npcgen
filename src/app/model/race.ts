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
    constructor(charRace: any) {
        this.raceName = charRace.NAME;
        this.traits = new Array<Trait>();
        this.traits.push(new Trait(charRace.TRAIT1));
        this.traits.push(new Trait(charRace.TRAIT2));
        this.action = new Action(charRace.ACTION);
        this.abilityScoreBonuses = new Array<AbilityScoreBonus>();
        this.abilityScoreBonuses.push(new AbilityScoreBonus(charRace.ABILITY_BONUS1));
        this.abilityScoreBonuses.push(new AbilityScoreBonus(charRace.ABILITY_BONUS2));
    }
}
