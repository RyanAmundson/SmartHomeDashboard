import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'updater',
  templateUrl: './updater.component.html',
  styleUrls: ['./updater.component.scss']
})

export class UpdaterComponent implements OnInit {

  chores;
  notes;
  rent;
  supplies;
  utilities;
  wifi;

  newSupplyItem = {
    item: "",
    cost: "",
    bought_by:""
  };

  newNote = "";

  constructor(private firebase:AngularFireDatabase, private change:ChangeDetectorRef) {

    // firebase.database.ref('utilities').on('value', (res) => {
    //   this.utilities = res.val();
    //   console.log(this.utilities)
    //   console.log(this.utilities.breakdown[1].amount_due);
    //   change.detectChanges();
    // });
    this.init();
  }

   async init() {
    this.firebase.object('chores').valueChanges().subscribe(res => this.chores = res);
    this.firebase.list('notes').valueChanges().subscribe(res => this.notes = res);
    this.firebase.object('rent').valueChanges().subscribe(res => this.rent = res);
    this.firebase.list('supplies').valueChanges().subscribe(res => this.supplies = res);
    this.firebase.object('utilities').valueChanges().subscribe(res => this.utilities = res);

    console.log(this.utilities)
   }

  ngOnInit() {
  }

  update(){
    this.firebase.database.ref('supplies').set(this.supplies);
    if(this.newSupplyItem.item != "") this.firebase.list('supplies').push(this.newSupplyItem);
    this.firebase.object('utilities').update(this.utilities);
    this.newSupplyItem =  {
      item: "",
      cost: "",
      bought_by:""
    };

    if(this.newNote != "") this.firebase.list("notes").push(this.newNote);
    this.newNote = "";

  }

  parseFloat(val) {
    if(val) {
      return Number.parseFloat(val);
    }
  }

}
