<!--班级详情信息 create by Fitz-->
<template>
    <div class="detail-static-content">
        <div class="fz-table-content">
            <el-alert
                    :title="tableTitle"
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
                        label="学生姓名"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="age"
                        align="center"
                        label="学生年龄"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        align="center"
                        label="性别"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="userNo"
                        align="center"
                        label="身份证号"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="parentNum"
                        align="center"
                        label="接送人人数"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        label="报名时间"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        fixed="right"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-button  size="mini" @click="openContact(scope.row.id)" type="primary" >查看接送人</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="detail-static-footer">
            <el-button @click="gobackToStuList">返回列表</el-button>
        </div>
        <el-dialog
                title="接送人列表"
                width="800px"
                center
                :visible.sync="modalTableTitle">
            <div class="modal-table-content">
                <el-table
                        :data="contactData"
                        tooltip-effect="dark"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            align="center"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="typeName"
                            align="center"
                            label="关系">
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
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="card"
                            align="center"
                            label="卡号">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            align="center"
                            label="注册时间"
                            min-width="130">
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ToolBar from '~/components/ToolBar/ToolBar.vue';
    import HelpHint from '~/components/HelpHint/HelpHint.vue';
    export default {
        data() {
            return {
                modalTableTitle: false,
                id: this.$route.query.id,
                formLabelWidth: '120px',
                tableTitle: '',
                tableData: [],
                contactData: [],
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
                     this.$Api.fetchStudentByClass({id: id}, r => {
                         if(r.success){
                             const data = r.data.studentList;
                             this.tableData = data;
                             this.form= r.data;
                             this.tableTitle = r.data.classroomName + '学生信息' + '（ 班主任：' + r.data.headmaster +' ）'
                         }
                     });
                 }else {
                     this.$message.warning('必要的参数缺失，请返回列表页重新进入！')
                 }

            },
            openContact(id) {
              // 查看接送人
                if(id){
                    this.$Api.fetchStudentDetail({id: id}, r => {
                        if(r.success){
                            const data = r.data.contactsManagerList;
                            this.contactData = data;
                            this.modalTableTitle = true;
                        }
                    });
                }else {
                    this.$message.warning('必要的参数缺失，请返回列表页重新进入！')
                }

            },
            gobackToStuList() {
                this.$router.push('class_manage');
            }
        },
        components: {
            ToolBar,HelpHint
        }
    }
</script>
