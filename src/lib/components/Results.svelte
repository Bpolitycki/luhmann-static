<script>
  import { base } from '$app/paths';
  export let results;
</script>

<table class="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Titel</th>
      <th>Auszug</th>
    </tr>
  </thead>
  <tbody>
    {#each results as result}
      <tr>
        <td><a href={`${base}/${result.ekin}`}>{result.ekin}</a></td>
        <td>{result.title}</td>
        <td>{result.auszug}</td>
      </tr>
    {/each}
  </tbody>
</table>
