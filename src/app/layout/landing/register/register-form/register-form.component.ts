import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [TranslatePipe, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  @Input({ required: false }) emailErrorMsg: string | null = null;
  @Output() submitForm = new EventEmitter<{ email: string; password: string }>();

  passwordError: string = '';

  submit(form: NgForm): void {
    this.passwordError = '';

    const email = form.value.email;
    const password = form.value.password;
    const confirmedPassword = form.value.confirmPassword;

    if (password !== confirmedPassword) {
      this.passwordError = 'Passwords are not the same.';

      form.controls['confirmPassword'].reset();

      return;
    }

    this.submitForm.emit({ email, password: password });
  }
}
