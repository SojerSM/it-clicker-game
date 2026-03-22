import { Component } from '@angular/core';
import { PageComponent } from '../../../../shared/components/page/page.component';
import { LangWidgetComponent } from '../../../../shared/components/lang-widget/lang-widget.component';
import { NgForm, FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ModalHeaderComponent } from '../../../../shared/components/modal-header/modal-header.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [PageComponent, LangWidgetComponent, FormsModule, TranslatePipe, ModalHeaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}

  handleSignIn(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.router.navigate(['/game']);
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      },
    });
  }
}
