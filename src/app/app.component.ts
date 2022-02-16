import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'co-editing-test-app';
  private interval: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.authService.checkServerIsLive().subscribe();
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
