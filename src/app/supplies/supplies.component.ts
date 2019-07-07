import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss']
})
export class SuppliesComponent implements OnInit {
  displayedColumns: string[] = ['Item', 'Cost', 'Bought By'];

  supplies = [];

  constructor(private firebase: AngularFireDatabase) {
    firebase.database.ref('supplies').on('value', res => {
      this.supplies = res.val().splice(0,5);
    });

  }

  ngOnInit() {
  }

}
