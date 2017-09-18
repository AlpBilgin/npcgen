import { Action } from './action';
import { AbilityScoreBonus } from './abilityScore';
export class CharRace {
    raceName: string;
    traits: string[];
    action: Action;
    abilityScoreBonuses: AbilityScoreBonus[];
}
