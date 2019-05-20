import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
  styleUrls: ['./chores.component.scss']
})
export class ChoresComponent implements OnInit {
  displayedColumns: string[] = ['Who', 'This Week', 'Next Week'];

  chores = {
    total: 0,
    breakdown: [
      { who: "", this_week: "", next_week: "" }
    ]
  };

  constructor(private firebase: AngularFireDatabase) {
    firebase.database.ref('chores').on('value', res => {
      this.chores.breakdown = res.val().breakdown.map((entry, i) => {
        var dayOfMonth = new Date().getDate();
        var choreCount = res.val().order.length;
        console.log(entry)
        entry.this_week = res.val().order[(dayOfMonth + i) % choreCount];
        entry.next_week = res.val().order[(dayOfMonth + i + 1) % choreCount];
        return entry;
      })
    });

  }

  ngOnInit() {
  }

}
