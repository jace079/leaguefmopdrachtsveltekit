<script>
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;

  onMount(() => {
    const interval = setInterval(invalidateAll, 1000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>{data.user ? data.user.name : 'Home'}</title>
</svelte:head>

{#if data.user}
  <h1>Welkom, {data.user.name}</h1>

  <form method="POST" action="?/updateName">
    <input type="text" name="name" placeholder="Nieuwe naam" required>
    <button type="submit">Naam aanpassen</button>
  </form>

  <form method="POST" action="?/logout">
    <button type="submit">Uitloggen</button>
  </form>
{:else}
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
{/if}
