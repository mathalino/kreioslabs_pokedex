<script>
  import pokedex_logo from "$lib/images/pokedex-logo.png";
  import "../app.css";
</script>

<!-- Navigation -->
<nav class="nav">
  <div class="w-fit">
    <a href="/">
      <img class="w-52" src={pokedex_logo} alt="Pokedex Logo" />
    </a>
  </div>
</nav>
<!-- Navigation end -->

<main>
  <slot />
</main>

<footer class="mt-6">
  <hr>
  <p class="text-center my-4">&copy; This Pokédex is made by <a href="https://github.com/mathalino" class="text-blue-500 underline" target="_blank">mathalino</a>.</p>
</footer>
