import Vue from 'vue'
import Router from 'vue-router'
import Personal from './personal'

Vue.use(Router)



let RouteList = [
  {
    path: '/',
    component: resolve => require(['~/views/Layout/App.vue'], resolve),
    meta: {
      title: '首页',
      keepAlive: false,
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        meta: {
          title: '首页',
          keepAlive: false
        },
        component: resolve => require(['~/views/Home/Index.vue'], resolve),
      },
      {
        path: '/student_Manage',
        name: 'StudentManage',
        meta: {
          title: '学生管理',
          keepAlive: false
        },
        component: resolve => require(['~/views/studentManage/index.vue'], resolve),
      },
      {
          path: '/student_Detail',
          name: 'StudentDetail',
          meta: {
              title: '学生详情',
              keepAlive: false
          },
          component: resolve => require(['~/views/studentManage/detail.vue'], resolve),
      },
      {
        path: '/class_manage',
        name: 'ClassManage',
        meta: {
          title: '班级管理',
          keepAlive: false
        },
        component: resolve => require(['~/views/classManage/index.vue'], resolve),
      },
      {
          path: '/class_Detail',
          name: 'ClassDetail',
          meta: {
              title: '班级详情',
              keepAlive: false
          },
          component: resolve => require(['~/views/classManage/detail.vue'], resolve),
      },
      {
        path: '/post_manage',
        name: 'PostManage',
        meta: {
          title: '接送人管理',
          keepAlive: false
        },
        component: resolve => require(['~/views/ContentManage/Index.vue'], resolve),
      },
      {
        path: '/user_manage',
        name: 'UserManage',
        meta: {
          title: '接送记录管理',
          keepAlive: true
        },
        component: resolve => require(['~/views/UserManage/Index.vue'], resolve),
      },
      {
        path: '/category_manage',
        name: 'CategoryManage',
        meta: {
          title: '系统管理',
          keepAlive: true
        },
        component: resolve => require(['~/views/CategoryManage/Index.vue'], resolve),
      },
      {
        path: '/role_manage',
        name: 'RoleManage',
        meta: {
          title: '角色列表',
          keepAlive: true
        },
        component: resolve => require(['~/views/PermissionManage/Role/Role.vue'], resolve),
      },
      {
        path: '/permission_list',
        name: 'PermissionList',
        meta: {
          title: '权限列表',
          keepAlive: true
        },
        component: resolve => require(['~/views/PermissionManage/Permission/Index.vue'], resolve),
      },
      //个人中心，可能有修改密码，头像修改等路由
      Personal.index,
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '后台登录',
      keepAlive: false
    },
    components: {
      blank: resolve => require(['~/views/Login/Login.vue'], resolve),
    }
  },

]


RouteList[0].children.push({
  path: '/build_code',
  name: 'BuildCode',
  meta: {
    title: '构建代码',
    keepAlive: true
  },
  component: resolve => require(['~/views/DevelopmentTool/Build.vue'], resolve),
});

export default new Router({routes: RouteList})


