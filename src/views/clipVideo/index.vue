<template>
    <div class="_clipVideo">
        <div class="_content">
            <el-row class="row_content" style="height:100%" :gutter="20">
                <el-col :span="15" style="height:100%">
                    <div style="height: 80%;border:1px solid #bbb;">
                        <el-row>
                            <el-col :span="6" style="border-right: 1px solid #bbb;height: 100%;">
                                <div style="height: 60%;">
                                    <el-upload
                                        class="avatar-uploader"
                                        action="http://127.0.0.1:8000/upload/"
                                        :headers="{ 
                                            Authorization: `Bearer ${token}`,
                                        }"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess1"
                                        :before-upload="handleBeforeUpload1"
                                        style="background-color: white;height: 100%;"
                                    >
                                        <img v-if="formData.file_name_one" key="getfileNameOne" style="height: 100%;width: 100%;" :src="`http://127.0.0.1:8000/media/temp_img/${formData.file_name_one }`" class="avatar" />
                                        <i  class="el-icon-camera-solid" v-else style="background-color: #fff;
                                            text-align: center;
                                            width: 100%;
                                            height: 100%;
                                            padding-top: 50%;font-size: 60px;"></i>
                                    </el-upload>
                                </div>
                                <div style="height: 40%;border-top: 1px solid #bbb;">
                                    <el-upload
                                        class="avatar-uploader"
                                        action="http://127.0.0.1:8000/upload/"
                                        :headers="{ 
                                            Authorization: `Bearer ${token}`,
                                        }"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess2"
                                        :before-upload="handleBeforeUpload2"
                                        style="background-color: white;height: 100%;width: 100%;"
                                    >
                                        <img v-if="formData.file_name_two" key="getfileNameOne"  style="height: 100%;width: 100%;"  :src="`http://127.0.0.1:8000/media/temp_img/${formData.file_name_two }`" class="avatar" />
                                        <i  class="el-icon-camera-solid" v-else style="background-color: #fff;
                                            text-align: center;
                                            width: 100%;
                                            height: 100%;
                                            padding-top: 30%;font-size: 60px;"></i>
                                    </el-upload>
                                </div>
                            </el-col>
                            <el-col :span="18" style="height: 100%;">
                                <el-upload
                                    class="avatar-uploader"
                                    action="http://127.0.0.1:8000/videos/"
                                    :headers="{ 
                                        Authorization: `Bearer ${token}`,
                                        
                                    }"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="handleBeforeUpload"
                                    style="height: 100%;"
                                >
                                    <video v-if="formData.videoName"  height="100%" width="100%" >
                                        <source :src="`http://127.0.0.1:8000/media/temp_videos/${formData.videoName }`" type="video/mp4">
                                    </video>
                                    <i v-else class="el-icon-video-camera-solid" style="background-color: #fff;
                                        text-align: center;
                                        width: 100%;
                                        height: 100%;
                                        padding-top: 25%;font-size: 90px;"></i>
                               </el-upload>
                            </el-col>
                        </el-row>
                    </div>
                    <div style="border:1px solid #bbb;height:20%">
                        <div style="height:100%;width:100%;padding: 5px;" v-if="comments[0]">
                            <img key="getfileNameOne"  style="height: 60px;width: 60px;display: inline-block;"  :src="`http://127.0.0.1:8000/${comments[0].avatar }`" class="avatar" />
                            <span style="display: inline-block;vertical-align: top;margin-left: 10px;color: rgb(255, 106, 106);font-size: 12px;margin-top: 10px;"  >
                                <span style="display: inline-block;">{{ comments[0].author }}</span>
                                <span style="display: inline-block;margin-left: 5px;">{{ comments[0].time.substring(0,10) }}</span>
                            </span>
                            <div style="text-align: center;white-space: nowrap;overflow: hidden;"  >
                               <span style="padding-top: 46%;">{{ comments[0].text }}</span>
                            </div>
                        </div>

                    </div>
                </el-col>
                <el-col :span="9" style="height: 100%;">
                    <div style="height: 100%">
                        <el-row  style="margin: 0;padding: 0 5px;">
                            <el-col :span="24" >
                                <span  class="_title">根据需求进行参数设置</span>
                                <el-form :model="formData" size="large" style="padding-top:15px ;" label-width="120px"  label-position="top">
                                    <el-row  :gutter="20">
                                        <el-col :span="12">
                                            <el-form-item label="输入需要采集的油管视频网址">
                                                <el-input v-model="formData.video_id" />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="api_key">
                                                <el-input v-model="formData.api_key" />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="24" style="text-align: center;margin: 10px 0;height: 60px;border-bottom: 1px dashed #ccc;">
                                            <el-button :disabled="commentsBtnStatus" type="primary" @click="getCommentsData" >获取评论信息</el-button>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="选择模板">
                                                <el-input v-model="formData.template_name" disabled>
                                                    <template slot="append">
                                                        <el-button  type="primary" @click="()=>{$refs.chooseTemRef.show()}">选择</el-button>
                                                    </template>
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="开启随机去头尾">
                                                <el-select
                                                    v-model="formData.is_film_cutter"
                                                    placeholder="待选择"
                                                    style="width: 100%;"
                                                >
                                                    <el-option label="是" :value="1" />
                                                    <el-option label="否" :value="0" />
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="开启随机倍速(>1.3)">
                                                <el-select
                                                    v-model="formData.is_open_speed"
                                                    placeholder="待选择"
                                                    style="width: 100%;"
                                                >
                                                    <el-option label="是" :value="1" />
                                                    <el-option label="否" :value="0" />
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="请选择字幕颜色">
                                                <el-color-picker show-alpha v-model="formData.color" />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="请输入水印信息">
                                                <el-input v-model="formData.watermark" ></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="默认输出地址">
                                                <el-input v-model="formData.opadd" disabled>
                                                    
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="24" style="text-align: center;margin: 10px 0;">
                                            <el-button :disabled="videoBtnStatus" type="primary" @click="downloadVideo" style="
                                                
                                            ">解析并下载视频</el-button>
                                           
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="_footer" ref="scrollingDiv">
           <span v-for="item,index in logs">
             <span :style="`display: inline-block;color:${(item.status == 1 )? '#fff': ((item.status == 3) ? '#4876FF' : (item.status == 4 ? '#90EE90' : (item.status == 2 ? '#C0FF3E':'#FF0000')))} `"> 
                <span style="display: inline-block;color: #fff;">clipVideo://</span><span style="display: inline-block;margin-left: 4px;">{{ item.msg }}</span> <span style="display: inline-block;">{{ `${hours}:${minutes}:${seconds}` }}</span> 
            </span> 
             <span v-if="(item.status == 3) && index == (logs.length - 1)" class="rotate-box" style="display: inline-block;padding: 0px;margin-left: 6px;padding-top: 3px;">
               
                </span>
           </span>
        </div>
        <ChooseTem ref="chooseTemRef" @callBack="callBack"/>
    </div>
  </template>
  <script lang="js" >
    import ChooseTem from './chooseTem.vue'
    import { getToken,  } from '@/utils/auth'
    import { getComments } from '@/api/clipVideo'

    export default {
        components:{
            ChooseTem,
        },
        
        data() {
            const websocket = new WebSocket('ws://127.0.0.1:8000/ws/video_export/',);
            websocket.addEventListener('message', (event) => {
                // 处理接收到的消息
                const logMessage = JSON.parse(event.data);
                // if(logMessage.message.status == 4){
                //     this.commentsBtnStatus = false
                //     this.videoBtnStatus = false
                // } else {
                //     this.commentsBtnStatus = true
                //     this.videoBtnStatus = true
                // }
                this.logs.push(logMessage.message)
                this.scrollToBottom()
                // this.logs(logMessage);
            });
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            // 添加WebSocket事件处理程序
            return {
                formData:{
                    opadd:'C:/uploadVideo',
                    api_key:'AIzaSyAXWtioA8VMgteHedwWn12fKOoy0NrNT5c',
                    video_id:'I8Do0Wi6QL4',
                    color:'rgb(28, 28, 28)'
                },
                token:getToken(),
                logs: [],
                comments:[],
                commentsBtnStatus:false,
                videoBtnStatus:false,
                websocket,
                hours,minutes,seconds

            }
        },
        created() {
        },
        computed:{
       
        },
        methods:{
            callBack(data){
              this.formData = {...this.formData,...data,}
            },
            // 获取油管评论信息
            getCommentsData(){
                getComments({
                    api_key:this.formData.api_key,
                    video_id:this.formData.video_id,
                }).then((r)=>{
                    // loading.close();
                    this.comments = r.comments
                   
                    this.$forceUpdate();
                    
                    
                    this.$message({
                        message: '获取评论成功,',
                        type: 'success'
                    });
                }).catch(()=>{
                    this.logs.push({status:5,msg:'评论解析失败,请检查网络'})
                    this.scrollToBottom()
                    this.commentsBtnStatus = false
                    this.videoBtnStatus = false
                    this.$message({
                        message: '获取评论失败,请检查网络',
                        type: 'error'
                    });
                }).finally(()=>{
                    loading.close();
                })
            },
            // 滚动条尾
            scrollToBottom() {
                this.$nextTick(() => {
                    const scrollingDiv = this.$refs.scrollingDiv;
                    scrollingDiv.scrollTop = scrollingDiv.scrollHeight;
                });
            },
            handleAvatarSuccess(response) {
                this.formData.videoName = response.videoName
                this.$forceUpdate();
            },
            handleBeforeUpload(file) {
                // 在这里可以获取到上传文件的文件名
                console.log('上传的文件名是：', file.name);
                // 返回 true 表示继续上传，返回 false 表示取消上传
                return true;
            },
            handleAvatarSuccess1(response) {
                this.formData.file_path_one = response.file_path
                this.formData.file_name_one = response.filename
                this.$forceUpdate();
            },
            handleBeforeUpload1(file) {
                    console.log('上传的文件名是：', file.name);
                    return true;
            },
            handleAvatarSuccess2(response) {
                this.formData.file_path_two = response.file_path
                this.formData.file_name_two = response.filename
                this.$forceUpdate();
            },
            handleBeforeUpload2(file) {
                    console.log('上传的文件名是：', file.name);
                    return true;
            },
            downloadVideo(){
                if(!this.comments.length){
                    this.$message({
                        message: '请先获取评论信息',
                        type: 'error'
                    });
                    return
                }
                if(this.formData.file_name_one && this.formData.file_name_two && this.formData.videoName){
                  
                    fetch('/api/videoProcessing/', {
                        method: 'POST', 
                        body: JSON.stringify({...this.formData,comments:this.comments}), 
                        mode: 'cors',
                        headers: new Headers({
                            Authorization: `Bearer ${this.token}`,
                            'Content-Type': 'application/json'
                        })
                    }).then(res =>{
                        if(res.status == 200) {
                            // loading.close();
                            this.$message({
                                message: '视频导出成功,',
                                type: 'success'
                            });
                        } 
                    
                    }).catch(error => {
                        this.$message.error('视频导出失败,请联系客服');
                    })
                } else {
                    this.$message({
                        message: '请检查视频或者图片信息是否为空',
                        type: 'error'
                    });
                }
               
               
            },
          
        },
        mounted() {
           
           
        },
        destroyed() {
            alert('a')
            this.websocket.close();
        }
        
    }

  </script>
  <style  lang="scss">
    ._clipVideo{
        height: calc(100vh - 50px);
    }
    ._content{
      height: calc(100vh - 230px);
      background-color: #fff;
      .el-row{
          height: 100%;
         
      }
      .row_content{
          padding: 10px 0 0 0;
      }
      .el-form--label-top .el-form-item__label{
        padding: 0 !important; 
        color: #333333;
        font-size: 15px;
      }
    }
    ._title{
      height: 50px;
      line-height: 50px;
      width: 100%;
      border-radius: 8px;
      text-align: center;
      display: inline-block;
      background-color: aqua;
    }
   .el-form-item__label{
     margin-bottom: 2px !important;
     font-size: 16px;
     font-weight: bold;
    }
    .avatar-uploader .avatar {
      width: 178px;
      height: 178px;
      display: block;
      }
    .el-upload {
      height: 100%;
    }
  
    .avatar-uploader .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      width: 100%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      }
  
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
    ._footer {
      height: 180px;
      width: 100%;
      padding: 0 5px;
      font-size: 13px;
      color:rgb(64, 158, 255);
      background-color: #000000;
      overflow-y: scroll;
      span{
        display: block;
        padding: 3px;
        
      }
    }
    .rotate-box {
        width: 1px;
        height: 15px;
        display: inline-block;
        background-color: #3498db;
        animation: rotate 2s linear infinite; /* 使用名为 "rotate" 的动画，并设置为无限循环 */
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg); /* 从 0 度开始旋转 */
        }
        to {
            transform: rotate(360deg); /* 旋转到 360 度 */
        }
    }
    ::-webkit-scrollbar
        {
            width:3px;
            height:100%;
            background-color:#F5F5F5;
        }
    /*定义滚动条轨道
    内阴影+圆角*/
    ::-webkit-scrollbar-track
    {
        -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
        border-radius:10px;
        background-color:#F5F5F5;
    }
    /*定义滑块
    内阴影+圆角*/
    ::-webkit-scrollbar-thumb
    {
        border-radius:10px;
        -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
        background-color:#555;
    }

</style>