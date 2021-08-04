import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['userId', 'username', 'role'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => this.dataSource.data = users);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
