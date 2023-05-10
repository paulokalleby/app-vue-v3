<script setup >
import AuthService from '@/services/auth.service.js'
import { useAuth } from '@/stores/auth.js'
import { useRouter } from 'vue-router'
import { computed, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'

const toast  = useToast();
const auth   = useAuth();
const router = useRouter()

const state = reactive({
    email: '',
    password: '',
    passwordFieldType: 'password',
    loading: false,
})

const rules = computed(() => ({
    email: {
        required: helpers.withMessage('Informe seu email', required),
        email: helpers.withMessage('Informe um email valido', email),
        maxLength: helpers.withMessage('O email deve conter um máximo e 120 dígitos', maxLength(120))
    },
    password: {
        required: helpers.withMessage('Informe sua senha', required),
        minLength: helpers.withMessage('A senha deve conter um mínimo de 8 dígitos', minLength(8)),
        maxLength: helpers.withMessage('A senha deve conter um máximo de 16 dígitos', maxLength(16)),
    }
}))

const v$ = useVuelidate(rules, state);

const switchVisibility = () => state.passwordFieldType = state.passwordFieldType === "password" ? "text" : "password"

const logIn = async () => {

    if (!await v$.value.$validate()) return

    state.loading = true

    AuthService.login({ email: state.email, password: state.password, device: 'http-vue' }).then(r => {
        auth.setToken(r.data.token);
        auth.setUser(r.data.data);
        router.push({ name: 'home' })
        toast.success(`Olá ${ r.data.data.name }, bem vindo! 🎉`)
    }).catch(error => {
        toast.error(error?.response?.data?.message+ " ✋🏼")
    }).finally(() => state.loading = false)
}
</script>

<template>
    <div class="container col-xl-10 col-xxl-8 px-3 py-5">
        <div class="row align-items-center g-lg-5 py-5">
            <div class="col-md-10 mx-auto col-lg-5">
                <form class="p-1 mb-3" @submit.prevent="logIn">
                    <h5 class="text-center mb-5">Entrar</h5>

                    <div class="form-group mb-3">
                        <input type="text" class="form-control rounded" placeholder="Email" v-model="state.email">
                        <small class="form-text text-danger" v-if="v$.email.$error">
                            {{ v$.email.$errors[0].$message }}
                        </small>
                    </div>
                    
                    <div class="form-group mb-3">
                        <input class="form-control rounded" v-model="state.password" :type="state.passwordFieldType"
                            autocomplete="on" placeholder="Senha">
                        <small class="form-text text-danger" v-if="v$.password.$error">
                            {{ v$.password.$errors[0].$message }}
                        </small>
                    </div>
                    
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" @change="switchVisibility">
                        <label class="form-check-label" for="show-password">Mostrar senha</label>
                    </div>
                    
                    <button type="submit" class="w-100 btn btn-primary mb-3 rounded">
                        <span v-if="state.loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span v-else>Entrar</span>
                    </button>
                
                    <p class="mb-5 text-sm">
                        <router-link :to="{ name: 'auth.forgot.password' }"
                            class="font-weight-bold float-start">
                            Esqueceu a senha?
                        </router-link>

                        <router-link :to="{ name: 'auth.register' }"
                            class="font-weight-bold float-end">
                            Registre-se
                        </router-link>
                    </p>

                </form>
            </div>
        </div>
    </div>
</template>
