import { Component, OnInit, HostListener } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { UtilitiesService } from "../utilities/_services/utilities.service";
import { UtilityService } from "../_services/utility.service";

@Component({
  selector: "shd-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"]
})
export class NotesComponent {
  updating = false;
  notes = [];
  newNote = {
    key: null,
    value: "",
    date: null
  };
  showDelete: number;

  constructor(
    private firebase: AngularFireDatabase,
    public utility: UtilityService
  ) {
    firebase
      .list("notes")
      .snapshotChanges()
      .subscribe(res => {
        this.notes = this.utility.fbObjSquash(res);
      });
  }

  deleteNote(note) {
    console.log(note);
    this.firebase
      .object(`notes/${note.key}`)
      .remove()
      .then(() => {
        // this.showDelete = null;
      });
  }

  update() {
    this.notes.forEach((note) => {
      this.firebase.list("notes").set(note.key,note);
    });
    if (this.newNote.value != "") {
      this.newNote.date = Date.now();
      this.firebase.list("notes").push(this.newNote);
      this.newNote.value = "";
      this.newNote.date = null;
      this.newNote.key = null;
    }
  }
}
