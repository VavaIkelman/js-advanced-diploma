import PositionCharacter from './PositionedCharacter';
import { generateTeam, positionGenerator } from './generators';
import { Bowman, Swordsman, Magician } from './Character';

export default class Team {
  constructor() {
    this.array = [];
    this.allowedTypes = [new Swordsman(), new Bowman()];
    this.startColumn = [0, 1];
  }

  init() {
    const units = generateTeam(this.allowedTypes, 1, 2);
    const currentCell = positionGenerator(this.startColumn, 8);
    units.forEach((unit) => {
      this.array.push(new PositionCharacter(unit, currentCell.next().value));
    });
    return this.array;
  }

  add(character) {
    this.array.push(character);
  }

  levelUp() {
    const currentCell = positionGenerator(this.startColumn, 8);
    for (const unit of this.array) {
      unit.character.level += 1;
      unit.character.attack = +Math.floor(Math.max(unit.character.attack, unit.character.attack * 1.8 - (1 - unit.character.health / 100))).toFixed(2);
      unit.character.defence = +Math.floor(Math.max(unit.character.defence, unit.character.defence * 1.8 - (1 - unit.character.health / 100))).toFixed(2);
      unit.character.health = unit.character.health > 20 ? 100 : unit.character.health + 80;
      unit.position = currentCell.next().value;
    }

    const countChar = level < 3 ? 1 : 2;
    const newUnit = generateTeam([...thiss.allowedTypes, new Magician()], level - 1, countChar);
    for (const unit of newUnits){
      unit.attack = Math.floor(unit.attack * ((1.8 - (1 - unit.health / 100)) ** (unit.level - 1)));
      unit.defence = Math.floor(unit.defence * ((1.8 - (1 - unit.health / 100)) ** (unit.level - 1)));
    this.add(new PositionCharacter(unit, currentCell.next().value));
    }
  }
}

export class EnemyTeam extends Team {
  constructor() {
    super();
  }
}
