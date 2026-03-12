import { Component } from '@angular/core';
import { LangWidgetComponent } from '../../../shared/components/lang-widget/lang-widget.component';
import { PageComponent } from '../../../shared/components/page/page.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [LangWidgetComponent, PageComponent, RegisterFormComponent, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerByGoogle(): void {}
}
