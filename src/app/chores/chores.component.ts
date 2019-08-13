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
      console.log(res.val())
      this.chores.breakdown = res.val().breakdown.map((entry, i) => {
        var dayOfMonth = new Date().getDate();
        var choreCount = res.val().order.length;
        console.log(entry)
        let choreIndex = (((dayOfMonth % 7) % 4) + i) % 4;
        // let nextChoreIndex = (((dayOfMonth % 7) % 4) + i + 1) % 4;
        console.log("choreindex:"  + choreIndex)
        entry.this_week = res.val().order[choreIndex].icon || null;
        // entry.next_week = res.val().order[nextChoreIndex].icon || null;
        entry.thisWeekText = res.val().order[choreIndex].text;



        return entry;
      })
    });

  }

  ngOnInit() {
  }

}
