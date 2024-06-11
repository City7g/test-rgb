<script setup lang="ts">
const form = ref(null)

const router = useRouter()

const handlerSubmit = async () => {
  const formData = new FormData()

  const fileSome = form.value.querySelector('input[type="file"]')
  console.log(fileSome.files[0])

  const blob = new Blob([fileSome.files[0]], {
    type: fileSome.files[0].type,
  })

  console.log(blob)

  formData.append('avatar', blob, fileSome.files[0].name)

  try {
    await instance.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    router.push('/files')
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <form
    ref="form"
    @submit.prevent="handlerSubmit"
    enctype="multipart/form-data"
  >
    <input
      name="avatar"
      type="file"
      accept="application/pdf, application/vnd.ms-excel"
    />

    <button class="btn">Send</button>
  </form>
</template>

<style lang="scss">
input {
  width: 100%;
  padding: 20px;
  border: 1px dotted #39b100;
  border-radius: 4px;

  &::file-selector-button {
    font-size: 16px;
    font-family: 'Circe';
    padding: 3px 10px;
    border-radius: 4px;
    color: white;
    border: none;
    background-color: #39b100;
    margin-right: 10px;
  }
}
</style>
