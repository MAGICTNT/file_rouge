import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../utils/services/users/users.service';
import { Router } from '@angular/router';


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

  constructor(private userService: UsersService, private router: Router){}

  login(){
    const consumer = this.form.value;
    this.userService.doLogin(consumer).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      }
    })
  }

}
