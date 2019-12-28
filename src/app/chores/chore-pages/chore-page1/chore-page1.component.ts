import { Component, OnInit } from '@angular/core';
import { ChoreService } from '../../_services/chore.service';

@Component({
  selector: 'shd-chore-page1',
  templateUrl: './chore-page1.component.html',
  styleUrls: ['./chore-page1.component.scss']
})
export class ChorePage1Component implements OnInit {

  constructor(public choreService: ChoreService) { }

  ngOnInit() {
  }

}
