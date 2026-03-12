import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LangWidgetComponent } from '../../../shared/components/lang-widget/lang-widget.component';
import { PageComponent } from '../../../shared/components/page/page.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
  selector: 'app-register',
  imports: [RouterOutlet, LangWidgetComponent, PageComponent, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerByGoogle(): void {}
}
