<template>
    <el-dialog title="模板维护" :visible.sync="dialogFormVisible">
        <el-form :model="formData"  label-position="left">
            <el-form-item label="模板名称" >
                <el-input v-model="formData.template_name" autocomplete="off"></el-input>
            </el-form-item>
           
            <!-- <el-form-item label="是否转换英文字幕(默认中文)" >
                <el-select
                    v-model="formData.is_open_zh_subtitle"
                    placeholder="待选择"
                    style="width: 100%;"
                >
                    <el-option label="是" :value="1" />
                    <el-option label="否" :value="0" />
                </el-select>
            </el-form-item> -->
            <el-form-item label="开启随机去头尾" >
                <el-select
                    v-model="formData.is_film_cutter"
                    placeholder="待选择"
                    style="width: 100%;"
                >
                    <el-option label="是" :value="1" />
                    <el-option label="否" :value="0" />
                </el-select>
            </el-form-item>
            <el-form-item label="开启随机倍速(>1.3)" >
                <el-select
                    v-model="formData.is_open_speed"
                    placeholder="待选择"
                    style="width: 100%;"
                >
                    <el-option label="是" :value="1" />
                    <el-option label="否" :value="0" />
                </el-select>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item  >
                        <template #label>
                            <div>logo1</div>
                        </template>
                        <div style="margin: 50px;">
                            <el-upload
                                class="avatar-uploader"
                                action="http://127.0.0.1:8000/upload/"
                                :headers="{ 
                                    Authorization: `Bearer ${token}`,
                                    
                                }"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="handleBeforeUpload"
                                style="background-color: white;"
                            >
                                <img v-if="formData.file_name_one" key="getfileNameOne" height="100" width="100" :src="`http://127.0.0.1:8000/media/temp_img/${formData.file_name_one }`" class="avatar" />
                                
                                <i v-else class="el-icon-camera-solid" style="background-color: #eee;
                                    text-align: center;
                                    width: 100px;
                                    height: 100px;
                                    line-height: 100px;"></i>
                            </el-upload>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item  >
                        <template #label>
                            <div>logo2</div>
                        </template>
                        <div style="margin: 50px;">
                            <el-upload
                                class="avatar-uploader"
                                action="http://127.0.0.1:8000/upload/"
                                :headers="{ 
                                    Authorization: `Bearer ${token}`,
                                }"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess1"
                                :before-upload="handleBeforeUpload1"
                                style="background-color: white;"
                            >
                                <img v-if="formData.file_name_two" key="getfileNameOne" height="100" width="100" :src="`http://127.0.0.1:8000/media/temp_img/${formData.file_name_two }`" class="avatar" />
                                <i  class="el-icon-camera-solid" v-else style="background-color: #eee;
                                    text-align: center;
                                    width: 100px;
                                    height: 100px;
                                    line-height: 100px;"></i>
                            </el-upload>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="请选择字幕颜色">
                <el-color-picker v-model="formData.color" color-format="rgb"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import { templateAdd,templateEdit } from '@/api/table'
    import { getToken,  } from '@/utils/auth'

    export default {
        data(){
            return {
                dialogFormVisible :false,
                formData:{},
                imageUrl:'',
                token:getToken()
            }
        },
        computed:{
        },
        methods:{
          show(data={}){
            this.dialogFormVisible = true
            this.formData = data
          },
          handleAvatarSuccess(response) {
            this.formData.file_path_one = response.file_path
            this.formData.file_name_one = response.filename
            this.$forceUpdate();
          },
          handleBeforeUpload(file) {
                // 在这里可以获取到上传文件的文件名
                console.log('上传的文件名是：', file.name);
                // 返回 true 表示继续上传，返回 false 表示取消上传
                return true;
          },
          handleAvatarSuccess1(response) {
            this.formData.file_path_two = response.file_path
            this.formData.file_name_two = response.filename
            this.$forceUpdate();
          },
          handleBeforeUpload1(file) {
                // 在这里可以获取到上传文件的文件名
                console.log('上传的文件名是：', file.name);
                // 如果需要修改文件名，你可以在这里修改
                // file.name = 'new-file-name.ext';
                // 返回 true 表示继续上传，返回 false 表示取消上传
                return true;
          },
          save() {
             let fn = this.formData.id ? templateEdit : templateAdd
             fn({...this.formData,}).then((r)=>{
                if(r){
                    this.dialogFormVisible = false
                    this.$emit('callBack',);
                }
             })
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
  .el-form--label-top .el-form-item__label{
        padding: 0 !important; 
        color: #333333;
        font-size: 15px;
    }
</style>