<script lang="ts">
  import { base } from '$app/paths';
  export let results;
  export let max: number = 10;
  let count = results.length;
  let showAll = false;
  let rows;

  $: if (showAll) {
    rows = results;
  } else {
    rows = results.slice(0, max);
  }
</script>

<div class="results is-flex is-flex-direction-column">
  <h6 class="title is-6 mt-4 mx-auto">
    <span class="has-border-bottom-primary">{count}</span>
    {count === 1 ? 'Eintrag' : 'Einträge'} gefunden
  </h6>
  <div class="results-list is-flex is-flex-direction-column">
    {#each rows as row}
      <div class="card mt-2">
        <ul class="py-2">
          <li>
            <span class="has-text-weight-bold">Textausschnitt:</span>
            {row.item.text.substring(0, 30) + '...'}
          </li>
          <li>
            <span class="has-text-weight-bold">Zettel-ID:</span>
            <a href={`${base}/${row.item.id}`}>{row.item.id}</a>
          </li>
        </ul>
      </div>
    {/each}
    {#if !showAll && results.length > 10}
      <button on:click={() => (showAll = true)} class="button mx-auto mt-2"
        >Zeige alle</button
      >
    {/if}
  </div>
</div>

<style>
  .has-border-bottom-primary {
    border-bottom: solid 4px #00d1b2;
  }
  .results-list {
    max-height: 400px;
    overflow-y: scroll;
  }
  ul {
    list-style: none;
  }
</style>
