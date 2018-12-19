import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './login/login-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private loginSuccessful: boolean
  
  constructor(public loginDialog: MatDialog, media: MediaMatcher) {

  }

  openLoginDialog(): void {
    const dialogRef = this.loginDialog.open(LoginDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(loggedIn => {
      this.loginSuccessful = loggedIn;
    });
  }
}
