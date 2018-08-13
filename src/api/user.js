import {buildApiRequest as A,getApiUrl as G} from './init'

export default {
    login: (p,c) => A(p,'user/login','post',c),
    fetchStudentList: (p,c) => A(p,'relay/student/list','post',c)
}


