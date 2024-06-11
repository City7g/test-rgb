<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const authStore = useAuthStore()
const router = useRouter()

const error = ref(null)

const schema = toTypedSchema(
  z.object({
    email: z.string().min(3),
    password: z.string().min(3).max(15),
  })
)

const { errors, submitCount, defineField, handleSubmit } = useForm({
  validationSchema: schema,
})

const [email] = defineField('email')
const [password] = defineField('password')

onMounted(() => {
  email.value = 'City7gor@gmail.com'
  password.value = 'sd4123123123'
})

const handlerSubmit = handleSubmit(async (values) => {
  error.value = null

  try {
    await authStore.login(values.email, values.password)

    await nextTick()

    router.push('/auth')
  } catch (err) {
    error.value = err.response.data?.message ?? 'Server error'
  }
})
</script>

<template>
  <form @submit.prevent="handlerSubmit">
    <input type="text" v-model="email" placeholder="Enter email" />
    <p v-if="submitCount && errors.email" style="color: red">
      {{ errors.email }}
    </p>

    <input type="password" v-model="password" placeholder="Enter password" />
    <p v-if="submitCount && errors.password" style="color: red">
      {{ errors.password }}
    </p>

    <button class="btn" type="submit">Login</button>

    <p v-if="error">{{ error }}</p>
  </form>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form p {
  color: red;
}
</style>
