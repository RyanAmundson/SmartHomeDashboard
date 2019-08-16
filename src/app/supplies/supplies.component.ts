import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.scss']
})
export class SuppliesComponent implements OnInit {
  displayedColumns: string[] = ['Item', 'Cost', 'Bought By'];
  updating = false;
  supplies = [];


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 800) {
      this.updating = true;
    } else {
      this.updating = false;
    }
  }

  constructor(private firebase: AngularFireDatabase) {
    if (window.innerWidth < 800) {
      this.updating = true;
    } else {
      this.updating = false;
    }
    firebase.list('supplies').valueChanges().subscribe((res) => {
      this.supplies = res.splice(0, 5);
    });

  }

  ngOnInit() {
  }

}
