import Character, { Bowman } from '../Character';

test('new Character => error', () => {
  expect(() => new Character(1, 'swordsman')).toThrowError(new Error('Don\'t use new Character()'));
});

test('create Bowman without error', () => {
  expect(() => new Bowman(1, 'bowman')).not.toThrowError();
});

test('create Bowman', () => {
  const hero = new Bowman(1);
  const result = {
      type: 'bowman',
      health: 50,
      level: 1,
      attack: 25,
      defence: 25,
  }

  expect(hero).toMatchObject(result);
});