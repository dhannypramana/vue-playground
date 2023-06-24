import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },

    /**
     * Project's Route
     */
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/projects/counter',
      name: 'projects.counter',
      component: () => import('../components/CounterComponent.vue')
    },
    {
      path: '/projects/todo-list',
      name: 'projects.todoList',
      component: () => import('../components/TodoListComponent.vue')
    }

    ,{
      path: '/projects/notes',
      name: 'projects.notes',
      component: () => import('../components/NotesComponent.vue')
    },

    /**
     * Learn Route
     */
    {
      path: '/learn',
      name: 'learn',
      component: () => import('../views/LearnView.vue')
    },

    /**
     * Playground Route
     */
    {
      path: '/playground',
      name: 'playground',
      component: () => import('../views/PlaygroundView.vue')
    }
  ]
})

export default router
