import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { InfoCntComponent } from '../info-cnt/info-cnt.component'
import { InfoCntComponent1 } from '../info-cnt-1/info-cnt.component'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  descPaper: string;
  selectPaper: string = '4';

  peopleCnt: string = "3";

  rulonCnt: number = 1;
  days: number = 30;
  res: string;
  metr: number;
  daysRulon: number;
  days_rulon_flg: string = "1";

  longPapers: number = 65;
  picePapers: number = 150;
  paper_long_pice: string = "1";
  visitCnt: string = "3";

  constructor(public popoverController: PopoverController) {
    this.run();
  }

  async presentPopover(ev: any) {
    console.log(">>>>Popover");
    const popover = await this.popoverController.create({
      component: InfoCntComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  async presentPopover1(ev: any) {
    console.log(">>>>Popover");
    const popover = await this.popoverController.create({
      component: InfoCntComponent1,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  paperOnchange(event) {
    this.res = ''; 
    this.run();
  }

  run() {
    const cLongOneVisit: number = 1.25; 

    let rulonDay = 0;
    let longOneVisit = 0;

    let rulonCnt = 0;
    let days = 0;

    if (this.paper_long_pice == "1") {//Метры
      //Общееколичество посещений
      rulonDay = parseInt(this.peopleCnt)  * parseInt(this.visitCnt);
      //Находим длинну на один раз
      switch (this.selectPaper) {
          case "1" :
            longOneVisit = cLongOneVisit * 0.25;
            break;
          case "2" :
            longOneVisit = cLongOneVisit * 0.5;
            break;
          case "3" :
            longOneVisit = cLongOneVisit * 0.75;
            break;
          case "4" :
            longOneVisit = cLongOneVisit;
            break;
          default:
            break;
      }
      rulonDay = rulonDay * longOneVisit;
      //рулонов на один день
      rulonDay = rulonDay / this.longPapers;
    } else {//Листы
      //Общееколичество посещений
      rulonDay = parseInt(this.peopleCnt)  * parseInt(this.visitCnt);
      //Находим длинну на один раз
      rulonDay = rulonDay * parseInt(this.selectPaper);
      rulonDay = rulonDay / this.picePapers;
    }
    //Нужна бумага на N дней
    if (this.days_rulon_flg == "1") {
      //Сколько нужно рулонов на Н дней
      rulonCnt = Math.ceil(this.days * rulonDay);
      this.res = 'Вам необходимо '+rulonCnt+' рул.';
    } else {
      days = Math.trunc(this.rulonCnt / rulonDay);
      this.res = 'Вам хватит бумаги на '+days+' дн.';
    }
  }

  run_old() {
    switch (this.selectPaper) {
      case "1" :
        this.metr = 65;
        break;
      case "2" :
        this.metr = 23;//184 листа
        break;
      case "3" :
        this.metr = 20;
      break;
    }
    //На сколько хватает одного рулона
    this.daysRulon = this.metr / parseInt(this.peopleCnt);
    if (this.days_rulon_flg == "1") {
      //Сколько нужно рулонов на Н дней
      this.rulonCnt = Math.ceil(this.days / this.daysRulon);
      this.res = 'Вам необходимо '+this.rulonCnt+' рулонов.';
    } else {
      this.days = Math.round(this.rulonCnt / this.daysRulon);
      this.res = 'Вам хватит бумаги на '+this.days+' дней.';
    }
  }
}
