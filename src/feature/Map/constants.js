export const _getAngle = (startx, starty, endx, endy) => {
  let tan = Math.atan2(endy - starty, endx - startx) * 180 / Math.PI;
  let rotate = tan - 90;
  if (rotate === 0) {
    return -90;
  }
  if (rotate < 0 && Math.abs(rotate) > 180) {
    return 360 + rotate;
  }

  return rotate;
}
