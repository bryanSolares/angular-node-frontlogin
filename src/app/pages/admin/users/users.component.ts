import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { UsersService } from '../services/users.service';
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from '../components/modal/modal.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['userId', 'username', 'role', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  private _destroy$ = new Subject<any>();

  constructor(private userService: UsersService, private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => this.dataSource.data = users);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onOpenModal(title: string, user?): void {
    const dialogRef = this.matDialog.open(ModalComponent, { height: '400px', width: '600px', hasBackdrop: false, data: { title, user } });
  }

  onDelete(userId: number) {
    if (window.confirm('Do you really remove this user?')) {
      this.userService.deleteUser(userId).pipe(takeUntil(this._destroy$)).subscribe(response => console.log(response));
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next({});
    this._destroy$.complete();
  }

}
