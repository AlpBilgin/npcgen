import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';

import { CharClassEnum } from '../model/class';
import { RaceEnum, CharRace } from '../model/race';
import { EnumPipe } from '../pipe/enum.pipe';

import { stat } from '../model/stat';
// import { CR } from '../model/crs';

import { RaceService } from '../service/race.service';



@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [EnumPipe],
})
export class LandingComponent implements OnInit {

  cr = 0;
  charClass = 0;
  charRace = 0;

  classList = CharClassEnum;
  raceList = RaceEnum;

  submitted = false;

  name = '';

  abilityPriorities;
  racialBonuses;

  abilities: number[] = Array<number>();
  abilityModifiers: number[] = Array<number>();

  constructor(
    private raceService: RaceService
  ) {
  }

  ngOnInit() {
    // stat öncelikleri
    // soldaki daha öncelikli
    this.abilityPriorities = [
      [stat.str, stat.con, stat.wis, stat.dex, stat.cha, stat.int], // 0 numarali sinif
      [stat.dex, stat.int, stat.cha, stat.wis, stat.str, stat.con], // 1 nuamrali sinif
      [stat.int, stat.cha, stat.dex, stat.con, stat.str, stat.wis]  // 2 numarali sinif
    ];

    console.log(this.raceService.getRaces());

  }

  onSubmit() {
    this.submitted = true;
    this.name = 'İSİM';

    const racialBonus = this.racialBonuses[this.charRace];
    const abilityPriority = this.abilityPriorities[this.charClass];


    for (let i = 0; i < 5; i++) {
      const stat = Math.floor((Math.random() * 15) + 3);
      this.abilities.push(stat);
    }
    this.abilities.sort(
      (a, b) => {
        if (a < b) { return 1; }
        if (a > b) { return -1; }
        return 0;
      }
    );
    // ırksalda +2den fazla gelmiyor onu kontrol etmeye gerek yok.
    for (let i = 0; i < 5; i++) {
      // Öncelik tablosu içinden hangi statın önem sırasının geldiğini tespit et. O sayıyı kullanarak ırk bonusu tablosundan bonusu bul.
      // Bonusu zar sonucuna ekle
      this.abilities[i] = this.abilities[i] + racialBonus[this.abilityPriorities[i]];
    }
    // CRden ability bonus alınacaksa en baştan 20ye tamamlayacak şekilde paylaştırılır.

    console.log(this.abilities);
  }
}
