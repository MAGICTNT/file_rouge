import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../utils/services/users/users.service';
import { FridgeComponent } from '../../components/fridge/fridge.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, FridgeComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: any;
  changeMailForm: FormGroup = new FormGroup(
    {
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    },
    [Validators.required]
  );
  changePasswordForm: FormGroup = new FormGroup(
    {
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl(''),
    },
    [
      Validators.required,
      (formGroup: AbstractControl): ValidationErrors | null => {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { notSame: true };
      },
    ]
  );
  mailContainerDiv: HTMLDivElement | null = null;
  mailDiv: HTMLDivElement | null = null;
  changeMailDiv: HTMLDivElement | null = null;
  passwordContainerDiv: HTMLDivElement | null = null;
  passwordDiv: HTMLDivElement | null = null;
  changePasswordDiv: HTMLDivElement | null = null;
  messageMail: HTMLElement | null = null;
  messagePassword: HTMLElement | null = null;

  constructor(private userService: UsersService) {
    this.user = {
      pseudo: localStorage.getItem('pseudo'),
      mail: localStorage.getItem('mail'),
    };
    this.changeMailForm.setValue({ mail: this.user.mail, password: '' });
  }

  ngOnInit(): void {
    this.mailContainerDiv = document.querySelector('#mailContainer');
    this.mailDiv = document.querySelector('#mail');
    this.changeMailDiv = document.querySelector('#changeMail');
    this.passwordContainerDiv = document.querySelector('#passwordContainer');
    this.passwordDiv = document.querySelector('#password');
    this.changePasswordDiv = document.querySelector('#changePassword');
    this.messageMail = document.querySelector('#messageMail');
    this.messagePassword = document.querySelector('#messagePassword');
  }

  inputMail() {
    const inputMail: HTMLInputElement | null = document.querySelector(
      '#changeMail input[type="email"]'
    );
    const inputPassword: HTMLInputElement | null = document.querySelector(
      '#changeMail input[type="password"]'
    );

    this.mailDiv?.setAttribute('hidden', '');
    this.changeMailDiv?.removeAttribute('hidden');
    this.passwordContainerDiv?.setAttribute('hidden', '');
    if (this.messageMail) this.messageMail.innerText = '';
    if (this.messagePassword) this.messagePassword.innerText = '';

    if (inputMail) inputMail.value = this.user.mail;
    if (inputPassword) inputPassword.value = '';
  }

  cancelInputMail() {
    const input: HTMLInputElement | null =
      document.querySelector('#changeMail input');

    this.mailDiv?.removeAttribute('hidden');
    this.changeMailDiv?.setAttribute('hidden', '');
    this.passwordContainerDiv?.removeAttribute('hidden');
    if (this.messageMail) this.messageMail.innerText = '';
    if (this.messagePassword) this.messagePassword.innerText = '';

    if (input) input.value = this.user.mail;
  }

  updateMail() {
    if (!this.changeMailForm.valid) return;

    this.userService
      .updateMail(
        this.changeMailForm.value.mail,
        this.changeMailForm.value.password
      )
      .subscribe({
        next: (res) => {
          if (res?.hasOwnProperty('200')) {
            localStorage.setItem('mail', this.changeMailForm.value.mail);
            this.user.mail = this.changeMailForm.value.mail;
            this.mailDiv?.removeAttribute('hidden');
            this.changeMailDiv?.setAttribute('hidden', '');
            this.passwordContainerDiv?.removeAttribute('hidden');
            if (this.messageMail) {
              this.messageMail.style.color = 'green';
              this.messageMail.innerText = 'Mail updated';
            }
          } else if (this.messageMail) {
            this.messageMail.style.color = 'red';
            if (res?.hasOwnProperty('401')) {
              this.messageMail.innerText = 'Wrong password';
            } else if (res?.hasOwnProperty('500')) {
              this.messageMail.innerText = 'This mail is already used';
            }
          }
        },
      });
  }

  inputPassword() {
    const inputPassword: HTMLInputElement | null = document.querySelector(
      '#changePassword input[type="password"]:nth-of-type(1)'
    );
    const inputConfirmPassword: HTMLInputElement | null =
      document.querySelector(
        '#changePassword input[type="password"]:nth-of-type(2)'
      );

    this.passwordDiv?.setAttribute('hidden', '');
    this.changePasswordDiv?.removeAttribute('hidden');
    this.mailContainerDiv?.setAttribute('hidden', '');
    if (this.messageMail) this.messageMail.innerText = '';
    if (this.messagePassword) this.messagePassword.innerText = '';

    if (inputPassword) inputPassword.value = '';
    if (inputConfirmPassword) inputConfirmPassword.value = '';
  }

  cancelInputPassword() {
    if (this.messagePassword) this.messagePassword.innerText = '';

    this.passwordDiv?.removeAttribute('hidden');
    this.changePasswordDiv?.setAttribute('hidden', '');
    this.mailContainerDiv?.removeAttribute('hidden');
    if (this.messageMail) this.messageMail.innerText = '';
  }

  updatePassword() {
    const messagePassword: HTMLElement | null =
      document.querySelector('#messagePassword');

    if (!this.changePasswordForm.valid) {
      if (messagePassword) {
        messagePassword.style.color = 'red';
        messagePassword.innerText = 'The two passwords do not match';
      }
      return;
    }

    this.userService
      .updatePassword(this.changePasswordForm.value.password)
      .subscribe({
        next: (res) => {
          if (res?.hasOwnProperty('200')) {
            this.passwordDiv?.removeAttribute('hidden');
            this.changePasswordDiv?.setAttribute('hidden', '');
            this.mailContainerDiv?.removeAttribute('hidden');
            if (messagePassword) {
              messagePassword.style.color = 'green';
              messagePassword.innerText = 'Password updated';
            }
          }
        },
      });
  }
}
