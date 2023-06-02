export const add = (a: number, b: number): Promise<number> => {
  return Promise.resolve(a + b);
};

export const subtract = (a: number, b: number): Promise<number> => {
  return Promise.resolve(a - b);
};

export const multiply = (a: number, b: number): Promise<number> => {
  return Promise.resolve(a * b);
};

export const divide = (a: number, b: number): Promise<number> => {
  if (b === 0) {
    return Promise.reject('Divide by zero');
  }
  return Promise.resolve(a / b);
};
