/* eslint-disable guard-for-in */

import Team from './Team';
/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  const char = Math.floor(Math.random() * allowedTypes.length);
  yield new allowedTypes[char](maxLevel);
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const userTeam = new Team();
  const machineTeam = new Team();

  for (let i = 0; userTeam.array.length < characterCount; i += 1) {
    const generator = characterGenerator(allowedTypes, maxLevel);
    const char = generator.next();
    if (char.value.type === 'bowman' || char.value.type === 'swordsman') {
      userTeam.add(char.value);
    }
  }

  for (let i = 0; machineTeam.array.length < characterCount; i += 1) {
    const generator = characterGenerator(allowedTypes, maxLevel);
    const char = generator.next();
    if (char.value.type === 'vampire' || char.value.type === 'undead') {
      machineTeam.add(char.value);
    }
  }
  return [userTeam.array, machineTeam.array];
}
