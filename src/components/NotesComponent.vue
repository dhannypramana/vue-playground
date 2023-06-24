<template>
  <main>
    <div class="d-flex flex-column align-items-center">
      <div class="d-flex justify-content-between align-items-center w-75">
        <h1 class="font-weight-bold text-dark">Notes</h1>
        <button class="btn" @click="handleAddNotes">
          <IconAdd/>
        </button>
      </div>
    </div>

    <hr class="bg-dark">

    <div class="d-flex flex-wrap justify-content-center" v-if="!isNotesEmpty">
      <div class="col-lg-3 col-md-6 col-sm-12 mt-4" v-for="note in state.notes" :key="note.id">
        <CardComponent
            :note="note"
            @delete-notes="handleDeleteNotes"
            @updateNotes="handleUpdateNotes"
        />
      </div>
    </div>
    <div class="text-center mt-5" v-else>
      <h3>No notes found</h3>
    </div>
  </main>
</template>

<script setup>
import IconAdd from "@/components/icons/IconAdd.vue";
import CardComponent from "@/components/CardComponent.vue";
import {computed, onMounted, reactive} from "vue";
import {useSwal} from "@/use/useSwal";
import {useApi} from "@/use/useApi";

const {API} = useApi()
const {Toast, Modal} = useSwal();

const state = reactive({
  note: '',
  notes: []
})

const isNotesEmpty = computed(() => state.notes.length === 0)

const setData = async () => {
  await API
      .path('/notes')
      .get()
      .then((response) => {
        state.notes = response.data
      })
}

onMounted(setData)

const dateNow = () => {
  return new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
  })
}

const handleAddNotes = () => {
  Modal
      .Custom({
        title: 'Add new Notes',
        html: `
                <div class="form-group">
                    <textarea class="form-control shadow-none" id="note" rows="5"></textarea>
                </div>
        `,
        preConfirm() {
          const note = document.querySelector('#note').value

          if (!note) {
            return Modal.validationMessage('Field is Required')
          }

          return {
            note
          }
        }
      })
      .Fire()
      .then((res) => {
        const newNotes = {
          id: Math.floor(Math.random() * 9999),
          note: res.value.note,
          createdAt: dateNow()
        }

        API
            .path('/notes')
            .post(newNotes)
            .then(() => {
              state.notes = [...state.notes, newNotes]
              Toast.Success('Added Successfully')
            })
            .catch((e) => {
              Toast.Error(e.message)
            })
      })
}

const handleDeleteNotes = (id) => {
  API
      .path('/notes')
      .delete(id)
      .then(() => {
        const deletedNotesIndex = state.notes.findIndex((v) => v.id === id)
        state.notes.splice(deletedNotesIndex, 1)

        Toast.Success('Deleted Successfully')
      })
      .catch((e) => {
        Toast.Error(e.message)
      })
}

const handleUpdateNotes = (updatedNote) => {
  API
      .path('/notes')
      .put(updatedNote.id, updatedNote)
      .then(() => {
        const updatedNotesIndex = state.notes.findIndex((item) => item.id === updatedNote.id)
        state.notes[updatedNotesIndex]  = updatedNote

        Toast.Success('Updated Successfully')
      })
      .catch((e) => {
        Toast.Error(e.message)
      })
}
</script>