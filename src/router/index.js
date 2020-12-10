import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import OrgList from '../views/org-management/OrgList'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'Admin',
            component: Main,
            redirect: '/organization',
            children: [
              {
                path:'/organization',
                name:'机构管理',
                leaf: true,
                iconClass:'icon-yingyong',
                meta:{
                  active:'/organization'
                },
                component:OrgList,
              }
            ]
        }
    ]
})

export default router
