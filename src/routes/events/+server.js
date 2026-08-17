import { addClient, removeClient } from '$lib/store';

export function GET() {
  let controller;
  const stream = new ReadableStream({
    start(c) {
      controller = c;
      addClient(controller);
    },
    cancel() {
      removeClient(controller);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  });
}
