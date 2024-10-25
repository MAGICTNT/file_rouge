import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    login: new FormControl(""),
    password: new FormControl("")
  })
  loged: string = "not loged"
  constructor(private userService: UsersService){}

  login(){
    const consumer = this.form.value
    this.userService.doLogin(consumer).subscribe({
      next: (res) => {
        console.log(res)
        this.loged = "loged"
      }
    })
  }

}
