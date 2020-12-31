import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/main'
import OrgList from '../views/org-manage/org-list'
import SubSysList from '../views/subsys-manage/subsys-list'
import UserList from '../views/user-manage/user-list'
import RoleList from '../views/role-manage/role-list'

Vue.use(Router);

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
                //iconClass:'icon-yingyong',
                meta:{
                  active:'/organization'
                },
                component:OrgList,
              },
              {
                path:'/subsystem',
                name:'子系统管理',
                leaf: true,
                meta:{
                  active:'/subsystem'
                },
                component:SubSysList,
              },
              {
                path:'/user',
                name:'用户管理',
                leaf: true,
                meta:{
                  active:'/user'
                },
                component:UserList,
              },
              {
                path:'/role',
                name:'角色管理',
                leaf: true,
                meta:{
                  active:'/role'
                },
                component:RoleList,
              }
            ]
        }
    ]
});

export default router
