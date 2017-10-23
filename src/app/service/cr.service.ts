import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CR } from '../model/crs';

@Injectable()
export class CRService {

    baseURL = 'http://smubcizgiroman.com/api.php/CHALLENGE_RATINGS';

    // Bütün sınıf tanımlarını saklayacak vektörü tanımla
    CRs: CR[] = Array<CR>();

    constructor(
        private http: Http
    ) {
        // Elle sınıf tanımla
        this.CRs.push({ cr: 1, profBonus: 2, armorclassBonus: 0, abilityBonus: 0, damage: '1d6', hitdiceCount: 2 } as CR);
        this.CRs.push({ cr: 2, profBonus: 2, armorclassBonus: 0, abilityBonus: 5, damage: '1d6', hitdiceCount: 3 } as CR);
    }

    public getCR(): any {
        let res;
        this.http.get(this.baseURL).subscribe(
            next => console.log(next),
            err => console.log(err),
            () => console.log('bitti')
        );
        res = 0;
        return res;
    }
}
