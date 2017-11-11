import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CR, CharCRSummary } from '../model/crs';
import { environment } from '../env';

@Injectable()
export class CRService {

    // baseURL = 'http://smubcizgiroman.com/api.php/CHALLENGE_RATINGS';
    baseURL = environment.baseURL + '/CHALLENGE_RATINGS';
    // Bütün sınıf tanımlarını saklayacak vektörü tanımla
    CR: CR;
    CRs: CharCRSummary[] = Array<CharCRSummary>();
    CRCache: CR[] = Array<CR>();

    constructor(
        private http: Http
    ) { }

    public getCRs(): Promise<CharCRSummary[]> {
        // get only name and id columns
        return this.http.get(this.baseURL).toPromise().then(
            (resp: Response) => {
                // console.log(resp.json());
                for (const key in resp.json()) {
                    // Iterate list and collect names from object and push into array
                    this.CRs.push(resp.json()[key]);
                }
                // console.log(this.CRs);
                return this.CRs;
            }
        );

    }

    public getCR(id: number): Promise<CR> {
        // Search for race id in cache array, return if found
        if (this.CRCache[id]) {
            return new Promise(
                (resolve, reject) => { resolve(this.CRCache[id]); }
            );
        }

        // If race can't be found in cache; download, cache and return
        return this.http.get(this.baseURL + '?' + id).toPromise().then(
            (resp: Response) => {
                // console.log(resp.json());
                const raceDB = resp.json();
                const newCR = new CR(raceDB);
                this.CRCache[id] = newCR;
                return newCR;
            }
        );
    }
}
