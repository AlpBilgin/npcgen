import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';

import { CharClass, } from '../model/class';
import { CharRace } from '../model/race';
import { EnumPipe } from '../pipe/enum.pipe';
import { AbilityScores, AbilityScoreBonus } from '../model/abilityScore';
import { CR } from '../model/crs';
import { Action } from '../model/action';
import { Character } from '../model/character';
import { Dice } from '../model/dice';
import { RaceService } from '../service/race.service';
import { ClassService } from '../service/class.service';
import { CRService } from '../service/cr.service';



@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [EnumPipe],
})
export class LandingComponent implements OnInit {
  // Form state
  // Fetched data will be stored here
  classList: CharClass[] = Array<CharClass>();
  raceList: CharRace[] = Array<CharRace>();
  CRList: CR[] = Array<CR>();
  // internal data
  submitted = false;
  abilityRoll = new Dice(3, 6, 0, 0);

  // Character stats are temporarily stored here
  character: Character = new Character();

  cr: CR;
  charClass: CharClass;
  charRace: CharRace;
  CharAbilities: number[] = Array<number>();
  charActions: Action[] = Array<Action>();
  charTraits: string[] = Array<string>();

  constructor(
    private classService: ClassService,
    private raceService: RaceService,
    private crService: CRService,
  ) { }

  ngOnInit() {
    // TODO fetch class list
    // TODO fetch race list
    this.classList = this.classService.getClasses();
    this.raceList = this.raceService.getRaces();
    this.CRList = this.crService.getCR();
  }

  onSubmit() {
    this.CharAbilities = Array<number>();

    this.submitted = true;
    this.character.name = 'İSİM!';

    // Produce 6 3d6 numbers
    for (let i = 0; i < 6; i++) {
      const stat = this.abilityRoll.rollDice(0);
      console.log(stat);
      this.CharAbilities.push(stat);
    }
    // Sort stat array by numeric magnitude
    this.CharAbilities.sort(
      (a, b) => {
        if (a < b) { return 1; }
        if (a > b) { return -1; }
        return 0;
      }
    );
    // Racial bonuses can't be greater than 2 no need to check for 20 ability cap here.
    // CRden ability bonus alınacaksa en baştan 20ye tamamlayacak şekilde paylaştırılır.

    // do 2 dimensional scan to assign race bonuses to stats
    console.log(this.CharAbilities);
    for (const bonusKey in this.charRace.abilityScoreBonuses) {
      // this can't be abstracted away as for..in the index integer is useful.
      for (let prioKey = 0; prioKey < this.charClass.classStatPriorities.length; prioKey++) {
        // Stats are sorted from highest to lowest, priorities are also sorted from highest to lowest.
        // When a bonus stat enum value matches with priority list enum value we assume that the index value
        // will be same for the numeric value list.
        if (this.charRace.abilityScoreBonuses[bonusKey].abilityScore === this.charClass.classStatPriorities[prioKey]) {
          this.CharAbilities[prioKey] += this.charRace.abilityScoreBonuses[bonusKey].abilityScoreBonus;
        }
      }
    }
    console.log(this.CharAbilities);
    let temp = this.cr.abilityBonus;
    // Scan again for CR ability bonus
    for (let prioKey = 0; prioKey < this.charClass.classStatPriorities.length; prioKey++) {
      // if the stat is still less than 20 and abilityBonus is greater than 0
      // Abilitıes will almost always be less than 20, bonus will run out early on. Bonus should be checked first.
      while (temp > 0 && this.CharAbilities[prioKey] < 20) {
        // Transfer value from level based bonus to most important stat, one by one, until eıther stat reaches 20 or ability bonus ends
        this.CharAbilities[prioKey]++;
        temp--;
        console.log(this.CharAbilities);
        console.log(this.cr.abilityBonus);
      }
    }

    // Scan again to match into character
    for (let prioKey = 0; prioKey < this.charClass.classStatPriorities.length; prioKey++) {
      switch (this.charClass.classStatPriorities[prioKey]) {
        case AbilityScores.str:
          this.character.strength = this.CharAbilities[prioKey];
          break;
        case AbilityScores.dex:
          this.character.dexterity = this.CharAbilities[prioKey];
          break;
        case AbilityScores.con:
          this.character.constitution = this.CharAbilities[prioKey];
          break;
        case AbilityScores.int:
          this.character.intelligence = this.CharAbilities[prioKey];
          break;
        case AbilityScores.wis:
          this.character.wisdom = this.CharAbilities[prioKey];
          break;
        case AbilityScores.cha:
          this.character.charisma = this.CharAbilities[prioKey];
          break;
      }
    }
    // Assign traits
    this.charTraits = this.charRace.traits;
    // Assign actions
    for (const key in this.charClass.classActions) {
      this.charActions.push(this.charClass.classActions[key]);
    }
    // Assign racial action by 50% chance
    if (Math.random() > 0.5) {
      this.charActions.push(this.charRace.action);
    }
    console.log(this.charActions);
    console.log(this.charTraits);
    console.log(this.character);

  }
}
