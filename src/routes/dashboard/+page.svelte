<script>
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;

  onMount(() => {
    const es = new EventSource('/events');
    es.onmessage = () => invalidateAll();
    return () => es.close();
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
