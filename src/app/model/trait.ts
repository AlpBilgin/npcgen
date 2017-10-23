export class Trait {
    traitName: string;
    traitContent: string;
    constructor(dbModel: any) {
        this.traitName = dbModel.NAME;
        this.traitContent = dbModel.CONTENT;
    }
}
