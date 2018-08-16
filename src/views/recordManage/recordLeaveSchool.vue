<!--今日离校记录列表 create by Fitz-->
<template>
    <div>
        <ToolBar>
            <el-button type="danger" @click="delBtn" icon="el-icon-delete" size="small">批量删除</el-button>
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
                        v-model="searchParams.studentName"
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
                        prop="studentName"
                        align="center"
                        label="学生姓名"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="classRoomName"
                        align="center"
                        label="班级"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        align="center"
                        label="接送人姓名"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="现场照片"
                        min-width="100">
                    <template slot-scope="scope">
                        <img :src="scope.row.recordUrl" class="photo-img" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        align="center"
                        label="关系"
                        min-width="150">
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
                        min-width="200">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        label="离校时间"
                        min-width="200">
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
                    type: 0, // type 为0是到校记录，否则离校记录
                    studentName: '',
                    classroomId: ''
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
            }
        },
        created() {
          this.getList();
          setTimeout(this.getClassList(), 1000)
        },
        methods: {
            getList() {
                //获取列表数据
                  this.$Api.fetchRecordTodayList(this.searchParams, r => {
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
            }

        },
        components: {
            ToolBar,HelpHint
        }
    }
</script>
