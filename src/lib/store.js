const encoder = new TextEncoder();

export const users = {};

let clients = [];

export function addClient(controller) {
  clients.push(controller);
}

export function removeClient(controller) {
  clients = clients.filter((c) => c !== controller);
}

export function broadcast() {
  const msg = encoder.encode('data: update\n\n');
  clients.forEach((c) => {
    try {
      c.enqueue(msg);
    } catch (e) {}
  });
}
