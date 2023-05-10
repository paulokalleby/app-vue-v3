import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/stores/auth.js";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  routes: [
    // Auth Routes
    {
      path: "/auth/login",
      name: "auth.login",
      component: () => import("@/views/auth/LoginPage.vue"),
    },
    {
      path: "/auth/register",
      name: "auth.register",
      component: () => import("@/views/auth/RegisterPage.vue"),
    },
    {
      path: "/auth/forgot-password",
      name: "auth.forgot.password",
      component: () => import("@/views/auth/ForgotPasswordPage.vue"),
    },
    {
      path: "/auth/reset-password/:token",
      name: "auth.reset.password",
      component: () => import("@/views/auth/ResetPasswordPage.vue"),
      props: true,
    },

    //Dashboard Routes
    {
      path: "/",
      component: () => import("@/layouts/DefaultLayout.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/HomePage.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("@/views/ProfilePage.vue"),
        },
      ],
      meta: { auth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/error/PageNotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta?.auth) {
    const auth = useAuth();
    if (auth.token && auth.user) {
      const isAuthenticated = await auth.checkToken();
      if (isAuthenticated) next();
      else next({ name: "auth.login" });
    } else {
      next({ name: "auth.login" });
    }
  } else {
    next();
  }
});

export default router;
