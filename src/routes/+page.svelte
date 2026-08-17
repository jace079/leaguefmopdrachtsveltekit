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
  <title>Home</title>
</svelte:head>

<h1>Gebruiker maken</h1>
<form method="POST" action="?/create">
  <input type="text" name="name" placeholder="Naam" required>
  <button type="submit">Maak gebruiker</button>
</form>

<h1>Inloggen als</h1>
<ul>
  {#each data.users as u}
    <li>
      {u.name}
      <form method="POST" action="?/login" style="display:inline">
        <input type="hidden" name="id" value={u.id}>
        <button type="submit">Inloggen</button>
      </form>
    </li>
  {/each}
</ul>
