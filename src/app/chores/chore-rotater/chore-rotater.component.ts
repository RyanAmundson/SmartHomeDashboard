import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shd-chore-rotater',
  templateUrl: './chore-rotater.component.html',
  styleUrls: ['./chore-rotater.component.scss']
})
export class ChoreRotaterComponent implements OnInit {

  @ViewChild('slider', { static: false }) slider;
  @ViewChild('boundary', { static: false }) boundary;
  @Output() swiped: EventEmitter<void> = new EventEmitter();
  dragPosition = { x: 0, y: 0 };
  icon = "refresh";
  text = "Slide to Rotate Chores";

  constructor() {

  }

  ngOnInit() {
  }


  resetPosition() {
    this.dragPosition = { x: 0, y: 0 };
  }

  release(event) {
    // console.log(this.slider);

    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    let boundaryWidth = this.boundary.nativeElement.clientWidth;

    let xPosition = (boundingClientRect.x - parentPosition.left);
    let yPosition = (boundingClientRect.y - parentPosition.top);
    console.log(xPosition, boundaryWidth)
    if (xPosition > (boundaryWidth / 3) * 2) {
      this.resetPosition();
      this.swiped.emit();
      this.icon = "check";
      this.text = "Rotated!";
    } else {
      this.text = "Slide to Rotate Chores";
      this.icon = "refresh";
      this.resetPosition();
    }
  }

  moved($event) {
    this.text = "";
  }

  getPosition(el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }
}
