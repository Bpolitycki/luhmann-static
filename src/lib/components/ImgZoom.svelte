<script>
  import { onMount } from 'svelte';
  import { zoom, zoomIdentity, zoomTransform } from 'd3-zoom';
  import { select } from 'd3-selection';
  export let src;
  export let alt;
  export let width = undefined;
  let showButtons = false;
  let svg, g, htmlImg;
  let w = 0;
  let h = 0;
  let imgZoom = zoom().on('zoom', handleZoom);
  function handleZoom(e) {
    const { k, x, y } = e.transform;
    select(g).attr('style', `transform:translate(${x}px, ${y}px) scale(${k})`);
  }
  const img = new Image();
  img.src = src;
  img.alt = alt;
  img.addEventListener('load', () => {
    w = img.naturalWidth;
    h = img.naturalHeight;
    if (svg && g && htmlImg) {
      htmlImg.setAttribute('width', w);
      htmlImg.setAttribute('height', h);
      htmlImg.appendChild(img);
      select(svg).call(imgZoom);
    }
  });
  function resetZoom() {
    select(svg).call(imgZoom.scaleTo, 1);
  }
  function zoomIn() {
    select(g).transition().call(imgZoom.scaleBy, 2);
  }
  function zoomOut() {
    select(g).transition().call(imgZoom.scaleBy, 0.5);
  }
</script>

<div
  class="wrapper has-background-light p-2"
  on:mouseover={() => (showButtons = true)}
  on:mouseleave={() => (showButtons = false)}
  on:focus={() => (showButtons = true)}
>
  <div class="buttons" class:is-hidden={!showButtons}>
    <button class="button is-rounded" on:click={resetZoom}>&#x21bb;
</button>
    <button class="button is-rounded" on:click={zoomIn}>+</button>
    <button class="button is-rounded" on:click={zoomOut}>-</button>
  </div>
  <svg
    viewBox={`0 0 ${w} ${h}`}
    bind:this={svg}
    style={`width:${width || w + 'px'}; height: 100%; max-height: 100%`}
  >
    <g bind:this={g}>
      <foreignObject bind:this={htmlImg} />
      {#if $$slots}
        <slot />
      {/if}
    </g>
  </svg>
</div>

<style>
  .wrapper {
    height: 100%;
    position: relative;
  }
  .buttons {
    position: absolute;
    z-index: 10;
  }
  .is-rounded {
    background-color: hsl(204, 86%, 53%);
    color: white;
    aspect-ratio: 1;
    border-radius: 50%;
  }
</style>
