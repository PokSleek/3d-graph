import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main/Main.vue'
import Scatter from '@/pages/Scatter/Main.vue'
import LightningChart from '@/pages/LightningChart/Main.vue'
import LightningChartBar from '@/pages/LightningChartBar/Main.vue'
import PointCluster from '@/pages/PointCluster/PointCluster.vue'
import SurfaceChart from '@/pages/SurfaceChart/SurfaceChart.vue'
import { ROUTES } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.home.path,
      name: ROUTES.home.name,
      component: Main
    },
    {
      path: ROUTES.scatter.path,
      name: ROUTES.scatter.name,
      component: Scatter
    },
    {
      path: ROUTES.lc.path,
      name: ROUTES.lc.name,
      component: LightningChart
    },
    {
      path: ROUTES.lcBar.path,
      name: ROUTES.lcBar.name,
      component: LightningChartBar
    },
    {
      path: ROUTES.cluster.path,
      name: ROUTES.cluster.name,
      component: PointCluster,
    },
    {
      path: ROUTES.surface.path,
      name: ROUTES.surface.name,
      component: SurfaceChart,
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: ROUTES.home.name }
    }
  ]
})

export default router
