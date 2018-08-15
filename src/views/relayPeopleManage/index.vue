<!--接送人管理列表 create by Fitz-->
<template>
    <div>
        <ToolBar>
            <el-button type="danger" @click="delBtn" icon="el-icon-delete" size="small">批量删除</el-button>
            <!--<div style="float: right">-->
                <!--<el-select v-model="searchParams.classroomId" size="small" clearable placeholder="班级名称" style="width: 230px">-->
                    <!--<el-option-->
                            <!--v-for="item in this.classList"-->
                            <!--:key="item.id"-->
                            <!--:label="item.classroomName +'  -（班主任：'+ item.headmaster +'）'"-->
                            <!--:value="item.id">-->
                    <!--</el-option>-->
                <!--</el-select>-->
                <!--<el-input-->
                        <!--placeholder="学生姓名"-->
                        <!--size="small"-->
                        <!--style="width: 140px"-->
                        <!--v-model="searchParams.name"-->
                        <!--clearable>-->
                <!--</el-input>-->
                <!--<el-button type="success" icon="el-icon-search" size="small" @click="searchBtn"></el-button>-->
            <!--</div>-->
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
                        prop="studentName"
                        align="center"
                        label="学生姓名"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        align="center"
                        label="接送人姓名"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        align="center"
                        label="关系"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="classroomName"
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
                        label="联系方式"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="card"
                        align="center"
                        label="卡号"
                        min-width="180">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        label="注册时间"
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
                        <el-button v-show="!scope.row.card" @click="studentEditBtn(1, scope.row)" type="success" icon="el-icon-plus" size="small" circle></el-button>
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
                <el-form-item prop="studentName" label="学生姓名：" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.studentName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="接送人姓名：" :label-width="formLabelWidth">
                    <el-input :disabled="modalType" v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-show="modalType" class="second-form-item" label="关系：" :label-width="formLabelWidth">
                    <el-input :disabled="modalType" v-model="typeName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="!modalType" prop="type" class="second-form-item" label="关系：" :label-width="formLabelWidth">
                    <el-select v-model="form.type" placeholder="请选择关系">
                        <el-option
                                v-for="item in this.typeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="contactsPhone" label="联系方式：" :label-width="formLabelWidth">
                    <el-input :disabled="modalType" v-model="form.contactsPhone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="card" label="卡号信息：" :label-width="formLabelWidth">
                    <el-input v-model="form.card" auto-complete="off"></el-input>
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
                    pageSize: 10
                },
                typeName: '',
                form: {
                    id: '',
                    name: '',
                    contactsPhone: '',
                    studentName: '',
                    type: '',
                    card: ''
                },
                formLabelWidth: '120px',
                studentEdit: false,
                multipleSelection: [],
                tableData: [],
                classList: [], // 班级列表数据
                typeList: [], // 关系列表
                rules: {
                    name: [
                        { required: true, message: '请填写接送人姓名', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择关系', trigger: 'change' }
                    ],
                    contactsPhone: [
                        { required: true, message: '请填写联系方式', trigger: 'blur' }
                    ],
                    card: [
                        { required: true, message: '请填写卡号信息', trigger: 'blur' }
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
                  this.$Api.fetchRelayList(this.searchParams, r => {
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
                        if(mult[i].id){
                            str += mult[i].id + ','
                        }else {
                            this.$message.warning('选中的数据中至少存在一条无唯一id！')
                            return false;
                        }
                    }
                    const data = {
                        ids: str.substring(0, str.length -1)
                    }
                    this.$Api.fetchRelayDelete(data, r => {
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
                        content:'编辑 / 添加卡号'
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
                    // 新增卡
                    this.typeName = val.typeName;
                    this.modalType = true;
                    this.modalTitle = '添加卡号';
                }else {
                    // 编辑接送人
                    this.modalType = false;
                    this.modalTitle = '编辑接送人信息';
                }
                this.form.id = val.id;
                this.form.name = val.name || '';
                this.form.contactsPhone = val.contactsPhone || '',
                this.form.studentName = val.studentName || '',
                this.form.type = val.type || '',
                this.form.card = val.card || '',
                this.getTypeList(); // 加载关系列表
                this.studentEdit = true;
            },
            submitForm(form) {
                // 提交表单
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        if(this.modalType) {
                            // 新增的提交
                            this.$Api.fetchRelayUpdate(this.form, r => {
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
                            this.$Api.fetchRelayUpdate(this.form, r => {
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
