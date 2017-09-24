import { Injectable } from '@angular/core';
import { CR } from '../model/crs';

@Injectable()
export class CRService {

    // Bütün sınıf tanımlarını saklayacak vektörü tanımla
    CRs: CR[] = Array<CR>();

    constructor() {
        // Elle sınıf tanımla
        this.CRs.push({ cr: 1, profBonus: 2, armorclassBonus: 0, abilityBonus: 0, damage: '1d6', hitdiceCount: 2 } as CR);
        this.CRs.push({ cr: 2, profBonus: 2, armorclassBonus: 0, abilityBonus: 5, damage: '1d6', hitdiceCount: 3 } as CR);
    }

    public getCR(): CR[] {
        return this.CRs;
    }
}
