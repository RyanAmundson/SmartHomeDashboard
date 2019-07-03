import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'updater',
  templateUrl: './updater.component.html',
  styleUrls: ['./updater.component.scss']
})

export class UpdaterComponent implements OnInit {
  objectEntries = Object.entries;
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

  data = {
    chores: {
      breakdown: [
        {who:""},
        {who:""},
        {who:""},
        {who:""},
      ],
      order: [
        "",
        "",
        "",
        "",
      ]
    },
    notes:[],
    rent: {
      breakdown: {

      },
      due: "",
      total:""
    },
    supplies: [
      {bought_by:"", cost:"", item:""}
    ],
    utilities:{
      breakdown:{},

      total:"",
    }
  }


  entries = [];
  keys = [];
  constructor(private firebase:AngularFireDatabase, private change:ChangeDetectorRef) {
    this.init();
    // this.generate('utilities/breakdown','list',['utility'])
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
    console.log(this.utilities);
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
      return Number.parseFloat(val.replace(/[$,]/g, ""));
    } else {
      return 0;
    }
  }


  generate(fbPath, listOrObj,[...ids]) {
    this.firebase.database.ref(fbPath).once('value').then((res) => {
      let data = res.val();
      console.log(res,res.val(),typeof(res.val()), typeof(res.val()[0]));
      this.entries = res.val();
      this.keys = ids;
    });
  }

}
