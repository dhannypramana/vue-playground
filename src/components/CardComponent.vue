<template>
  <div class="card text-white bg-gray-600 mb-3 w-100">
    <div class="d-flex justify-content-end p-2">
      <button class="btn" @click="updateNotes">
        <IconPencil/>
      </button>
      <button class="btn" @click="deleteNotes">
        <IconClose/>
      </button>
    </div>
    <div class="card-body overflow-auto">
      <p class="card-text">{{ props.note.note }}</p>
    </div>
    <div class="card-footer bg-gray-600 border-top-0">
      <p class="card-text">{{ props.note.createdAt }}</p>
    </div>
  </div>
</template>

<script setup>
import IconClose from "@/components/icons/IconClose.vue";
import IconPencil from "@/components/icons/IconPencil.vue";
import {useSwal} from "@/use/useSwal";

const {Modal} = useSwal()
const props = defineProps(['note'])
const emits = defineEmits(['delete-notes', 'update-notes'])

const deleteNotes = () => {
  Modal
      .Confirm({
        title: 'Hapus catatan?',
        text: 'Catatan yang dihapus tidak dapat dikembalikan!'
      })
      .Fire()
      .then(() => {
        emits('delete-notes', props.note.id)
      })
}

const updateNotes = () => {
  Modal
      .Custom({
        title: 'Update note',
        html: `
              <div class="form-group">
                  <textarea class="form-control shadow-none" id="note" rows="5">${props.note.note}</textarea>
              </div>
        `,
        preConfirm: () => {
          const note = document.querySelector('#note').value

          if (!note) {
            Modal.validationMessage('Field is Required')
          }

          return {
            note
          }
        }
      })
      .Fire()
      .then((res) => {
        const updatedNotes = {
          id: props.note.id,
          note: res.value.note,
          createdAt: props.note.createdAt
        }

        emits('update-notes', updatedNotes)
      })
}
</script>

<style scoped>
.card {
  height: 250px;
}
</style>