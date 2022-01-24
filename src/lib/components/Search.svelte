<script lang="ts">
  import Modal from './Modal.svelte';
  import SearchResults, { results } from './SearchResults.svelte';
  import { searchIsOpen } from '$lib/stores/search';
  import Fuse from 'fuse.js';
  let index;
  let selectedQuery: string;
  let hits;
  let container;
  let fuse;
  const fuseOptions = {
    includeScore: true,
    keys: ['text'],
    threshold: 0.2,
    includeMatches: true,
  };

  $: if (!$searchIsOpen) {
    selectedQuery = undefined;
  }
  $: if ($searchIsOpen && container) {
    container.querySelector('input').focus();
  }

  // Helper function to load the search-index
  async function loadData() {
    const resp = await fetch('/json/index.json');
    const data = await resp.json();
    return data;
  }
  async function searchIndex(event) {
    if (typeof index === 'undefined') {
      index = await loadData();
    }
    if (typeof fuse === 'undefined') {
      fuse = new Fuse(index, fuseOptions);
    }
    const results = fuse.search(selectedQuery);
    console.log(results)
    hits = results;
  }
  function handleShortcut(event) {
    if (event.keyCode === 75 && event.metaKey) {
      event.preventDefault();
      $searchIsOpen = !$searchIsOpen;
    } else if (
      (event.key === 'Escape' || event.keyCode === 27) &&
      $searchIsOpen
    ) {
      $searchIsOpen = false;
    }
  }


</script>

<svelte:window on:keydown={handleShortcut} />

<button
  class="button is-light is-rounded is-small has-text-grey-light search-trigger is-flex is-justify-content-space-between"
  on:click={() => ($searchIsOpen = true)}
>
  <span class="button-start is-flex is-align-items-center">
    <span class="icon is-medium"><i class="las la-search" /></span>
    <span>Suchen</span>
  </span><span class="button-end"
    ><span class="button-key">⌘</span><span class="button-key">K</span></span
  ></button
>

<Modal
  bind:isOpen={$searchIsOpen}
  fullwidth={false}
  closeButton={false}
  position={'top'}
>
  <div slot="content" class="content" bind:this={container}>
    <form on:submit|preventDefault={searchIndex}>
      <input
        bind:value={selectedQuery}
        type="text"
        class="input"
        placeholder="Search for Text"
      />
    </form>

    {#if selectedQuery && hits}
      <SearchResults results={hits} />
    {/if}
  </div>
</Modal>

<style>
  .search-trigger {
    min-width: 175px;
  }
  .button-key {
    border: 0.1em solid hsl(0, 0%, 71%);
    border-radius: 15%;
    display: inline-block;
    padding: 0.1em 0.5em;
    background: linear-gradient(180deg, #fff, #fff, #fff, hsl(0, 0%, 96%));
    font-weight: bold;
    margin: 0 0.05em;
  }
</style>
