<!--班级管理列表 create by Fitz-->
<template>
    <div>
        <ToolBar>
            <el-button type="danger" @click="delBtn" icon="el-icon-delete" size="small">批量删除</el-button>
            <el-button type="primary" @click="studentEditBtn(1)" icon="el-icon-plus" size="small">新增班级</el-button>
            <div style="float: right">
                <el-input
                        placeholder="班级名称"
                        size="small"
                        style="width: 140px"
                        v-model="searchParams.classroomName"
                        clearable>
                </el-input>
                <el-input
                        placeholder="班主任姓名"
                        size="small"
                        style="width: 140px"
                        v-model="searchParams.headmaster"
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
                        prop="classroomName"
                        align="center"
                        label="班级名称"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="headmaster"
                        align="center"
                        label="班主任姓名"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="headmasterPhone"
                        align="center"
                        label="班主任联系电话"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="num"
                        align="center"
                        label="班级人数"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        label="创建时间"
                        min-width="200">
                </el-table-column>
                <el-table-column
                        label="操作"
                        :render-header="tableAction"
                        align="center"
                        fixed="right"
                        min-width="150">
                    <template slot-scope="scope">
                        <el-button @click="studentEditBtn(0, scope.row)" type="primary" icon="el-icon-edit" size="small" circle></el-button>
                        <el-button @click="goClassDetail(scope.row.id)" type="info" icon="el-icon-info" size="small" circle></el-button>
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
                width="750px"
                center
                :close-on-click-modal = false
                :close-on-press-escape = false
                :visible.sync="ModalEdit">
            <el-form :model="form" :rules="rules" ref="ruleForm" class="dialog-from-700">
                <el-form-item prop="name" label="班级名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.classroomName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="age" label="班主任姓名：" :label-width="formLabelWidth">
                    <el-input v-model="form.headmaster" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="userNo" label="班主任联系电话：" :label-width="formLabelWidth">
                    <el-input v-model="form.headmasterPhone" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ModalEdit = false">取 消</el-button>
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
                    classroomName: undefined,
                    headmaster: undefined
                },
                form: {
                    classroomName: '',
                    headmaster: '',
                    headmasterPhone: '',
                },
                formLabelWidth: '150px',
                ModalEdit: false,
                multipleSelection: [],
                tableData: [],
                rules: {
                    headmaster: [
                        { required: true, message: '请填写班主任姓名', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    classroomName: [
                        { required: true, message: '请填写班级名称', trigger: 'blur' }
                    ],
                    headmasterPhone: [
                        { required: true, message: '请填写班主任联系电话', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
          this.getList();
        },
        methods: {
            getList() {
                //获取列表数据
                  this.$Api.fetchClassList(this.searchParams, r => {
                     if(r.success){
                         const data = r.data.list;
                         this.tableData = data;
                         this.total = r.data.total;
                     }
                  });
            },
            handleClick(row) {
                this.$alert(row, '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                });
            },
            searchBtn() {
             // 搜索提交
                let slef = this;
                slef.searchParams.pageNum = 1
                let name = slef.searchParams.classroomName;
                let master = slef.searchParams.headmaster;
                console.log(name)
                if(!name){

                    slef.searchParams.classroomName = undefined
                }
                if(!master){
                    slef.searchParams.headmaster = undefined
                }
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
                    this.$Api.fetchClassDel(data, r => {
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
                        content:'编辑 / 学生信息'
                    }
                },'操作');
            },
            goClassDetail(id){
                //跳转到班级详情页面
                this.$router.push({ path:'class_Detail', query: {id: id}})
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
                    this.form.classroomName = '';
                    this.form.headmaster = '';
                    this.form.headmasterPhone = '';
                    this.modalTitle = '新增班级信息';
                    this.modalType = true;
                }else {
                    this.form.id = val.id;
                    this.form.classroomName = val.classroomName;
                    this.form.headmaster = val.headmaster;
                    this.form.headmasterPhone = val.headmasterPhone;
                    this.modalTitle = '编辑班级信息';
                    this.modalType = false;
                }
                console.log(val)
                this.ModalEdit = true;
            },
            submitForm(form) {
                // 提交表单
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let msg = '';
                        if(this.modalType) {
                            msg = '新增成功！'
                        }else {
                            msg = '编辑成功！'
                        }
                        this.$Api.fetchClassUpdate(this.form, r => {
                            if(r.success) {
                                let self = this;
                                self.$notify({
                                    title: '成功',
                                    message: msg,
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
