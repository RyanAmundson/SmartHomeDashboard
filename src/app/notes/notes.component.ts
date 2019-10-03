import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  updating = false;
  notes = [];
  newNote = {
    value: '',
    date: null
  };

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
    firebase.database.ref('notes').on('value', (res) => {
      this.notes = Object.values(res.val());
      console.log(this.notes);
    });
  }


  add() {
    if (this.newNote.value !== '') {
      this.newNote.date = Date.now;
      this.notes.push(this.newNote);
      this.newNote.value = '';
    }
  }

  update() {
    if (this.newNote.value !== '') {
      this.newNote.date = Date.now();
      this.notes.push(this.newNote);
    }
    this.firebase.object('notes').set(this.notes);
    this.newNote.value = '';
  }
}
