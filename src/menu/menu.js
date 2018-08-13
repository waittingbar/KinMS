let menu = {};

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
menu.home = {
  name: '首页',
  path: '/',
  icon: 'fa fa-tachometer',
};


/**
 * 学生管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.font_icon = {
  name: '学生管理',
  icon: 'fa fa-th',
  children: {}
};
let icon = menu.font_icon.children;

icon.font_awesome = {
  name: '学生列表',
  path: '/student_manage',

};
icon.element_icon = {
  name: '新增学生',
  path: '/student_add',
};

/**
 * 班级管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.content_manage = {
  name: '班级管理',
  icon: 'fa fa-file-text-o',
  children: {}
};

let ContentManage = menu.content_manage.children;

ContentManage.post = {
  name: '班级列表',
  path: '/post_manage',
};
ContentManage.add = {
  name: '新增班级',
  path: '/class_add',
};

/**
 * 接送人管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.user_manage = {
  name: '接送人管理',
  icon: 'fa fa-user-circle-o',
  children: {}
};
let UserManage = menu.user_manage.children;

UserManage.user = {
  name: '接送人列表',
  path: '/user_manage',
};


/**
 * 接送记录管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.category_manage = {
  name: '接送记录管理',
  icon: 'fa fa-sitemap',
  children: {}
};
let CategoryManage = menu.category_manage.children;

CategoryManage.daoxiao = {
  name: '今日到校记录',
  path: '/category_manage',
};
CategoryManage.lixiao = {
  name: '今日离校记录',
  path: '/category_manage',
};
CategoryManage.jiesong = {
  name: '接送历史记录',
  path: '/category_manage',
};



menu.permission_manage = {
  name: '系统管理',
  icon: 'fa fa-qrcode',
  children: {}
};
let PermissionManage = menu.permission_manage.children;

PermissionManage.role = {
  name: '帐号列表',
  path: '/role_manage',
};

PermissionManage.permission = {
  name: '新增帐号',
  path: '/permission_list',
};

export default menu;

// if(__DEV__){
//
//   menu.development_tools = {
//     name: '开发工具',
//     icon: 'fa fa-wrench',
//     children: {}
//   };
//
//   let DevelopmentTools = menu.development_tools.children;
//
//   DevelopmentTools.code = {
//     name: '构建代码',
//     path: '/build_code',
//   };
//
// }
