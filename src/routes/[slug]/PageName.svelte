<script>
  import { capitalizeFirstLetter } from "../../lib/js/reusables";

    export let name;
</script>

<span class="hidden md:block">{capitalizeFirstLetter(name)}</span>