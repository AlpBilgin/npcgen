export class CharCRSummary {
    ID: number;
    NAME: string;
    constructor(dbModel: any) {
        this.ID = dbModel.ID;
        this.NAME = dbModel.NAME;
    }
}

export class CR {
    cr: number;
    profBonus: number;
    armorclassBonus: number;
    abilityBonus: number;
    damage: string;
    hitdiceCount: number;
    constructor(dbModel: any) {
        this.cr = dbModel.NAME;
        this.profBonus = dbModel.PROF_BONUS;
        this.armorclassBonus = dbModel.AC_BONUS;
        this.abilityBonus = dbModel.ABILITY_BONUS;
        // TODO fix this when backend is finalised
        this.damage = dbModel.DDIE;
        this.hitdiceCount = dbModel.DCOUNT;
    }
}
