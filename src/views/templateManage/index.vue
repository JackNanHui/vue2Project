<template>
  <div class="app-container">
    <div style="margin: 5px 0;">
      <el-button type="primary" size="small" @click="$refs.action_ref.show({color:'rgb(28, 28, 28)'})">新建</el-button>
    </div>
    <div class="table_h">
      <el-table
        v-loading="listLoading"
        :data="list"
        height="100%"
        element-loading-text="Loading"
        border
        size="mini"
        fit
        highlight-current-row
      >
      
        <el-table-column label="模板名称"  prop="template_name"></el-table-column>
        <el-table-column label="是否转换英文字幕"  align="center" prop="is_open_zh_subtitle">
          <template slot-scope="scope">
           <span>{{ scope.row.is_open_zh_subtitle==1 ? '是':'否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开启随机去头尾"  align="center" prop="is_film_cutter">
          <template slot-scope="scope">
           <span>{{ scope.row.is_film_cutter==1 ? '是':'否' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="is_open_speed" label="开启随机倍速(>1.3)" >
          <template slot-scope="scope">
           <span>{{ scope.row.is_open_speed==1 ? '是':'否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="$refs.action_ref.show(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Action ref="action_ref" @callBack="fetchData"/>
  </div>
</template>

<script lang="js">
import {ref} from 'vue'
import { getTemplateList,templateDel } from '@/api/table'
import Action from './action.vue'
export default {
  components:{
    Action
  },
  data() {
    return {
      list: null,
      listLoading: false,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTemplateList().then(response => {
        this.list = response.results
        this.listLoading = false
      })
    },
    handleDelete(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          templateDel(id).then((r)=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchData()
          })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
    }
  }
}
</script>
<style lang="scss">
 .table_h{
   height: calc(100vh - 145px);
 }
</style>