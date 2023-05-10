<script setup>
import { computed, reactive } from 'vue';
import AuthService from '@/services/auth.service.js'
import { useToast } from "vue-toastification";
import useVuelidate from '@vuelidate/core'
import { required, email, maxLength, helpers } from '@vuelidate/validators'

const toast = useToast();

const state = reactive({
    email: '',
    loading: false,
})

const rules = computed(() => ({
    email: {
        required: helpers.withMessage('Informe seu email', required),
        email: helpers.withMessage('Informe um email valido', email),
        maxLength: helpers.withMessage('O email deve conter um máximo e 120 dígitos', maxLength(120))
    }
}))

const v$ = useVuelidate(rules, state);

const forgotPassword = async () => {

    if (!await v$.value.$validate()) return

    state.loading = true
    AuthService.forgotPassword({ email: state.email }).then(r => {
        state.email = '';
        toast.success(r.data.status + " 👌")
    }).catch(error => {
        toast.error(error?.response?.data?.email + " ✋🏼")
    }).finally(() => state.loading = false)
}
</script>

<template>
    <div class="container col-xl-10 col-xxl-8 px-3 py-5">
        <div class="row align-items-center g-lg-5 py-5">
            <div class="col-md-10 mx-auto col-lg-5">
                <form class="p-1 mb-3" @submit.prevent="forgotPassword">
                    <h5 class="text-center mb-5">Recuperar Senha</h5>
                    
                    <div class="form-group mb-3">
                        <input type="text" class="form-control rounded" placeholder="Seu email" v-model="state.email">
                        <small class="form-text text-danger" v-if="v$.email.$error">
                            {{ v$.email.$errors[0].$message }}
                        </small>
                    </div>

                    <button type="submit" class="w-100 btn btn-primary mb-3 rounded">
                        <span v-if="state.loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <span v-else>Enviar</span>
                    </button>

                    <p class="mb-5 text-sm">
                        <router-link :to="{ name: 'auth.login' }" class="font-weight-bold float-start">
                            Entrar
                        </router-link>
                    </p>

                </form>
            </div>
        </div>
    </div>
</template>