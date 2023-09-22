<template>
    <el-dialog title="选择模板" :visible.sync="dialogFormVisible">
        <el-table
            v-loading="listLoading"
            :data="list"
            height="500px"
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
                    v-if="formData.id !== (scope.row.id)" type="primary"
                    @click="formData = scope.row"
                >
                    选择
                </el-button>
                <el-button
                    size="mini"
                    type="danger"
                    v-else
                    @click="formData = {}"
                >
                    取消
                </el-button>
            </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import { getTemplateList } from '@/api/table'

    export default {
        data(){
            return {
                dialogFormVisible :false,
                formData:{},
                list: null,
               
                listLoading: false,
            }
        },
        computed:{
        },
        methods:{
          show(data={}){
            this.dialogFormVisible = true
            this.formData = {...data}
            this.fetchData()
          },
          fetchData() {
            this.listLoading = true
            getTemplateList().then(response => {
                this.list = response.results
                this.listLoading = false
            })
          },
          save() {
            this.$emit('callBack',this.formData);
            this.dialogFormVisible = false
          }
        }
    }
</script>
<style>
  .el-form-item{
    margin-bottom: 1px;
  }
  .el-dialog__body{
    padding: 4px 10px;
  }
</style>