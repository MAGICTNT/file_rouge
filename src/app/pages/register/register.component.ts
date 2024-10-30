import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UsersService } from '../../utils/services/users/users.service';
import { ConsumerRegister } from '../../types/consumerRegister.type';
import { Router } from '@angular/router';

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

  constructor(private userService: UsersService, private router: Router) {}

  register() {
    const mailMessage: HTMLElement | null = document.querySelector("#mailMessage");
    const pseudoMessage: HTMLElement | null = document.querySelector("#pseudoMessage");
    const passwordMessage: HTMLElement | null = document.querySelector("#passwordMessage");
    const confirmPasswordMessage: HTMLElement | null = document.querySelector("#confirmPasswordMessage");

    if(pseudoMessage) {
      if(this.form.get('pseudo')?.errors?.['required']) {
        pseudoMessage.innerHTML = "Please enter a pseudo";
      } else {
        pseudoMessage.innerHTML = ''
      }
    }

    if(mailMessage) {
      if(this.form.get('mail')?.errors?.['required'] || this.form.get('mail')?.errors?.['email']) {
        mailMessage.innerHTML = "Please enter a valid email address";
      } else {
        mailMessage.innerHTML = ''
      }
    }

    if(passwordMessage) {
      if(this.form.get('password')?.errors?.['required'] || this.form.get('password')?.errors?.['minlength']) {
        passwordMessage.innerHTML = "Your password must have at least 6 characters";
      } else {
        passwordMessage.innerHTML = ''
      }
    }

    if(confirmPasswordMessage) {
      if(this.form.value.password !== this.form.value.confirmPassword) {
        confirmPasswordMessage.innerHTML = "The passwords do not match";
      } else {
        confirmPasswordMessage.innerHTML = ''
      }
    }

    if(this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) return;

    const consumerRegister: ConsumerRegister = {
      pseudo: this.form.value.pseudo,
      mail: this.form.value.mail,
      password: this.form.value.password
    };

    this.userService.doRegister(consumerRegister).subscribe({
      next: (res) => {
        if (res) {
          console.log("Registration successful:", res);
          this.router.navigate(['/login']);
        }
        else {
          console.log("Registration failed.");
        }
      },
      error: (err) => {
        console.error("Error in registration:", err);
      }
    });
  }

}
