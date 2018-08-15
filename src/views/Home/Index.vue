<template>
  <div>
    <el-card style="border-radius: 0">
      <div slot="header">
        <span>首页</span>
      </div>
      <div class="demo">
        <el-row :gutter="20">
           <h2>hi，欢迎访问！</h2>
        </el-row>
      </div>
    </el-card>
    <br>


  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            });
          }
        });
      }
    },
    mounted: function () {

    }
  }
</script>
<style lang="less">
  .demo{
    margin: 10px;
    min-height: 600px;
    .grid-content {
      border-radius: 4px;
      overflow: hidden;
      color: #fff;
      background: #d3dce6;
      .index-icon{
        font-size: 82px;
        color: #fff;
      }
    }
  }
</style>