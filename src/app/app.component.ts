import { Component, OnInit } from '@angular/core';
import { GameComponent } from './layout/game/game.component';
import { ProjectService } from './domains/progress/projects/services/project.service';
import { GameSaveService } from './core/services/game-save.service';
import { GameStateService } from './core/services/game-state.service';

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
    private gameStateService: GameStateService
  ) {}

  ngOnInit(): void {
    this.projectService.setFirstProject();
    this.manageState();
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
}
