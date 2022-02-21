import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { interval, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'co-editing-test-app';
  private destroy$ = new Subject<boolean>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    interval(5000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.authService.checkIfServerIsAlive().subscribe());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
