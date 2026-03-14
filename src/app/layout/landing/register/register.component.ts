import { Component } from '@angular/core';
import { LangWidgetComponent } from '../../../shared/components/lang-widget/lang-widget.component';
import { PageComponent } from '../../../shared/components/page/page.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [LangWidgetComponent, PageComponent, RegisterFormComponent, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  handleRegister(data: { email: string; password: string }): void {
    this.authService.register(data.email, data.password).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
    });
  }

  registerByGoogle(): void {}
}
