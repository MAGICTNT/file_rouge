import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../utils/services/users/users.service';
import { ConsumerRegister } from '../../types/consumerRegister.type';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    pseudo: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  registrationStatus: string = '';

  constructor(private userService: UsersService) {}

  register() {
    if (this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      alert("Please check your inputs.");
      return;
    }

    const consumerRegister: ConsumerRegister = {
      pseudo: this.form.value.pseudo,
      mail: this.form.value.mail,
      password: this.form.value.password
    };

    this.userService.doRegister(consumerRegister).subscribe({
      next: (res) => {
        if (res) {
          console.log("Registration successful:", res);
          this.registrationStatus = 'registered';
        }
        else {
          console.log("Registration failed.");
          this.registrationStatus = 'not registered';
        }
      },
      error: (err) => {
        console.error("Error in registration:", err);
      }
    });
  }

}
