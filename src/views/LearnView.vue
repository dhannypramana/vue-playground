<template>
  <div class="data-binding mb-4">
    <h3>#1 Two Way Data Binding</h3>
    <h5>{{ title }}</h5>
    <div class="form-group">
      <input v-model="title" type="text" class="form-control">
    </div>
  </div>

  <div class="reactive mb-4">
    <h3>#2 Reactive Data
      <small>
        (This data is coming from reactive)
      </small>
    </h3>
    <table class="table table-bordered">
      <thead class="bg-dark text-white">
      <td>No.</td>
      <td>Username</td>
      <td>Age</td>
      </thead>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.age }}</td>
      </tr>
    </table>
  </div>

  <div class="non-reactive-data mb-4">
    <h3>#3 Non - Reactive Data</h3>
    <p>My name is {{ name }}</p>
  </div>

  <div class="methods mb-4">
    <h3>#4 Methods</h3>
    <h4>Number : {{ number }}</h4>
    <button class="btn btn-primary" @click="getNumber(1000)">Get a Number</button>
    <button class="btn btn-danger ms-3" @click="getNumber(0)">Reset</button>
  </div>

  <div class="computed mb-4">
    <h3>#4 Computed</h3>
    <p>{{ formattedRupiah }}</p>
  </div>

  <div class="watch mb-4">
    <h3>#5 Watch</h3>
    <input v-model="username" type="text" class="form-control" placeholder="type 'dhannypramana' in this input tag">
  </div>

</template>

<script setup>
import {computed, reactive, ref, watch} from "vue";
import Swal from "sweetalert2";

// #1 - Two Way Data Binding
const title = ref('My Playground');

// #2 - Reactive Data
const users = reactive([
  {
    id: 1,
    username: "dhannypramana",
    age: 22
  },
  {
    id: 2,
    username: "popododi",
    age: 29
  },
]);

// #3 - Non Reactitve Data
const name = "Dhanny Adhi Pramana";

// #4 - Methods
const number = ref(0);
const getNumber = amount => {
  number.value = amount
}

// #5 - Computed
const formattedRupiah = computed(() => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(125000);
})

// $6 - Watch
const username = ref('')

watch(
    () => username.value,
    (newValue) => {
      if (newValue === 'dhannypramana') {
        Swal.fire({
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: "success",
          title: "Welcome Back, Admin!"
        })
      }
    }
)
</script>