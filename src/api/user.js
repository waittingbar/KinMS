import {buildApiRequest as A,getApiUrl as G} from './init'

export default {
    login: (p,c) => A(p,'user/login','post',c),

    // 学生列表
    fetchStudentList: (p,c) => A(p,'relay/student/list','get',c),

    // 班级列表
    fetchClassList: (p,c) => A(p,'relay/classroom/list','get',c),

}


