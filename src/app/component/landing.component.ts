import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';

import { CharClass, CharClassSummary } from '../model/class';
import { CharRace, CharRaceSummary } from '../model/race';
import { AbilityScores, AbilityScoreBonus } from '../model/abilityScore';
import { CR, CharCRSummary } from '../model/crs';
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
})
export class LandingComponent implements OnInit {
  // Form state
  // Fetched data will be stored here
  classList: CharClassSummary[] = Array<CharClassSummary>();
  raceList: CharRaceSummary[] = Array<CharRaceSummary>();
  CRList: CharCRSummary[] = Array<CharCRSummary>();

  // internal data
  raceSelection = 0;
  classSelection = 0;
  crSelection = 0;
  submitted = false;
  abilityRoll = new Dice(3, 6, 0, 0);
  showRace = false;
  showClass = false;
  showCR = false;

  // Character stats are temporarily stored here
  character: Character = new Character();
  charCR: CR;
  charClass: CharClass;
  charRace: CharRace = null;

  constructor(
    private classService: ClassService,
    private raceService: RaceService,
    private crService: CRService,
  ) { }

  async ngOnInit() {
    // TODO fetch class list
    // TODO fetch race list
    this.classList = await this.classService.getClasses();
    this.raceList = await this.raceService.getRaces();
    this.CRList = await this.crService.getCRs();
  }

  async fetchRace() {
    this.charRace = await this.raceService.getRace(this.raceSelection);
  }

  async fetchClass() {
    this.charClass = await this.classService.getClass(this.classSelection);
  }

  async fetchCR() {
    this.charCR = await this.crService.getCR(this.crSelection);
  }

  toggleRace() {
    // Only engage if an option is selected
    if (this.charRace) {
      this.showRace = !this.showRace;
    }
  }

  toggleClass() {
    if (this.charClass) {
      this.showClass = !this.showClass;
    }
  }

  toggleCR() {
    if (this.charCR) {
      this.showCR = !this.showCR;
    }
  }

  async onSubmit() {
    this.submitted = true;
    this.character.name = 'İSİM!';
    const charAbilities = new Array<number>();


    // console.log(this.charRace);

    // Produce 6 3d6 numbers
    for (let i = 0; i < 6; i++) {
      const stat = this.abilityRoll.rollDice(0);
      // console.log(stat);
      charAbilities.push(stat);
    }
    // Sort stat array by numeric magnitude
    charAbilities.sort(
      (a, b) => {
        if (a < b) { return 1; }
        if (a > b) { return -1; }
        return 0;
      }
    );
    // Racial bonuses can't be greater than 2 no need to check for 20 ability cap here.
    // CRden ability bonus alınacaksa en baştan 20ye tamamlayacak şekilde paylaştırılır.
    // do 2 dimensional scan to assign race bonuses to stats
    // console.log(charAbilities);
    for (const bonusKey in this.charRace.abilityScoreBonuses) {
      // this can't be abstracted away as for..in the index integer is useful.
      for (let prioKey = 0; prioKey < this.charClass.classStatPriorities.length; prioKey++) {
        // Stats are sorted from highest to lowest, priorities are also sorted from highest to lowest.
        // When a bonus stat enum value matches with priority list enum value we assume that the index value
        // will be same for the numeric value list.
        if (this.charRace.abilityScoreBonuses[bonusKey].abilityScore === this.charClass.classStatPriorities[prioKey]) {
          charAbilities[prioKey] += this.charRace.abilityScoreBonuses[bonusKey].abilityScoreBonus;
        }
      }
    }
    // console.log(charAbilities);
    let temp = this.charCR.abilityBonus;
    // Scan again for CR ability bonus
    for (let prioKey = 0; prioKey < this.charClass.classStatPriorities.length; prioKey++) {
      // if the stat is still less than 20 and abilityBonus is greater than 0
      // Abilitıes will almost always be less than 20, bonus will run out early on. Bonus should be checked first.
      while (temp > 0 && charAbilities[prioKey] < 20) {
        // Transfer value from level based bonus to most important stat, one by one, until eıther stat reaches 20 or ability bonus ends
        charAbilities[prioKey]++;
        temp--;
        console.log(charAbilities);
        // console.log(this.charCR.abilityBonus);
      }
    }
    // Scan again to match into character
    for (let prioKey = 0; prioKey < this.charClass.classStatPriorities.length; prioKey++) {
      switch (this.charClass.classStatPriorities[prioKey]) {
        case AbilityScores.str:
          this.character.strength = charAbilities[prioKey];
          break;
        case AbilityScores.dex:
          this.character.dexterity = charAbilities[prioKey];
          break;
        case AbilityScores.con:
          this.character.constitution = charAbilities[prioKey];
          break;
        case AbilityScores.int:
          this.character.intelligence = charAbilities[prioKey];
          break;
        case AbilityScores.wis:
          this.character.wisdom = charAbilities[prioKey];
          break;
        case AbilityScores.cha:
          this.character.charisma = charAbilities[prioKey];
          break;
      }
    }
    // Assign traits
    this.character.traits = this.charRace.traits;
    // Assign actions
    this.character.actions = new Array<any>();
    for (const key in this.charClass.classActions) {
      this.character.actions.push(this.charClass.classActions[key]);
    }
    // Assign racial action by 50% chance
    if (Math.random() > 0.5) {
      this.character.actions.push(this.charRace.action);
    }
    console.log(this.character);

  }
}
