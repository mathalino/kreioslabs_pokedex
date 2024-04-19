<script>
  export let closeModal, color, parentPokemonImg;
  let selectedGender = '';
  function selectGender(gender) {
    console.log(gender)
        selectedGender = gender;
    }
</script>

<div
  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  style="z-index: 100;"
>
  <!-- Modal container -->
  <div class="bg-white rounded-lg shadow-lg" style="width:600px">
    <!-- Modal header -->
    <div
      class=" py-4 px-6 flex justify-between items-center rounded-t-lg type-{color}"
    >
      <h2 class="text-lg font-black">Let's breed!</h2>
      <button
        on:click={closeModal}
        class=" hover:text-gray-500 focus:outline-none text-2xl"
        aria-label="Close modal"
      ><i class="ri-close-line"></i>
      </button>
    </div>
    <!-- Modal content -->
    <div class="modal-content p-6">
      <div>
        <img src={parentPokemonImg} alt="" class="h-36 w-36" />
        <div class="flex items-center space-x-4">
            <div class="border rounded {selectedGender === 'male' ? ' border-black' : 'border-transparent'}">
                <input type="radio" id="male" name="gender" value="male" class="hidden" on:change={() => selectGender('male')}>
                <label for="male" class="cursor-pointer" >
                    <i class="ri-men-line text-blue-500 text-4xl" ></i>
                </label>
            </div>
            <div class="border rounded {selectedGender === 'female' ? ' border-black' : 'border-transparent'}">
                <input type="radio" id="female" name="gender" value="female" class="hidden" on:change={() => selectGender('female')}>
                <label for="female" class="cursor-pointer ">
                    <i class="ri-women-line text-pink-500 text-4xl" ></i>
                </label>
            </div>
        </div>
        
      </div>
    </div>
    <!-- Modal footer -->
    <div class="bg-gray-100 py-4 px-6 rounded-b-lg flex justify-end">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >Try Breeding</button
      >
      <button
        on:click={closeModal}
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-4 hover:bg-gray-400 focus:outline-none"
        >Cancel</button
      >
    </div>
  </div>
</div>