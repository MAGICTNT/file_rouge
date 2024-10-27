import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../utils/services/users/users.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    login: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  loged: string = "Pas connecté";
  constructor(private userService: UsersService){}

  login(){
    const consumer = this.form.value;
    this.userService.doLogin(consumer).subscribe({
      next: (res) => {
        console.log(res);
        this.loged = "Connecté";
      }
    })
  }

}
