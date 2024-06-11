<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const error = ref(null)

const authStore = useAuthStore()

const schema = toTypedSchema(
  z.object({
    name: z.string().min(3).max(100).optional(),
    email: z.string().email().optional(),
    password: z.string().min(3).max(15).optional(),
  })
)

const { errors, submitCount, defineField, handleSubmit } = useForm({
  validationSchema: schema,
})

const [name] = defineField('name')
const [email] = defineField('email')
const [password] = defineField('password')

const handlerSubmit = handleSubmit(async (values) => {
  const data = {}

  if (email.value) data.email = email.value
  if (name.value) data.name = name.value
  if (password.value) data.password = password.value

  try {
    await authStore.update(data)
    console.log(123)

    router.push('/auth')
  } catch (err) {
    error.value = err.response.data?.message ?? 'asd'
  }
})

// const { login } = await useAuth()
const router = useRouter()

const handleLogin = () => {}
</script>

<template>
  <form @submit.prevent="handlerSubmit">
    <input type="text" v-model="name" placeholder="Update name" />
    <p v-if="submitCount && errors.password" style="color: red">
      {{ errors.password }}
    </p>

    <input type="text" v-model="email" placeholder="Update email" />
    <p v-if="submitCount && errors.email" style="color: red">
      {{ errors.email }}
    </p>

    <input type="password" v-model="password" placeholder="Update password" />
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
