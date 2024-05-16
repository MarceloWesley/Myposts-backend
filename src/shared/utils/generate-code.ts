function generateCode(quantity: number): string {
  const char = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < quantity; i++) {
    const index = Math.floor(Math.random() * char.length);
    result += char[index];
  }

  return result;
}

export { generateCode };
