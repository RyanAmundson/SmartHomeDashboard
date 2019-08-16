import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGenerator {

  @Input() firebasePath;
  @Input() listOrObj: 0 | 1;

  entries = [];
  keys = [];

  shape = {};

  constructor(private firebase: AngularFireDatabase) {

  }

  ngAfterViewInit() {
    this.fetch(this.firebasePath);
  }

  fetch(fbPath: string) {
    this.firebase.database.ref(fbPath).on('value', (res) => {
      console.log("fetched")
      let data = res.val();
      console.log(res.val());
      this.entries = res.val();
      if (this.entries) {
        this.shape = JSON.parse(JSON.stringify(Object.entries(this.entries)[0][1]));

        Object.keys(this.shape).forEach((key) => {
          this.shape[key] = 0;
        });
      }
    });
  }

  addSection(header) {
    if (this.shape) {
      if (!header) {
        this.firebase.database.ref(this.firebasePath).push(JSON.parse(JSON.stringify(this.shape)), (res) => {
          console.log(res);
        });
      }
    } else {

      this.firebase.database.ref(this.firebasePath + '/' + header).update(JSON.parse(JSON.stringify(this.shape)), (res) => {
        console.log(res);
      });
    }
  }

  removeSection(header) {
    this.firebase.database.ref(this.firebasePath + '/' + header).set(null, (res) => {
      console.log(res);
    });
  }

  update() {
    console.log(this.firebasePath, this.entries)
    Object.entries(this.entries).forEach((entry) => {
      console.log(entry);
      this.firebase.database.ref(this.firebasePath + '/' + entry[0]).set(JSON.parse(JSON.stringify(entry[1])), (res) => {
        console.log(res);
      });
    });
  }

  parseFloat(val) {
    if (val) {
      return Number.parseFloat(val.replace(/[$,]/g, ''));
    } else {
      return 0;
    }
  }






}
