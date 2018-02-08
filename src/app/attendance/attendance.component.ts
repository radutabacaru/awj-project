import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { loggedInUser } from '../../environments/environment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private _show(): void {
    if(loggedInUser.username === null) {
      console.log('Username not loggedin');
      return;
    } else {
      console.log('Username logged in');
    }
    // Find id of the studentd
    var id;
    var numberOfStudents = environment.users.length;
    for(var i = 0; i < numberOfStudents; i++) {
      if(environment.users[i].username === loggedInUser.username) {
        id = environment.users[i].id;
        break;
      }
    }
    //Search laboratories from the user group
    console.log('Avialable labs:');
    var numberOfLaboratories = environment.laboratories.length;
    for(var  i = 0; i < numberOfLaboratories; i++) {
      var numberOfGroups = environment.laboratories[i].groups.length;
      for(var j = 0; j < numberOfGroups; j++) {
        if(environment.laboratories[i].groups[j] === id) {
          console.log(environment.laboratories[i].name);
          var option = document.createElement("option");
          option.setAttribute("value","Lab " + environment.laboratories[i].name);
          option.innerHTML = environment.laboratories[i].name;
          document.getElementById("Laboratories").appendChild(option);
        }
      }
    }

    console.log('Avialable courses:');
    var numberOfCourses = environment.courses.length;
    for(var  i = 0; i < numberOfCourses; i++) {
      var numberOfGroups = environment.courses[i].groups.length;
      for(var j = 0; j < numberOfGroups; j++) {
        if(environment.courses[i].groups[j] === id) {
          console.log(environment.courses[i].name);
          var option = document.createElement("option");
          option.setAttribute("value","Curs " + environment.courses[i].name);
          option.innerHTML = environment.courses[i].name;
          document.getElementById("Courses").appendChild(option);

        }
      }
    }
  }

  private _attendLab(): void {
    if(loggedInUser.username === null) {
      console.log('Username not loggedin');
      return;
    } else {
      var selectedLab = (document.getElementById("Laboratories") as HTMLInputElement).value;
      //console.log('Selected lab is: ' + selectedLab);
      environment.users[loggedInUser.userIndex].attendance.push(selectedLab);
      //console.log(loggedInUser.attendance);
    }
  }

  private _attendCourse(): void {
    if(loggedInUser.username === null) {
      console.log('Username not loggedin');
      return;
    } else {
      var selectedCourse = (document.getElementById("Courses") as HTMLInputElement).value;
      //console.log('Selected course is: ' + selectedCourse);
      environment.users[loggedInUser.userIndex].attendance.push(selectedCourse);
      //console.log(loggedInUser.attendance);
    }
  }
}
