import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from './shared/services/utils.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroy$ = new Subject<any>()
  opened = false;

  constructor(private _utilsService: UtilsService) { }

  ngOnInit(): void {
    this._utilsService.sideNavOpened$.pipe(takeUntil(this._destroy$)).subscribe((res: boolean) => this.opened = res);
  }

  ngOnDestroy(): void {
    this._destroy$.next({});
    this._destroy$.complete();
  }

}
