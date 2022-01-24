<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  export let buttonClasses: string = '';
  export let isOpen: boolean = false;
  export let fullwidth: boolean = true;
  export let position: string = 'center';
  export let closeButton: boolean = true;
  export let title: string | undefined = undefined;
</script>

{#if $$slots.button}
  <button
    aria-label="open"
    on:click={() => (isOpen = !isOpen)}
    class={`button ${buttonClasses}`}
  >
    <slot name="button" />
    {#if title}
      <span>{title}</span>
    {/if}
  </button>
{/if}
{#if isOpen}
  <div
    class={`modal is-active ${
      position === 'top' ? 'is-justify-content-flex-start pt-6' : null
    }`}
    in:fly={{ y: 50, duration: 300 }}
    out:fade={{ duration: 250 }}
  >
    <div class="modal-background" on:click={() => (isOpen = false)} />
    <div class="modal-content" class:fullwidth>
      <div class="box" in:fade={{ duration: 300 }}>
        <slot name="content" />
      </div>
    </div>
    {#if closeButton}
      <button
        class="modal-close is-large"
        aria-label="close"
        on:click={() => (isOpen = false)}
      />
    {/if}
  </div>
{/if}

<style>
  .fullwidth {
    width: 100%;
  }
  .modal-content {
    max-width: calc(100vw - 120px);
    text-align: left !important;
    overflow-y: scroll;
  }
  .box {
    min-width: 200px;
    min-height: 250px;
  }
</style>
