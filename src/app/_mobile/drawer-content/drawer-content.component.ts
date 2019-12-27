import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_authentication/auth.service';

@Component({
  selector: 'shd-drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.scss']
})
export class DrawerContentComponent implements OnInit {

  constructor(public authService: AuthService, ) { }

  ngOnInit() {
  }

}
