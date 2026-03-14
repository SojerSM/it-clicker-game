import { Component, EventEmitter, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [TranslatePipe, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  @Output() submitForm = new EventEmitter<{ email: string; password: string }>();

  submit(email: string, password: string): void {
    this.submitForm.emit({ email, password });
  }
}
