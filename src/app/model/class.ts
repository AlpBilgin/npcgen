import { AbilityScores } from './abilityScore';
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
    constructor() {

    }
}
