import {buildApiRequest as A,getApiUrl as G} from './init'

export default {
    login: (p,c) => A(p,'user/login','post',c),

    // ============================================================
    // 系统账号列表
    fetchManageList: (p,c) => A(p,'/relay/manager/list','get',c),

    // 新增账号
    fetchManageAdd: (p,c) => A(p,'/relay/manager/add','get',c),

    // 修改账号
    fetchManageUpdate: (p,c) => A(p,'/relay/manager/update','get',c),

    // 删除账号
    fetchManageDelete: (p,c) => A(p,'/relay/manager/delete','get',c),

    // 修改账号状态
    fetchManageUpdateStatus: (p,c) => A(p,'/relay/manager/updateStatus','get',c),

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


    // ============================================================
    // 获取关系信息
    fetchTypeList: (p,c) => A(p,'relayApi/comm/relativesType','get',c),

    // ============================================================
    // 接送人列表
    fetchRelayList: (p,c) => A(p,'relay/contactsManager/list','get',c),

    // 接送人编辑
    fetchRelayUpdate: (p,c) => A(p,'relay/contactsManager/update','get',c),

    // 接送人删除
    fetchRelayDelete: (p,c) => A(p,'relay/contactsManager/delete','get',c),


    // ============================================================
    // 接送记录管理

    // 今日 到校/离校记录 type: 0 今日到校； type：1  今日离校
    fetchRecordTodayList: (p,c) => A(p,'relay/record/todayList','get',c),

    // 接送历史记录
    fetchRecordHistoryList: (p,c) => A(p,'relay/record/list','get',c),

    // 删除接送历史记录
    fetchRecordListDel: (p,c) => A(p,'relay/record/delete','get',c),
}


