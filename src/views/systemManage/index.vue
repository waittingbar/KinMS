<!--账号列表 create by Fitz-->
<template>
    <div>
        <ToolBar>
            <el-button type="danger" @click="delBtn" icon="el-icon-delete" size="small">批量删除</el-button>
            <el-button type="primary" @click="studentEditBtn(1)" icon="el-icon-plus" size="small">新增账号</el-button>
            <div style="float: right">
                <el-input
                        placeholder="账号"
                        size="small"
                        style="width: 140px"
                        v-model="searchParams.userName"
                        clearable>
                </el-input>
                <el-button type="success" icon="el-icon-search" size="small" @click="searchBtn"></el-button>
            </div>
        </ToolBar>
        <div class="fz-table-content">
            <el-table
                    :data="tableData"
                    ref="multipleTable"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    border
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        align="center"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        align="center"
                        label="账号"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="nickName"
                        align="center"
                        label="昵称"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="status"
                        align="center"
                        label="状态"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-tag v-show="scope.row.status === 1" type="danger" size="medium">禁用</el-tag>
                        <el-tag v-show="scope.row.status === 0" type="success" size="medium">启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        label="创建时间"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        label="操作"
                        :render-header="tableAction"
                        align="center"
                        fixed="right"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-button @click="studentEditBtn(0, scope.row)" type="primary" size="small">编辑</el-button>
                        <el-button v-show="scope.row.status === 0" @click="optionBtn(scope.row.id, 0)" type="danger" size="small">禁用</el-button>
                        <el-button v-show="scope.row.status === 1" @click="optionBtn(scope.row.id, 1)" type="success" size="small">启用</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-pagination-content">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                    :current-page=this.searchParams.pageNum
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=this.searchParams.pageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=this.total>
            </el-pagination>
        </div>
        <el-dialog
                :title="modalTitle"
                width="700px"
                center
                :close-on-click-modal = false
                :close-on-press-escape = false
                :visible.sync="studentEdit">
            <el-form :model="form" :rules="rules" ref="ruleForm" class="dialog-from-600">
                <el-form-item prop="userName" label="账号：" :label-width="formLabelWidth">
                    <el-input :disabled="!modalType" v-model="form.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="nickName" label="昵称：" :label-width="formLabelWidth">
                    <el-input v-model="form.nickName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" :label="modalType ? '密码：' : '新密码：'" :label-width="formLabelWidth">
                    <el-input v-model="form.password" type="password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认密码：" :label-width="formLabelWidth">
                    <el-input v-model="form.confirmPassword" type="password" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="studentEdit = false">取 消</el-button>
                <el-button type="primary"  @click="submitForm('ruleForm')">保 存</el-button>
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
                total: 0,
                modalTitle: '',
                modalType: true, // 新增: true; 编辑：false
                searchParams:{
                    pageNum: 1,
                    pageSize: 10,
                    userName: undefined,
                },
                form: {
                    userName: '',
                    nickName: '',
                    password: '',
                    confirmPassword: '',
                },
                formLabelWidth: '120px',
                studentEdit: false,
                multipleSelection: [],
                tableData: [],
                classList: [], // 班级列表数据
                rules: {
                    userName: [
                        { required: true, message: '请填写账号名', trigger: 'blur' },
                    ],
                    nickName: [
                        { required: true, message: '请填写昵称', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写登录密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                    ],
                    confirmPassword: [
                        { required: true, message: '请确认登录密码', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
          this.getList();
//          setTimeout(this.getClassList(), 1000)
        },
        methods: {
            getList() {
                //获取列表数据
                  this.$Api.fetchManageList(this.searchParams, r => {
                     if(r.success){
                         const data = r.data.list;
                         this.tableData = data;
                         this.total = r.data.total;
                     }
                  });
//                 this.$Api.fetchClassList(this.searchParams, r => {
//                    console.log(r)
//                 });
            },
//            getClassList() {
//              // 获取班级列表
//                this.$Api.fetchClassList({pageSize: 100}, r => {
//                    if(r.success){
//                        const data = r.data.list;
//                        this.classList = data;
//                    }
//                });
//            },

            handleClick(row) {
                this.$alert(row, '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                });
            },
            searchBtn() {
             // 搜索提交
                this.searchParams.pageNum = 1
                this.getList()

            },
            delBtn() {
                // 批量删除
                let mult = this.multipleSelection;
                if(mult && mult.length) {
                    let str = ''
                    for(let i=0, c=mult.length; i<c; i++) {
                        str += mult[i].id + ','
                    }
                    const data = {
                        ids: str.substring(0, str.length -1)
                    }
                    this.$Api.fetchManageDelete(data, r => {
                        if(r.success) {
                            let self = this;
                            self.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success'
                            });
                            self.ModalEdit = false;
                            self.getList();
                        }else {
                            this.$notify({
                                title: '失败',
                                message: r.message,
                                type: 'error'
                            });
                        }
                    });
                }else {
                    this.$message.warning('请至少选择一条数据！')
                }
            },
            tableAction(){
                return this.$createElement('HelpHint',{
                    props:{
                        content:'编辑 / 变更状态'
                    }
                },'操作');
            },
            optionBtn(id, s){
                //修改账号状态
                if(id) {
                    let statusTxt = '';
                    let data = {
                        id: id,
                    };
                    if(s === 0) {
                        // 当前为启用
                        statusTxt = '禁用成功！';
                        data.status = 1;
                    }else {
                        // 当前为禁用
                        statusTxt = '启用成功！';
                        data.status = 0;
                    }
                    this.$Api.fetchManageUpdateStatus(data, r => {
                        if(r.success) {
                            let self = this;
                            self.$notify({
                                title: '成功',
                                message: statusTxt,
                                type: 'success'
                            });
                            self.getList();
                        }else {
                            this.$notify({
                                title: '失败',
                                message: r.message,
                                type: 'error'
                            });
                        }
                    });
                }
            },
            handleSizeChange(val) {
                this.searchParams.pageSize = val;
                this.getList()
            },
            handleCurrentChange(val) {
                this.searchParams.pageNum = val;
                this.getList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            studentEditBtn(el, val) {
                if(el) {
                    // 新增
                    this.$nextTick(() => {
                        this.$refs['ruleForm'].resetFields()
                    })
                    this.form.id = undefined;
                    this.form.userName = '';
                    this.form.nickName = '';
                    this.form.password = '';
                    this.form.confirmPassword = '';
                    this.modalTitle = '新增账号信息';
                    this.modalType = true;
                }else {
                    this.form.id = val.id;
                    this.form.userName = val.userName;
                    this.form.nickName = val.nickName;
                    this.form.password = '';
                    this.form.confirmPassword = '';
                    this.modalTitle = '编辑账号信息';
                    this.modalType = false;
                }
                console.log(val)
                this.studentEdit = true;
            },
            submitForm(form) {
                // 提交表单
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        if(this.modalType) {
                            // 新增的提交
                            this.$Api.fetchManageAdd(this.form, r => {
                                if(r.success) {
                                    let self = this;
                                    self.$notify({
                                        title: '成功',
                                        message: '新增成功！',
                                        type: 'success'
                                    });
                                    self.studentEdit = false;
                                    self.getList();
                                }else {
                                    this.$notify({
                                        title: '失败',
                                        message: r.message,
                                        type: 'error'
                                    });
                                }
                            });
                        }else {
                            // 编辑的提交
                            this.$Api.fetchManageUpdate(this.form, r => {
                                if(r.success){
                                    let self = this;
                                    self.$notify({
                                        title: '成功',
                                        message: '编辑成功！',
                                        type: 'success'
                                    });
                                    self.studentEdit = false;
                                    self.getList();
                                }else {
                                    this.$notify({
                                        title: '失败',
                                        message: r.message,
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        components: {
            ToolBar,HelpHint
        }
    }
</script>
