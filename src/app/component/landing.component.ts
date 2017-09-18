import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';

import { CharClass, } from '../model/class';
import { CharRace } from '../model/race';
import { EnumPipe } from '../pipe/enum.pipe';
import { AbilityScores, AbilityScoreBonus } from '../model/abilityScore';
import { CR } from '../model/crs';



@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [EnumPipe],
})
export class LandingComponent implements OnInit {

  cr = 0;
  charClass: CharClass;
  charRace: CharRace;

  classList: CharClass[];
  raceList: CharRace[];

  submitted = false;

  charName = '';

  abilities: number[] = Array<number>();

  constructor(
  ) {
  }

  ngOnInit() {
    // TODO fetch class list
    // TODO fetch race list
  }

  onSubmit() {
    this.submitted = true;
    this.charName = 'İSİM';

    // Produce 6 3d6 numbers
    for (let i = 0; i < 5; i++) {
      const stat = Math.floor((Math.random() * 15) + 3);
      this.abilities.push(stat);
    }
    // Sort stat array by numeric magnitude
    this.abilities.sort(
      (a, b) => {
        if (a < b) { return 1; }
        if (a > b) { return -1; }
        return 0;
      }
    );
    // Racial bonuses can't be greater than 2 no need to check for 20 ability cap here.
    // CRden ability bonus alınacaksa en baştan 20ye tamamlayacak şekilde paylaştırılır.

    console.log(this.abilities);
  }
}
