<script>
  import { base } from '$app/paths';
  import Search from './Search.svelte';
</script>

<nav class="navbar is-info" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href={base + '/'}> Luhmann-Archiv statisch! </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start" />

    <div class="navbar-end">
      <div class="navbar-item">
        <Search />
      </div>
    </div>
  </div>
</nav>
