export const sleepApp = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const sleepAppWithData = <T>(ms: number, data: T) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(data), ms));
