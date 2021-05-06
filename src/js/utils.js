export function calcTileType(index, boardSize) {
  if (index === 0) {
    return 'top-left';
  } if (index < boardSize && (index + 1) % boardSize !== 0) {
    return 'top';
  } if ((index + 1) / boardSize === 1) {
    return 'top-right';
  } if ((index) === (boardSize ** 2 - boardSize)) {
    return 'bottom-left';
  } if ((boardSize ** 2 - index) < boardSize && (index + 1) !== (boardSize ** 2)) {
    return 'bottom';
  } if ((index + 1) === (boardSize ** 2)) {
    return 'bottom-right';
  } if ((index + 1) % boardSize === 0) {
    return 'right';
  } if (index % boardSize === 0) {
    return 'left';
  }
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
