import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private _register(): void {
    
    var enteredUserName = (document.getElementById('userRegisterText') as HTMLInputElement).value;
    var enteredPassword =  (document.getElementById('passwordRegisterText') as HTMLInputElement).value;
    var enteredName =  (document.getElementById('nameRegisterText') as HTMLInputElement).value;
    var enteredSurname =  (document.getElementById('surnameRegisterText') as HTMLInputElement).value;
    var enteredEmail =  (document.getElementById('emailRegisterText') as HTMLInputElement).value;
    var enteredID =  (document.getElementById('idRegisterText') as HTMLInputElement).value;
    var newUser: {username: string,
      password: string,
      name: string,
      surname: string,
      email: string,
      id: string,
      attendance: string[]} = {
      username: enteredUserName,
      password: enteredPassword,
      name: enteredName,
      surname: enteredSurname,
      email: enteredEmail,
      id: enteredID,
      attendance: []
    };
    console.log(newUser);
    var numberOfUsers = environment.users.length;
    
    var foundUsername = 0;
    for(var i = 0; i < numberOfUsers; i++) {
      if(environment.users[i].username === newUser.username) {
        foundUsername = 1;
        break;
      }
    }
    if(foundUsername === 0) {
      alert('Registration succcessful');
      environment.users.push(newUser);
    } else {
      alert('Username already exists');
    }
}

}
