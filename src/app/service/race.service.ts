import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CharRace, CharRaceSummary } from '../model/race';
import { environment } from '../env';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RaceService {
    baseURL = environment.baseURL + '/RACES';

    // Bütün ırk tanımlarını saklayacak vektörü tanımla
    race: CharRace;
    races: CharRaceSummary[] = Array<CharRaceSummary>();
    raceCache: CharRace[] = Array<CharRace>();

    constructor(
        private http: Http,
    ) { }

    // HTTP call returns names and primary keys.
    // Response JSON is not an array because first row deletion will cause non-continuous primary keys.
    // Here anon objects are unpacked from response JSON object and pushed into a returned array.
    // For trivial case returned array index and race id will be duplicate, but do not be fooled!
    public getRaces(): Promise<CharRaceSummary[]> {
        // get only name and id columns
        return this.http.get(this.baseURL).toPromise().then(
            (resp: Response) => {
                // console.log(resp.json());
                for (const key in resp.json()) {
                    // Iterate list and collect names from object and push into array
                    this.races.push(resp.json()[key]);
                }
                // console.log(this.races);
                return this.races;
            }
        );
    }

    // Function caches each fetched race
    public getRace(id: number): Promise<CharRace> {
        // Search for race id in cache array, return if found
        if (this.raceCache[id]) {
            return new Promise(
                (resolve, reject) => { resolve(this.raceCache[id]); }
            );
        }
        // If race can't be found in cache; download, cache and return
        return this.http.get(this.baseURL + '?' + id).toPromise().then(
            (resp: Response) => {
                // console.log(resp.json());
                const raceDB = resp.json();
                const newRace = new CharRace(raceDB);
                this.raceCache[id] = newRace;
                return newRace;
            }
        );
    }
}
