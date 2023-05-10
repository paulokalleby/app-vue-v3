<script setup>
import { onBeforeMount } from 'vue'
import { useAuth } from '@/stores/auth.js'

const auth = useAuth();

onBeforeMount(() => {
    document.title = 'Vue Start'
})
</script>

<template>
    <nav class="navbar navbar-expand-xxl navbar-dark bg-dark fixed-top border-bottom py-3"
        aria-label="Seventh navbar example">
        <div class="container-fluid">
            <router-link :to="{ name: 'home' }" class="navbar-brand">Dashboard</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navabarCollapse"
                aria-controls="navabarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navabarCollapse">
                <ul class="navbar-nav ms-auto mb-2 mb-xl-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link">
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="d-block nav-link dropdown-toggle"
                            href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="far fa-user"></i> {{ auth.user.name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><router-link :to="{ name: 'profile'}" class="dropdown-item">Perfil</router-link></li>
                            <li><a class="dropdown-item" href="#" @click.prevent="auth.logout()">Sair</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container py-3 px-lg-5">
        <router-view></router-view>
    </div>
</template>