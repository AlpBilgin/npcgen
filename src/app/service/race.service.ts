import { Injectable } from '@angular/core';
import { StatBonus } from '../model/stat';
import { CharRace } from '../model/race';

@Injectable()
export class RaceService {

    // Bütün ırk tanımlarını saklayacak vektörü tanımla
    races: CharRace[];

    constructor() {
        // bir Irk için stat bonuslarını tutacak vektörü tanımla
        const bonuses = Array<StatBonus>();
        // bir (veya iki) stat bonusu tanımla
        const bonus: StatBonus = { statName: 'con', statBonus: 2 };
        // bonusu vektöre kaydet
        bonuses.push(bonus);

        // aynı ırk için traitleri tutacak vektörü tanımla
        const traits = Array<string>();
        // traitleri vektöre kaydet
        traits.push('trait 1');
        traits.push('trait 2');

        // Vektörleri kullanarak ırk tanımla
        const ırk: CharRace = { bonusStat: bonuses, trait: traits };
        // Irkı vektöre itele
        this.races.push(ırk);
    }

    public getRaces(): CharRace[] {
        return this.races;
    }
}
