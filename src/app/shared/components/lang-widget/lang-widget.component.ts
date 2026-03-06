import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-widget',
  imports: [],
  templateUrl: './lang-widget.component.html',
  styleUrl: './lang-widget.component.scss',
})
export class LangWidgetComponent {
  constructor(private translateService: TranslateService) {}

  useLanguage(language: string) {
    this.translateService.use(language);
  }
}
