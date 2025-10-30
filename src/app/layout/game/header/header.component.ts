import { Component } from '@angular/core';
import { ProjectProgressComponent } from '../../../domains/progress/projects/components/progress-header/project-progress.component';

@Component({
  selector: 'app-header',
  imports: [ProjectProgressComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
