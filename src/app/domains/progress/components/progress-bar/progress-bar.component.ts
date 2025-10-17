import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  @Input({ required: false }) progress?: number;
  @Input({ required: true }) max!: number;

  ngOnInit() {
    console.log('ngOnInit →', this.progress, this.max);
  }
  get percentage(): number {
    return this.progress ? Math.min((this.progress / this.max) * 100, 100) : 100;
  }
}
