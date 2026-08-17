export const users = {};

export function setIo(instance) {
  globalThis.__io = instance;
}

export function broadcast() {
  if (globalThis.__io) globalThis.__io.emit('update');
}
