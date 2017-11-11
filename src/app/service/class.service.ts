import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AbilityScoreBonus, AbilityScores } from '../model/abilityScore';
import { CharClass, CharClassSummary } from '../model/class';
import { ActionType, Action } from '../model/action';
import { Dice } from '../model/dice';
import { Observable } from 'rxjs/Observable';
import { environment } from '../env';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClassService {
    baseURL = environment.baseURL + '/CLASSES';

    // Bütün ırk tanımlarını saklayacak vektörü tanımla
    class: CharClass;
    classes: CharClassSummary[] = Array<CharClassSummary>();
    classCache: CharClass[] = Array<CharClass>();

    constructor(
        private http: Http
    ) { }

    // HTTP call returns names and primary keys.
    // Response JSON is not an array because first row deletion will cause non-continuous primary keys.
    // Here anon objects are unpacked from response JSON object and pushed into a returned array.
    // For trivial case returned array index and race id will be duplicate, but do not be fooled!
    public getClasses(): Promise<CharClassSummary[]> {
        // get only name and id columns
        return this.http.get(this.baseURL).toPromise().then(
            (resp: Response) => {
                // console.log(resp);
                for (const key in resp.json()) {
                    // Iterate list and collect names from object and push into array
                    this.classes.push(resp.json()[key]);
                }
                // console.log(this.classes);
                return this.classes;
            }
        );
    }

    // Function caches each fetched race
    public getClass(id: number): Promise<CharClass> {
        // Search for race id in cache array, return if found
        if (this.classCache[id]) {
            return new Promise(
                (resolve, reject) => { resolve(this.classCache[id]); }
            );
        }
        // If race can't be found in cache; download, cache and return
        return this.http.get(this.baseURL + '?' + id).toPromise().then(
            (resp: Response) => {
                // console.log(resp.json());
                const raceDB = resp.json();
                const newRace = new CharClass(raceDB);
                this.classCache[id] = newRace;
                // console.log(newRace)
                return newRace;
            }
        );
    }
}
