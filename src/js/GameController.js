import GamePlay from './GamePlay';
import themes from './themes';
import { Team, EnemyTeam } from './Team';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.playerTeam = new Team();
    this.enemyTeam = new Team();
    this.selectedCharacter = 0;
  }

  init() {
    this.gamePlay.drawUi('desert');// пока для отрисовки 1го уровня прерии
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
