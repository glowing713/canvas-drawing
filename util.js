export function generateRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 25 + Math.floor(Math.random() * 70);
  const lightness = 85 + Math.floor(Math.random() * 10);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
