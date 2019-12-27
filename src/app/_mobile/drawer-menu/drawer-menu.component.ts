import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_authentication/auth.service';

@Component({
  selector: 'shd-drawer-menu',
  templateUrl: './drawer-menu.component.html',
  styleUrls: ['./drawer-menu.component.scss']
})
export class DrawerMenuComponent implements OnInit {

  constructor(public authService: AuthService, ) { }

  ngOnInit() {
  }

}
