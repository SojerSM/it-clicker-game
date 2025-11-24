import { Component, HostBinding, Input } from '@angular/core';
import { NumberFormat } from '../../../core/pipes/number-format.pipe';

@Component({
  selector: 'app-floating-mpi',
  imports: [NumberFormat],
  templateUrl: './floating-mpi.component.html',
  styleUrl: './floating-mpi.component.scss',
})
export class FloatingMpiComponent {
  @Input({ required: true }) x!: number;
  @Input({ required: true }) y!: number;
  @Input({ required: true }) value!: number;

  @HostBinding('style.left.px') get left() {
    return this.x;
  }
  @HostBinding('style.top.px') get top() {
    return this.y;
  }
}
