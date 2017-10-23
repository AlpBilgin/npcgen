import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Trait } from '../model/trait';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TraitService {
    baseURL = 'http://smubcizgiroman.com/api.php/TRAITS';

    constructor(
        private http: Http
    ) { }

    public getTrait(traitID: number): Promise<Trait> {
        // get only name column
        return this.http.get(this.baseURL + '?filter=ID,eq,' + traitID).toPromise().then(
            (next: Response) => {
                console.log(next);
                return new Trait(next.json().TRAITS.records[0]);
            },
            (err) => {
                console.log(err);
                return err;
            }
        );
    }
}
