<script setup>
import { reactive, onMounted } from 'vue';
import AuthService from '@/services/auth.service'
import PreLoader from '@/components/PreLoader.vue'

onMounted(async () => {
    getMe()
})

const state = reactive({
    profile: {},
    edit: false,
    loading: false
})

const getMe = async () => {
    state.loading = true
    AuthService.me().then(r => {
        state.profile = r.data.data;
    }).finally(() => state.loading = false)
}
</script>

<template>
    <PreLoader :show="state.loading" />
    <div class="row mb-4">
        <div class="col-12">
            <h3>Perfil</h3>
        </div>
    </div>
    <div class="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Nome:</label>
        <div class="col-sm-4">
            <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="state.profile.name">
        </div>
    </div>
    <div class="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Email:</label>
        <div class="col-sm-4">
            <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="state.profile.email">
        </div>
    </div>
</template>