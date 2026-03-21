import { Component } from '@angular/core';
import { PageComponent } from '../../../../shared/components/page/page.component';
import { LangWidgetComponent } from '../../../../shared/components/lang-widget/lang-widget.component';
import { NgForm, FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  imports: [PageComponent, LangWidgetComponent, FormsModule, TranslatePipe],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  formError: string = '';

  submit(form: NgForm): void {
    this.formError = '';

    const email = form.value.email;
    const password = form.value.password;

    console.log(email);
    console.log(password);
  }
}
