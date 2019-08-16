import { Directive, HostListener, ContentChildren, QueryList } from '@angular/core';
import { ChoresComponent } from '../chores/chores.component';

@Directive({
  selector: '[appTile]',

})
export class TileDirective {

  @HostListener('loadingComplete') loadingComplete() {
    console.log("loading complete")
  }
  // @ContentChildren('*') children: QueryList<Element>;


  constructor() {
    // setInterval(() => {
      // console.log(this.children)

    // }, 10000);
  }



}
