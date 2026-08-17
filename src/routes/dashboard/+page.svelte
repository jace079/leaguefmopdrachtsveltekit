<script>
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';
  import { io } from 'socket.io-client';

  export let data;

  onMount(() => {
    const socket = io();
    socket.on('update', invalidateAll);
    return () => socket.disconnect();
  });
</script>

<svelte:head>
  <title>{data.user.name}</title>
</svelte:head>

<h1>Welkom, {data.user.name}</h1>

<form method="POST" action="?/updateName">
  <input type="text" name="name" placeholder="Nieuwe naam" required>
  <button type="submit">Naam aanpassen</button>
</form>

<form method="POST" action="?/logout">
  <button type="submit">Uitloggen</button>
</form>
