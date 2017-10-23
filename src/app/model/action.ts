import { AbilityScores } from './abilityScore';
import { Dice } from './dice';
export enum ActionType { rolled, autoHit, utility }
export class Action {
    // Determmines
    actionType: ActionType;
    actionStat?: AbilityScores;
    actionDice?: Dice;
    actionName: string;
    actionContent: string;
    constructor(dbModel: any) {
        this.actionName = dbModel.NAME;
        this.actionContent = dbModel.CONTENT;
        // TODO this should be dynamic
        this.actionType = ActionType.rolled;
    }
}
