import { Component, computed, NgZone, OnInit, signal, WritableSignal } from '@angular/core';
import { GameComponent } from './layout/game/game.component';
import { ProjectService } from './domains/progress/projects/services/project.service';
import { GameSaveService } from './core/services/game-save.service';
import { GameStateService } from './core/services/game-state.service';
import { TicketQueueService } from './domains/progress/tickets/services/ticket-queue.service';

@Component({
  selector: 'app-root',
  imports: [GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private gameSaveService: GameSaveService,
    private gameStateService: GameStateService,
    private ticketQueueService: TicketQueueService,
    private zone: NgZone
  ) {
    this.zone.onUnstable.subscribe(() =>
      console.log('%c[Zone] -> Angular detected async event (entering zone)', 'color: red;')
    );
    this.zone.onStable.subscribe(() =>
      console.log('%c[Zone] <- Angular stable (after CD)', 'color: green;')
    );
  }

  ngOnInit(): void {
    this.projectService.setFirstProject();
    this.manageState();
    this.manageTicketQueue();
  }

  ngOnDestroy(): void {
    this.gameSaveService.stopAutoSave();
  }

  private manageState(): void {
    const loadedState = this.gameSaveService.load();

    if (loadedState) {
      this.gameStateService.setState(loadedState);
    }

    this.gameSaveService.startAutoSave();
  }

  private manageTicketQueue(): void {
    this.ticketQueueService.start();
  }
}
