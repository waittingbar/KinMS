<!--学生管理列表 create by Fitz-->
<template>
    <div>
        <ToolBar>
            <el-button type="danger" icon="el-icon-delete" size="small">批量删除</el-button>
            <el-button type="primary" @click="goAddManage" icon="el-icon-plus" size="small">新增学生</el-button>
            <div style="float: right">
                <el-select v-model="searchParams.classroomName" size="small" clearable placeholder="班级名称" style="width: 120px">
                    <el-option
                            v-for="(v,k) in $Config.className"
                            :key="k"
                            :label="v"
                            :value="k">
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
                    border
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        align="center"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        align="center"
                        label="学生姓名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        align="center"
                        label="性别"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="age"
                        align="center"
                        label="年龄"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="class"
                        align="center"
                        label="所在班级"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="cabnt"
                        align="center"
                        label="紧急联系人"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        align="center"
                        label="联系电话"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="date"
                        align="center"
                        label="录入时间"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="操作"
                        :render-header="tableAction"
                        align="center"
                        fixed="right"
                        width="120">
                    <template slot-scope="scope">
                        <el-button @click="studentEditBtn(scope.row)" type="primary" icon="el-icon-edit" size="small" circle></el-button>
                        <el-button @click="handleClick(scope.row)" type="info" icon="el-icon-info" size="small" circle></el-button>
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
                title="编辑学生信息"
                width="750px"
                center
                :close-on-click-modal = false
                :close-on-press-escape = false
                :visible.sync="studentEdit">
            <el-form :model="form" class="dialog-from-700">
                <el-form-item label="学生姓名：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="班级：" :label-width="formLabelWidth">
                    <el-select v-model="form.classroomName" placeholder="请选择班级">
                        <el-option
                                v-for="(v,k) in $Config.className"
                                :key="k"
                                :label="v"
                                :value="k">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证号：" :label-width="formLabelWidth">
                    <el-input v-model="form.idard" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="紧急联系人：" :label-width="formLabelWidth">
                    <el-input v-model="form.content" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="居住地址：" :label-width="formLabelWidth">
                    <el-input v-model="form.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="接送人" :label-width="formLabelWidth">
                    <el-form>
                        <el-form-item label="" :label-width="formLabelWidth">
                    <span class="tips-red">注：此处录入只能录入一个信息，如需绑定多个请绑定小程序</span>
                        </el-form-item>
                        <el-form-item class="second-form-item" label="接送人姓名：" :label-width="formLabelWidth">
                            <el-input v-model="form.idard" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="second-form-item" label="关系：" :label-width="formLabelWidth">
                            <el-input v-model="form.idard" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="second-form-item" label="联系电话：" :label-width="formLabelWidth">
                            <el-input v-model="form.idard" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="studentEdit = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
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
                total: 20,
                searchParams:{
                    pageNum: 1,
                    pageSize: 10,
                    classroomName: '',
                    name: ''
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                studentEdit: false,
                multipleSelection: [],
                tableData: [{
                    date: '2016-05-03',
                    name: '小红',
                    sex: '女',
                    age: '6',
                    class: '小班',
                    cabnt: '王军（父亲）',
                    phone: '1679022321',
                }, {
                    date: '2016-05-03',
                    name: '小红',
                    sex: '男',
                    age: '8',
                    class: '小班',
                    cabnt: '王军（父亲）',
                    phone: '1679022321',
                }, {
                    date: '2016-05-03',
                    name: '小红',
                    sex: '男',
                    age: '7',
                    class: '小班',
                    cabnt: '王军（父亲）',
                    phone: '1679022321',
                }, {
                    date: '2016-05-03',
                    name: '小红',
                    sex: '男',
                    age: '6',
                    class: '小班',
                    cabnt: '王军（父亲）',
                    phone: '1679022321',
                }, {
                    date: '2016-05-03',
                    name: '小红',
                    sex: '男',
                    age: '6',
                    class: '小班',
                    cabnt: '王军（父亲）',
                    phone: '1679022321',
                }]
            }
        },
        created() {
          this.getList();
        },
        methods: {
            getList() {
                //获取列表数据
                 this.$Api.fetchStudentList(this.searchParams, r => {
                    console.log(r)
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
            tableAction(){
                return this.$createElement('HelpHint',{
                    props:{
                        content:'编辑 / 查看详情'
                    }
                },'操作');
            },
            goAddManage(){
                //跳转到新增学生页面
                this.$router.push('student_add')
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            studentEditBtn(val) {
                console.log(val)
                this.studentEdit = true;
            }
        },
        components: {
            ToolBar,HelpHint
        }
    }
</script>