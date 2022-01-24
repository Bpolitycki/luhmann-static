<script context="module" lang="ts">
  export async function load({ fetch }) {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}1/auszug/01?page=1`
    );
    const data = await response.json();
    return {
      props: {
        data,
      },
    };
  }
</script>

<script lang="ts">
  import Pageheader from '$lib/components/Pageheader.svelte';
  import Results from '$lib/components/Results.svelte';
  import Content from '$lib/components/Content.svelte';
  export let data;
</script>

<svelte:head>
  <title>Luhmann-Archiv statisch!</title>
</svelte:head>

<Pageheader
  title="Zettelübersicht"
  subtitle={data.firstResult.ekin.match(/ZK_[0-9]/)}
/>

<Content>
  <Results results={data.results} />
</Content>
