<template>
  <div class="todo-list">
    <div class="title">
      <h3>Todo List App</h3>
      <h5>Simpan Catatan Kegiatan Kamu!</h5>
      <hr class="sidebar-divider">
    </div>

    <div class="body mt-4 col-lg-6 p-0">
      <div class="form-group">
        <label for="todo" class="form-label">Activity</label>
        <input type="text" class="form-control" v-model="state.activity">
        <button type="submit" class="btn btn-primary mt-3" @click.prevent="handleAddActivity">Add Activity</button>
      </div>

      <div class="card mt-4">
        <div class="card-header">
          Activity List
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex align-items-center justify-content-between"
              v-for="activity in state.activities"
              :key="activity.id">
            <div class="data-wrapper">
              {{ activity.title }}
            </div>

            <div class="btn-wrapper">
              <button type="button" class="btn" @click.prevent="handleDeleteActivity(activity.id)">
                <IconTrash/>
              </button>
              <button type="button" class="btn" @click.prevent="handleUpdateActivity(activity.id)">
                <IconPencil/>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconTrash from "@/components/icons/IconTrash.vue"
import IconPencil from "@/components/icons/IconPencil.vue"
import {useSwal} from "@/use/useSwal"
import {onMounted, reactive} from "vue";
import {useApi} from "@/use/useApi";

const {Toast, Modal} = useSwal()
const {API} = useApi()

const state = reactive({
  activity: '',
  activities: []
})

const setData = () => {
  API.path('/activities')
      .get()
      .then((response) => {
        state.activities = response.data
      })
      .catch((e) => {
        Toast.Error(e.message)
      })
}

onMounted(setData)

const handleAddActivity = async () => {
  if (state.activity === '') {
    return Toast.Error('Field is Required')
  }

  try {
    const newActivity = {
      id: Math.floor(Math.random() * 9999),
      title: state.activity
    }

    API.path('/activities')
        .post(newActivity)
        .then(() => {
          state.activities = [...state.activities, newActivity]
          state.activity = ''

          return Toast.Success('Added Successfully')
        })
        .catch((e) => {
          return Toast.Error(e.message)
        })
  } catch (e) {
    return Toast.Error(e.message)
  }
}

const handleDeleteActivity = (id) => {
  Modal
      .Confirm({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
      })
      .Fire()
      .then(() => {
        try {
          const index = state.activities.findIndex((item) => item.id === id)

          API.path('/activities')
              .delete(id)
              .then(() => {
                state.activities.splice(index, 1)
                Toast.Success('Deleted Successfully')
              })
              .catch((e) => {
                return Toast.Error(e.message)
              })
        } catch (e) {
          return Toast.Error(e.message)
        }
      })
      .catch((e) => {
        return Toast.Error(e.message)
      })
}

const handleUpdateActivity = (id) => {
  const oldActivity = state.activities.find((item) => item.id === id)

  Modal
      .Custom({
        title: 'Update Activity',
        input: 'text',
        inputValue: oldActivity.title,
        showCancelButton: true,
        preConfirm: (inputValue) => {
          if (inputValue === '') {
            Modal.validationMessage('Field is Required')
          }
        }
      })
      .Fire()
      .then((res) => {
        const updatedActivity = {
          id: oldActivity.id,
          title: res.value
        }

        API
            .path('/activities')
            .put(oldActivity.id, updatedActivity)
            .then(() => {
              const index = state.activities.findIndex((item) => item.id === id)

              state.activities[index] = updatedActivity
              Toast.Success('Updated Successfully')
            })
            .catch((e) => {
              Toast.Error(e.message)
            })
      })
}
</script>

<style scoped>
.list-group {
  height: 400px;
  overflow: scroll;
}

@media (max-width: 768px) {
  .col-lg-6 {
    width: 100%;
  }
}
</style>