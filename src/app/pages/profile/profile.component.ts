import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../utils/services/users/users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  constructor(private userService: UsersService) {
    this.user = {
      pseudo: localStorage.getItem('pseudo'),
      mail: localStorage.getItem('mail'),
    };
    this.changeMailForm.setValue({ mail: this.user.mail, password: '' });
  }

  inputMail() {
    const mailDiv: HTMLDivElement | null = document.querySelector('#mail');
    const changeMailDiv: HTMLDivElement | null =
      document.querySelector('#changeMail');
    const inputMail: HTMLInputElement | null = document.querySelector(
      '#changeMail input[type="email"]'
    );
    const inputPassword: HTMLInputElement | null = document.querySelector(
      '#changeMail input[type="password"]'
    );

    mailDiv?.setAttribute('hidden', '');
    changeMailDiv?.removeAttribute('hidden');

    if (inputMail) {
      inputMail.value = this.user.mail;
      // this.changeMailForm.value.mail = this.user.mail;
    }
    if (inputPassword) inputPassword.value = '';
  }

  cancelInputMail() {
    const mailDiv: HTMLDivElement | null = document.querySelector('#mail');
    const changeMailDiv: HTMLDivElement | null =
      document.querySelector('#changeMail');
    const input: HTMLInputElement | null =
      document.querySelector('#changeMail input');

    mailDiv?.removeAttribute('hidden');
    changeMailDiv?.setAttribute('hidden', '');

    if (input) input.value = this.user.mail;
  }

  updateMail() {
    if (!this.changeMailForm.valid) return;

    const mailDiv: HTMLDivElement | null = document.querySelector('#mail');
    const changeMailDiv: HTMLDivElement | null =
      document.querySelector('#changeMail');
    const messageMail: HTMLElement | null =
      document.querySelector('#mesageMail');

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
            mailDiv?.removeAttribute('hidden');
            changeMailDiv?.setAttribute('hidden', '');
            if(messageMail) {
              messageMail.style.color = 'green';
              messageMail.innerText = 'Mail updated';
            }
          } else if (res?.hasOwnProperty('401')) {
            if(messageMail) {
              messageMail.style.color = 'red';
              messageMail.innerText = 'Wrong password';
            }
          } else if (res?.hasOwnProperty('500')) {
            if(messageMail) {
              messageMail.style.color = 'red';
              messageMail.innerText = 'This mail is already used';
            }
          }
        },
      });
  }
}
