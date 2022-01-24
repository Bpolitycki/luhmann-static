<script context="module" lang="ts">
  export async function load({ fetch, params }) {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}zettel/${params.zettel}`
    );
    const data = await response.json();
    return {
      props: {
        transcript: data.transcription,
        image: data.image ? data.image.id : undefined,
      },
    };
  }
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Pageheader from '$lib/components/Pageheader.svelte';
  import Content from '$lib/components/Content.svelte';
  import ImgZoom from '$lib/components/ImgZoom.svelte';
  import type { transcript } from '$lib/types';
  export let transcript: transcript;
  export let image: string | undefined;
  let imgZoom;

  function handleClick(event) {
    if (event.target.tagName.toLowerCase() === 'a') {
      window
        .open(
          `${event.target.href.replace(
            /https?:\/{2}\w*:\d*/,
            'https://niklas-luhmann-archiv.de'
          )}`,
          '_blank'
        )
        .focus();
    }
  }

  onMount(async () => {
    const zoom = await import('$lib/components/ImgZoom.svelte');
    imgZoom = zoom.default;
  });
</script>

<svelte:head>
  <title>Luhmann-Archiv statisch – {$page.params.zettel}</title>
</svelte:head>

<Pageheader title="Einzelansicht" subtitle={$page.params.zettel} />

<Content>
  <div class="columns">
    <div class="column img-col">
      <svelte:component
        this={imgZoom}
        src={`https://images.niklas-luhmann-archiv.de/image/${image}?size=2`}
        alt={'Image: ' + image}
        width="100%"
      />
    </div>
    <div class="column is-6" on:click|capture|preventDefault={handleClick}>
      {@html transcript.html
        .replaceAll(/<a/g, '<a rel=external')
        .replaceAll(/<img .*?>/g, '')}
    </div>
  </div>
</Content>

<style>
</style>
