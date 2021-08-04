import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../pages/auth/services/auth.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _authService: AuthService, private _utilsService: UtilsService) { }

  ngOnInit(): void {
  }

  onExit() {
    this._authService.logout();
    this._utilsService.openSideNav(false);
  }

}
