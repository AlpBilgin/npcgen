export enum AbilityScores { str = 0, dex = 1, con = 2, int = 3, wis = 4, cha = 5 }
export class AbilityScoreBonus {
    abilityScore: AbilityScores;
    abilityScoreBonus: number;
    constructor(dbModel: any) {
        // Second bonus may be null TODO handle better.
        if (dbModel.ABILITY === null) {
            this.abilityScore = AbilityScores.cha;
            this.abilityScoreBonus = 0;
            return;
        }
        switch (dbModel.ABILITY) {
            case 'str': this.abilityScore = AbilityScores.str; break;
            case 'dex': this.abilityScore = AbilityScores.dex; break;
            case 'con': this.abilityScore = AbilityScores.con; break;
            case 'int': this.abilityScore = AbilityScores.int; break;
            case 'wis': this.abilityScore = AbilityScores.wis; break;
            case 'cha': this.abilityScore = AbilityScores.cha; break;
        }
        this.abilityScoreBonus = dbModel.BONUS;
    }
}
