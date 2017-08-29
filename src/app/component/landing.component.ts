import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';

import { Class } from '../model/class';
import { Race } from '../model/race';
import { EnumPipe } from '../pipe/enum.pipe';

import { stat } from '../model/stat';
// import { CR } from '../model/crs';



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

  classList = Class;
  raceList = Race;

  submitted = false;

  name = '';

  abilityPriorities;
  racialBonuses;

  abilities: number[] = Array<number>();
  abilityModifiers: number[] = Array<number>();

  constructor(
  ) {
  }

  ngOnInit() {
    // stat öncelikleri
    // sınıfın kendi numarası üst liste numarası
    // stat öncelik sırası alt liste numarası
    // stat numaraları elementler.
    this.abilityPriorities = [
      [0, 2, 4, 1, 5, 3],
      [1, 3, 5, 4, 0, 2],
      [3, 5, 1, 2, 0, 4]
    ];

    // Bu listeler str->cha sıralamasına göre
    this.racialBonuses = [
      [0, 0, 2, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0]
    ];
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
