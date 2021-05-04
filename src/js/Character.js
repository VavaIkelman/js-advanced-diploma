export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;

    if (new.target.name === 'Character') {
      throw new Error('Don\'t use new Character()');
    }
  }
}

export class Bowman extends Character {
  constructor(level, type = 'bowman') {
    super(level, type);
    this.attack = 25;
    this.defence = 25;
    this.stepRadius = 2;
    this.attackRadius = 2;
  }
}

export class Swordsman extends Character {
  constructor(level, type = 'swordsman') {
    super(level, type);
    this.attack = 40;
    this.defence = 10;
    this.stepRadius = 4;
    this.attackRadius = 1;
  }
}

export class Magician extends Character {
  constructor(level, type = 'magician') {
    super(level, type);
    this.attack = 10;
    this.defence = 40;
    this.stepRadius = 1;
    this.attackRadius = 4;
  }
}

export class Vampire extends Character {
  constructor(level, type = 'vampire') {
    super(level, type);
    this.attack = 25;
    this.defence = 25;
    this.stepRadius = 2;
    this.attackRadius = 2;
  }
}

export class Undead extends Character {
  constructor(level, type = 'undead') {
    super(level, type);
    this.attack = 40;
    this.defence = 10;
    this.stepRadius = 4;
    this.attackRadius = 1;
  }
}

export class Daemon extends Character {
  constructor(level, type = 'daemon') {
    super(level, type);
    this.attack = 10;
    this.defence = 40;
    this.stepRadius = 1;
    this.attackRadius = 4;
  }
}
