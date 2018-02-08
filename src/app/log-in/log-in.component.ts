import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { loggedInUser } from '../../environments/environment';
import { logInMessage } from '../../environments/environment';
declare var require: any
const geolib = require('geolib');


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private _login(): void {

    let distanceFromPoli = 0;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position.coords);
          var poliCoords = {
            latitude: 44.4350,
            longitude: 26.0549
          }
          var currCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          console.log('Poli logs');
          console.log(poliCoords);
          distanceFromPoli = geolib.getDistance(currCoords, poliCoords) / 1000.0;
          alert('Distance from poli is ' + distanceFromPoli + ' km.');
          /*Apelam functia care incearca sa logheze user-ul*/
          login(distanceFromPoli);
        },
        function () {
          alert('Position could note be determined');
        },
        {
          enableHighAccuracy: true
        }
      );
    } else {
      alert('Geolocation unavailable');
    }


    var login = (distanceFromPoli) => {

      let distanceLimit: Number = 5.0;

      if (distanceLimit < distanceFromPoli) {
        alert('You are too far away to log in');
        return;
      }

      var enteredUserName = (document.getElementById('userLogInText') as HTMLInputElement).value;
      var enteredPassword = (document.getElementById('passwordLogInText') as HTMLInputElement).value;
      var numberOfUsers = environment.users.length;
      var usecase = 0;
      for (var i = 0; i < numberOfUsers; i++) {
        if (environment.users[i].username === enteredUserName && environment.users[i].password === enteredPassword) {
          console.log('Successfully login');
          usecase = 1;
          break;
        }
        if (environment.users[i].username === enteredUserName && environment.users[i].password !== enteredPassword) {
          console.log('Wrong password');
          alert('Wrong password');
          usecase = 2;
          break;
        }
      }
      // user not found
      if (usecase === 0) {
        console.log('User not found');
        alert('User not found');
      }
      // loggedin succcessfully
      if (usecase === 1) {
        loggedInUser.username = enteredUserName;
        loggedInUser.password = enteredPassword;
        var userIndex;

        for (var i = 0; i < numberOfUsers; i++) {
          if (environment.users[i].username === loggedInUser.username) {
            userIndex = i;
            break;
          }
        }
        loggedInUser.name = environment.users[userIndex].name;
        loggedInUser.surname = environment.users[userIndex].surname;
        loggedInUser.email = environment.users[userIndex].email;
        loggedInUser.id = environment.users[userIndex].id;
        loggedInUser.userIndex = userIndex;
        loggedInUser.attendance = environment.users[userIndex].attendance;
        var numberAttendance = loggedInUser.attendance.length;
        alert('Successfully logged in. You can now go to profile.');
        logInMessage.message = 'Logged in ' + loggedInUser.username;
      }

    }
  }
}
