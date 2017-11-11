export enum AbilityScores { str = 0, dex = 1, con = 2, int = 3, wis = 4, cha = 5 }
export class AbilityScoreBonus {
    abilityScore: AbilityScores;
    abilityScoreBonus: number;

    static mapString2Enum(input: string): AbilityScores {
        switch (input) {
            case 'str': return AbilityScores.str;
            case 'dex': return AbilityScores.dex;
            case 'con': return AbilityScores.con;
            case 'int': return AbilityScores.int;
            case 'wis': return AbilityScores.wis;
            case 'cha': return AbilityScores.cha;
            case '1': return AbilityScores.str;
            case '2': return AbilityScores.dex;
            case '3': return AbilityScores.con;
            case '4': return AbilityScores.int;
            case '5': return AbilityScores.wis;
            case '6': return AbilityScores.cha;
            default: return null;
        }
    }

    constructor(dbModel: any) {
        // Second bonus may be null TODO handle better.
        if (dbModel.ABILITY === null) {
            this.abilityScore = AbilityScores.cha;
            this.abilityScoreBonus = 0;
            return;
        }
        this.abilityScore = AbilityScoreBonus.mapString2Enum(dbModel.ABILITY);
        this.abilityScoreBonus = dbModel.BONUS;
    }
}
