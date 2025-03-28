export const colors = {
  primary: "#40196D",
};

export function nameToColor(name: string) {
  if (!name) return "";
  // Simple hashing function to generate a unique number based on the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a positive 24-bit integer
  const positiveHash = Math.abs(hash) % 16777215;

  // Convert the integer to a hex color
  const hexColor = "#" + ("00000" + positiveHash.toString(16)).slice(-6);

  return hexColor;
}
