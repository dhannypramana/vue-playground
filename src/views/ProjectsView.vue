<template>
  <div class="card mt-4">
    <div class="card-header h5">
      Project's List
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <RouterLink
            :to="{name: 'projects.counter'}">
          Counter App
        </RouterLink>
      </li>
      <li class="list-group-item">
        <RouterLink
            :to="{name: 'projects.todoList'}">
          Todo List App
        </RouterLink>
      </li>
    </ul>
  </div>
</template>