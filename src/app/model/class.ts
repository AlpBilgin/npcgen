import { AbilityScores } from './abilityScore';
import { Dice } from './dice';
import { Action } from './action';

export class CharClass {
    public className: string;
    public classStatPriorities: AbilityScores[];
    public classHitDie: Dice;
    public classActions: Action[];
}
