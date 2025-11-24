import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
} from '@angular/core';
import { FloatingMpiComponent } from './floating-mpi.component';

@Injectable({ providedIn: 'root' })
export class FloatingMpiService {
  FLOATING_DURATION_MS: number = 2000;

  constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector) {}

  spawn(x: number, y: number, value: number) {
    const cmpRef: ComponentRef<FloatingMpiComponent> = createComponent(FloatingMpiComponent, {
      environmentInjector: this.injector,
    });

    const offset = (Math.random() - 0.5) * 10;

    cmpRef.instance.x = x + offset;
    cmpRef.instance.y = y;
    cmpRef.instance.value = value;

    this.appRef.attachView(cmpRef.hostView);
    const domElement = cmpRef.location.nativeElement;
    document.body.appendChild(domElement);

    setTimeout(() => {
      this.appRef.detachView(cmpRef.hostView);
      cmpRef.destroy();
    }, this.FLOATING_DURATION_MS);
  }
}
