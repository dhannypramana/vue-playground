<template>
  <div class="d-flex justify-content-center align-items-center">
    <button class="btn btn-primary" @click.prevent="handleDecrement">
      <span class="h1">-</span>
    </button>
    <h1 class="ms-5">{{ counter }}</h1>
    <button class="btn btn-primary ms-5" @click.prevent="handleIncrement">
      <span class="h1">+</span>
    </button>
  </div>
  <button class="btn btn-primary mt-5" @click.prevent="handleReset">
    Reset
  </button>
</template>

<script setup>
import {ref} from "vue";

const counter = ref(0);

const handleDecrement = () => {
  counter.value--;
}

const handleIncrement = () => {
  counter.value++;
}

const handleReset = () => {
  counter.value = 0
}

</script>