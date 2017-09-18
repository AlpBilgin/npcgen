import { AbilityScores } from './abilityScore';
import { Dice } from './dice';
export enum ActionType { rolled, autoHit, utility }
export interface Action {
    // Determmines
    actionType: ActionType;
    actionStat?: AbilityScores;
    actionDice?: Dice;
    actionText: string;
}
