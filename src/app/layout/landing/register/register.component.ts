import { Component, signal } from '@angular/core';
import { LangWidgetComponent } from '../../../shared/components/lang-widget/lang-widget.component';
import { PageComponent } from '../../../shared/components/page/page.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalHeaderComponent } from '../../../shared/components/modal-header/modal-header.component';

@Component({
  selector: 'app-register',
  imports: [
    LangWidgetComponent,
    PageComponent,
    RegisterFormComponent,
    TranslatePipe,
    ModalHeaderComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  emailErrorMsg = signal<string | null>(null);
  serverErrorMsg = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  handleRegister(data: { email: string; password: string }): void {
    this.emailErrorMsg.set(null);
    this.serverErrorMsg.set(null);

    this.authService.register(data.email, data.password).subscribe({
      next: (res) => {
        this.router.navigate(['/hero-creator']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.emailErrorMsg.set('Email already in use');
        } else {
          this.serverErrorMsg.set('Something went wrong');
        }
      },
    });
  }

  registerByGoogle(): void {}
}
