<!--学生管理列表 create by Fitz-->
<template>
    <div>
        <ToolBar>
            <el-button type="danger" @click="delBtn" icon="el-icon-delete" size="small">批量删除</el-button>
            <el-button type="primary" @click="studentEditBtn(1)" icon="el-icon-plus" size="small">新增学生</el-button>
            <div style="float: right">
                <el-select v-model="searchParams.classroomId" size="small" clearable placeholder="班级名称" style="width: 230px">
                    <el-option
                            v-for="item in this.classList"
                            :key="item.id"
                            :label="item.classroomName +'  -（班主任：'+ item.headmaster +'）'"
                            :value="item.id">
                    </el-option>
                </el-select>
                <el-input
                        placeholder="学生姓名"
                        size="small"
                        style="width: 140px"
                        v-model="searchParams.name"
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
                        prop="name"
                        align="center"
                        label="学生姓名"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        align="center"
                        label="性别"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="age"
                        align="center"
                        label="年龄"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="classroomName"
                        align="center"
                        label="所在班级"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="contactsName"
                        align="center"
                        label="紧急联系人"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="contactsPhone"
                        align="center"
                        label="联系电话"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        label="录入时间"
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
                        <el-button @click="goDetails(scope.row.id)" type="info" icon="el-icon-info" size="small" circle></el-button>
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
                :visible.sync="studentEdit">
            <el-form :model="form" :rules="rules" ref="ruleForm" class="dialog-from-700">
                <el-form-item prop="name" label="学生姓名：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="age" label="年龄：" :label-width="formLabelWidth">
                    <el-input v-model="form.age" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="classroomName" label="班级：" :label-width="formLabelWidth">
                    <el-select v-model="form.classroomId" placeholder="请选择班级">
                        <el-option
                                v-for="item in this.classList"
                                :key="item.id"
                                :label="item.classroomName +'  -（班主任：'+ item.headmaster +'）'"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="sex" label="性别：" :label-width="formLabelWidth">
                    <el-radio v-model="form.sex" label="男">男</el-radio>
                    <el-radio v-model="form.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item prop="userNo" label="身份证号：" :label-width="formLabelWidth">
                    <el-input v-model="form.userNo" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="contactsName" label="紧急联系人：" :label-width="formLabelWidth">
                    <el-input v-model="form.contactsName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="contactsPhone" label="联系电话：" :label-width="formLabelWidth">
                    <el-input v-model="form.contactsPhone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="address" label="居住地址：" :label-width="formLabelWidth">
                    <el-input v-model="form.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="接送人" :label-width="formLabelWidth" v-show="modalType">
                    <el-form>
                        <el-form-item label="" :label-width="formLabelWidth">
                    <span class="tips-red">注：此处录入只能录入一个信息，如需绑定多个请绑定小程序</span>
                        </el-form-item>
                        <el-form-item class="second-form-item" label="接送人姓名：" :label-width="formLabelWidth">
                            <el-input v-model="form.contactsManagerList.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="second-form-item" label="关系：" :label-width="formLabelWidth">
                            <el-select v-model="form.contactsManagerList.type" placeholder="请选择关系">
                                <el-option
                                        v-for="item in this.typeList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="second-form-item" label="联系电话：" :label-width="formLabelWidth">
                            <el-input v-model="form.contactsManagerList.contactsPhone" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
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
                    classroomId: '',
                    name: ''
                },
                form: {
                    name: '',
                    age: '',
                    userNo: '',
                    classroomId: '',
                    sex: '',
                    contactsName: '',
                    contactsPhone: '',
                    address: '',
                    contactsManagerList: [{
                        name: '',
                        type: '',
                        contactsPhone: ''
                    }]
                },
                formLabelWidth: '120px',
                studentEdit: false,
                multipleSelection: [],
                tableData: [],
                classList: [], // 班级列表数据
                typeList: [], // 关系列表
                rules: {
                    name: [
                        { required: true, message: '请输入学生姓名', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    age: [
                        { required: true, message: '请输入年龄', trigger: 'blur' }
                    ],
                    userNo: [
                        { required: true, message: '请输入身份证号', trigger: 'blur' }
                    ],
                    classroomId: [
                        { required: true, message: '请选择班级', trigger: 'change' }
                    ],
                    sex: [
                        { required: true, message: '请选择一个性别', trigger: 'change' }
                    ],
                    contactsName: [
                        { required: true, message: '请填写联系人姓名', trigger: 'blur' }
                    ],
                    contactsPhone: [
                        { required: true, message: '请填写联系人电话', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请填写居住地址', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
          this.getList();
          setTimeout(this.getClassList(), 1000)
        },
        methods: {
            getList() {
                //获取列表数据
                  this.$Api.fetchStudentList(this.searchParams, r => {
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
            getClassList() {
              // 获取班级列表
                this.$Api.fetchClassList({pageSize: 100}, r => {
                    if(r.success){
                        const data = r.data.list;
                        this.classList = data;
                    }
                });
            },
            getTypeList() {
              // 获取关系数据
                this.$Api.fetchTypeList({}, r => {
                    if(r.success){
                        const data = r.data;
                        this.typeList = data;
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
                    this.$Api.fetchStudentDel(data, r => {
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
                        content:'编辑 / 查看详情'
                    }
                },'操作');
            },
            goDetails(id){
                //跳转到学生详情页面
                this.$router.push({ path:'student_Detail', query: {id: id}})
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
                        console.log('新增？');
                        this.$refs['ruleForm'].resetFields()
                    });
                    this.form.id = undefined;
                    this.form.name = '';
                    this.form.age = '';
                    this.form.userNo = '';
                    this.form.classroomId = '';
                    this.form.sex = '';
                    this.form.contactsName = '';
                    this.form.contactsPhone = '';
                    this.form.address = '';
                    this.modalTitle = '新增学生信息';
                    this.modalType = true;
                    this.getTypeList(); // 加载关系列表
                }else {
                    this.form.id = val.id;
                    this.form.name = val.name;
                    this.form.age = val.age;
                    this.form.userNo = val.userNo;
                    this.form.classroomId = val.classroomId;
                    this.form.sex = val.sex;
                    this.form.contactsName = val.contactsName;
                    this.form.contactsPhone = val.contactsPhone;
                    this.form.address = val.address;
                    this.form.contactsManagerList = [];
                    this.modalTitle = '编辑学生信息';
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
                            this.$Api.fetchStudentAdd(this.form, r => {
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
                            this.$Api.fetchStudentUpdate(this.form, r => {
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
