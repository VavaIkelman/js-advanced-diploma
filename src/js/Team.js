/* eslint-disable max-classes-per-file */

import { generateTeam, positionGenerator } from './generators';
import PositionedCharacter from './PositionedCharacter';
import {
  Daemon, Undead, Vampire, Bowman, Swordsman, Magician,
} from './Character';

export default class Team {
  constructor() {
    this.positioned = [];
    this.allowedTypes = [new Bowman(), new Swordsman()];
    this.startLines = [0, 1];
  }

  init() {
    // create two teams with 2 units and first level
    const members = generateTeam(this.allowedTypes, 1, 2);
    const posGenerator = positionGenerator(this.startLines, 8);
    members.forEach((member) => {
      this.positioned.push(new PositionedCharacter(member, posGenerator.next().value));
    });
    return this.positioned;
  }

  add(positionedCharacter) {
    this.positioned.push(positionedCharacter);
  }

  levelUp(level) {
    // return units on start and add a new unit
    const posGenerator = positionGenerator(this.startLines, 8);

    // up attack and defence for survivor units
    for (const member of this.positioned) {
      member.character.level += 1;

      member.character.attack = +Math.floor(Math.max(
        member.character.attack,
        member.character.attack * (1.8 - (1 - member.character.health / 100)),
      )).toFixed(2);
      member.character.defence = +Math.floor(Math.max(
        member.character.defence,
        member.character.defence * (1.8 - (1 - member.character.health / 100)),
      )).toFixed(2);

      // up health
      member.character.health = member.character.health > 20 ? 100 : member.character.health + 80;

      member.position = posGenerator.next().value;
    }

    // add 1 unit on second level and 2 units on the next
    const countChar = level < 3 ? 1 : 2;
    const newMembers = generateTeam([...this.allowedTypes, new Magician()], level - 1, countChar);
    // up attack and defence
    for (const member of newMembers) {
      member.attack = Math.floor(member.attack
         * ((1.8 - (1 - member.health / 100)) ** (member.level - 1)));
      member.defence = Math.floor(member.defence
         * ((1.8 - (1 - member.health / 100)) ** (member.level - 1)));
      this.add(new PositionedCharacter(member, posGenerator.next().value));
    }
  }
}

export class EnemyTeam extends Team {
  constructor() {
    super();
    this.allowedTypes = [new Daemon(), new Undead(), new Vampire()];
    this.startLines = [6, 7];
  }

  // let attack or go
  turn(playerPositioned) {
    if (this.attack(playerPositioned)) {
      return this.attack(playerPositioned);
    }
    this.step(playerPositioned);
    return null;
  }

  attack(playerPositioned) {
    const canAttack = [];

    this.positioned.forEach((member) => {
      // find units for attack them
      canAttack.push(playerPositioned.filter(
        (character) => member.attackCells.includes(character.position),
      // calc damage
      ).map((attacked) => {
        const damage = Math.max(
          member.character.attack - attacked.character.defence,
          member.character.attack * 0.1,
        );
        return {
          index: member.position,
          attackIndex: attacked.position,
          coef: attacked.character.health / damage,
        };
      }));
    });

    const bestAttack = [].concat(...canAttack).sort((a, b) => a.coef - b.coef);
    return bestAttack[0];
  }

  step(playerPositioned) {
    const boardSize = 8;
    const distances = [];

    this.positioned.forEach((member) => {
      playerPositioned.forEach((character) => {
        distances.push({
          member,
          targetIndex: character.position,
          distance: EnemyTeam.calcSteps(member, character, boardSize),
        });
      });
    });

    distances.sort((a, b) => {
      if (a.distance < b.distance) return -1;
      if (a.distance > b.distance) return 1;
      if (a.member.character.attack > b.member.character.attack) return -1;
      if (a.member.character.attack < b.member.character.attack) return 1;
      return 0;
    });

    const bestMove = EnemyTeam.bestMove(distances[0].member, distances[0].targetIndex, boardSize);
    for (let i = 0; i < bestMove.length; i += 1) {
      if ([...playerPositioned, ...this.positioned]
        .findIndex((character) => character.position === bestMove[i].stepIndex) < 0) {
        distances[0].member.position = bestMove[i].stepIndex;
        break;
      }
    }
  }

  static calcSteps(index, target, boardSize) {
    const vertical = Math.abs(
      Math.floor(index.position / boardSize) - Math.floor(target.position / boardSize),
    );
    const horizontal = Math.abs(
      Math.floor(index.position % boardSize) - Math.floor(target.position % boardSize),
    );

    const vertSteps = Math.ceil(
      (vertical - index.character.attackRadius) / index.character.stepRadius,
    );
    const horSteps = Math.ceil(
      (horizontal - index.character.attackRadius) / index.character.stepRadius,
    );

    if (vertSteps < horSteps) {
      return horSteps > 0 ? horSteps : 0;
    }
    return vertSteps > 0 ? vertSteps : 0;
  }

  static bestMove(index, target, boardSize) {
    const bestStep = [];
    index.stepCells.forEach((stepIndex) => {
      const vertical = Math.abs(
        Math.floor(stepIndex / boardSize) - Math.floor(target / boardSize),
      );
      const horizontal = Math.abs(
        Math.floor(stepIndex % boardSize) - Math.floor(target % boardSize),
      );
      bestStep.push({ stepIndex, result: vertical + horizontal - index.character.attackRadius });
    });
    return bestStep.sort((a, b) => a.result - b.result);
  }

  levelUp(level, countChar) {
    // creat new team on start
    const posGenerator = positionGenerator(this.startLines, 8);
    const newMembers = generateTeam(this.allowedTypes, level, countChar);

    for (const member of newMembers) {
      member.attack = Math.floor(member.attack
         * ((1.8 - (1 - member.health / 100)) ** (member.level - 1)));
      member.defence = Math.floor(member.defence
         * ((1.8 - (1 - member.health / 100)) ** (member.level - 1)));
      this.add(new PositionedCharacter(member, posGenerator.next().value));
    }
  }
}
