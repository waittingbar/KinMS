<!--学生详情信息 create by Fitz-->
<template>
    <div class="detail-static-content">
        <div class="detail-static-form">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="姓名：">
                    <el-input disabled v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-input disabled v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="年龄：">
                    <el-input disabled v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="身份证：">
                    <el-input disabled v-model="form.userNo"></el-input>
                </el-form-item>
                <el-form-item label="班级：">
                    <el-input disabled v-model="form.classroomName"></el-input>
                </el-form-item>
                <el-form-item label="班主任姓名：">
                    <el-input disabled v-model="form.headmaster"></el-input>
                </el-form-item>
                <el-form-item label="紧急联系人：">
                    <el-input disabled v-model="form.contactsName"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input disabled v-model="form.contactsPhone"></el-input>
                </el-form-item>
                <el-form-item label="录入时间：">
                    <el-input disabled v-model="form.createTime"></el-input>
                </el-form-item>
                <el-form-item label="现居住地址：">
                    <el-input disabled v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="fz-table-content">
            <el-alert
                    title="接送人列表"
                    type="info"
                    class="detail-static-title"
                    center
                    :closable="false">
            </el-alert>
            <el-table
                    :data="tableData"
                    tooltip-effect="dark"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        align="center"
                        label="姓名"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        align="center"
                        label="关系"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="url"
                        align="center"
                        label="照片"
                        min-width="100">
                    <template slot-scope="scope">
                        <img :src="scope.row.url " class="photo-img" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="contactsPhone"
                        align="center"
                        label="联系电话"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="card"
                        align="center"
                        label="卡号"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        label="注册时间"
                        min-width="180">
                </el-table-column>
            </el-table>
        </div>
        <div class="detail-static-footer">
            <el-button @click="gobackToStuList">返回列表</el-button>
        </div>
    </div>
</template>

<script>
    import ToolBar from '~/components/ToolBar/ToolBar.vue';
    import HelpHint from '~/components/HelpHint/HelpHint.vue';
    export default {
        data() {
            return {
                id: this.$route.query.id,
                formLabelWidth: '120px',
                tableData: [],
                form: {}
            }
        },
        created() {
          this.getList();
        },
        methods: {
            getList() {
                //获取列表数据
                let id = this.id;
                 if(id){
                     this.$Api.fetchStudentDetail({id: id}, r => {
                         if(r.success){
                             const data = r.data.contactsManagerList;
                             this.tableData = data;
                             this.form= r.data;
                         }
                     });
                 }else {
                     this.$message.warning('必要的参数缺失，请返回列表页重新进入！')
                 }

            },
            gobackToStuList() {
                this.$router.push('student_manage');
            }
        },
        components: {
            ToolBar,HelpHint
        }
    }
</script>
