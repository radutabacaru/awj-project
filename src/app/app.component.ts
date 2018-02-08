import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { loggedInUser } from '../environments/environment';
import { logInMessage } from '../environments/environment';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  </head>
  <body>
    <header>
    <!-- Partea de login -->
    <p id="logInMessage">
      {{logInMessage.message}}
    </p>
    </header>

    

    <div style="text-align:center;
    width:150px; margin:auto; height:1000px">
      <div id="logInContainer" *ngIf="logInShow" style="text-align:left">
        <app-log-in></app-log-in>
      </div>
  
      <div id="registerContainer" *ngIf="registerShow" style="text-align:left">
        <app-register></app-register>
      </div>
      
      <div id="profileContainer" *ngIf="profileShow" style="text-align:left">
        <app-profile></app-profile>
      </div>

      <div id="attendanceContainer" *ngIf="attendanceShow" style="text-align:left">
        <app-attendance></app-attendance>
      </div>
      

      <div class="tab btn-group-vertical">
        <button class="tablinks btn" (click)="logInShow = !logInShow; attendanceShow = false; profileShow = false; registerShow = false">Login</button> 
        <button class="tablinks btn" (click)="logInShow = false; registerShow = !registerShow; attendanceShow = false; profileShow = false">Register</button>
        <button class="tablinks btn" (click)="logInShow = false; registerShow = false; profileShow = !profileShow; attendanceShow = false">Profil</button>
        <button class="tablinks btn" (click)="logInShow = false; registerShow = false; profileShow = false; attendanceShow=!attendanceShow">Prezenta</button>
      </div>
      
    </div>
  </body>

`
})

export class AppComponent {
  title = 'Login';
  environment = environment;
  loggedInUser = loggedInUser;
  logInMessage = logInMessage;
}
