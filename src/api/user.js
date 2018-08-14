import {buildApiRequest as A,getApiUrl as G} from './init'

export default {
    login: (p,c) => A(p,'user/login','post',c),

    // ============================================================
    // 学生列表
    fetchStudentList: (p,c) => A(p,'relay/student/list','get',c),

    // 新增学生
    fetchStudentAdd: (p,c) => A(p,'relay/student/add','post',c),

    // 修改学生信息
    fetchStudentUpdate: (p,c) => A(p,'relay/student/update','post',c),

    // 学生详情
    fetchStudentDetail: (p,c) => A(p,'relay/student/detail','get',c),

    // 删除学生信息
    fetchStudentDel: (p,c) => A(p,'relay/student/delete','get',c),


    // ============================================================
    // 班级列表
    fetchClassList: (p,c) => A(p,'relay/classroom/list','get',c),

    // 新增/编辑班级
    fetchClassUpdate: (p,c) => A(p,'relay/classroom/addAndUpdate','get',c),

    // 删除班级
    fetchClassDel: (p,c) => A(p,'relay/classroom/delete','get',c),

    // 班级详情
    fetchClassDetail: (p,c) => A(p,'relay/classroom/detail','get',c),

    // 通过班级查询学生
    fetchStudentByClass: (p,c) => A(p,'relay/classroom/studentListById','get',c),
}


