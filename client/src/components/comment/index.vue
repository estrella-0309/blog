<template>
  <h3 style="margin-top: var(--mb-1);font-weight: normal;">评论 |共计{{ data?.total }}条评论</h3>
  <el-divider />
  <div class="commentList" v-for="first in data?.list" :key="first.comment_id">
    <div class="first">
      <el-avatar :src="`http://q2.qlogo.cn/headimg_dl?dst_uin=${first.user_id}&spec=1`" />
      <div class="information" style="padding-left: 5px;">

        <div class="content"><span>{{ first.nikename }}</span>:{{ first.content }}</div>
        <div class="createtime" style="">{{ timestampToTime(first.createtime) }}</div>
      </div>
      <div class="box" style="margin-left: auto;margin-right: var(--mb-1);">
        <el-icon style="transform: translateY(3px);" @click="SecondcommentShow(first.nikename, first.comment_id)">
          <ChatLineSquare />
        </el-icon>
        <!-- <i class="iconfont icon-icon" style="margin-left: var(--mb-0-5);font-size: 18px;"></i> -->
      </div>
    </div>
    <div class="second"  v-if="first.secondlist.length!==0">
      <div v-for="second in first.secondlist" :key="second.comment_id">
        <el-card shadow="never" style="width: 80%; margin: var(--mb-1);">
          <div style=" display: flex;align-items: flex-end;">
            <el-avatar :src="`http://q2.qlogo.cn/headimg_dl?dst_uin=${second.user_id}&spec=1`" />
            <div class="information" style="padding-left: 5px;">
              <div class="content"><span>{{second.nikename}}<span style="font-size: 14px;">@{{ second.parent_nickname }}</span> </span>:{{second.content}}</div>
              <div class="createtime">{{ timestampToTime(second.createtime)}}</div>
            </div>
            <div class="box" style="margin-left: auto;margin-right: var(--mb-1);">
              <el-icon style="transform: translateY(3px);" @click="SecondcommentShow(second.nikename, first.comment_id)">
                <ChatLineSquare />
              </el-icon>
            </div>
          </div>

        </el-card>
      </div>
    </div>
    <el-dialog v-model="sceondDialogVisible" :title="`回复@${sceondcommentform.parent_nickname}`" width="30%"
      @close="resetsceondcomment()">
      <el-form ref="ruleFormRef" :model="sceondcommentform" :rules="rules">
        <el-form-item label="头像" prop="user_id">
          <el-input v-model="sceondcommentform.user_id" placeholder="请输入qq号"></el-input>
        </el-form-item>


        <el-form-item label="昵称" prop="nikename">
          <el-input style="margin-top: 20px;" v-model="sceondcommentform.nikename" placeholder="请输入昵称"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input style="margin-top: 20px;" v-model="sceondcommentform.content" placeholder="请输入评论内容"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetsceondcomment()">取消</el-button>
          <el-button type="primary" @click="sceondcommentcreate(ruleFormRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { ChatLineSquare } from '@element-plus/icons-vue'
import { commenttype } from "@/api/interface";
import { timestampToTime } from "@/utils/time";
import { SecondCommentCreate } from "@/api/modules/comment";
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute } from "vue-router";
const route = useRoute()
const emit=defineEmits(["updatecomment"])
const props = defineProps({
  data: Object
})
function reloadcommentlist() {
  emit("updatecomment")
}
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  user_id: [{ required: true, message: "请输入qq号", trigger: 'blur' }],
  nikename: [{ required: true, message: "请输入昵称", trigger: 'blur' }],
  content: [{ required: true, message: "请输入内容", trigger: 'blur' }],
})


type secondcomment = {
  blog_id: string,
  parent_nickname: string,
  parent_id: null | number,
  nikename: string,
  user_id: null | number,
  content: string
}
let sceondDialogVisible = ref(false)
let sceondcommentform = reactive<secondcomment>({ blog_id: route.query.id as string, parent_nickname: "", parent_id: null, nikename: "", user_id: null, content: "" })
const SecondcommentShow = (nickname: string, comment_id: number) => {
  sceondDialogVisible.value = true
  sceondcommentform.parent_nickname = nickname
  sceondcommentform.parent_id = comment_id
}

const resetsceondcomment = () => {
  sceondDialogVisible.value = false
  sceondcommentform.parent_nickname = ""
  sceondcommentform.parent_id = null
  sceondcommentform.user_id=null
  sceondcommentform.content=""
  sceondcommentform.nikename=""
}
const sceondcommentcreate = async (formEl: FormInstance | undefined) => {
  let result = await SecondCommentCreate(sceondcommentform)
  if (result.status = 200) {
    ElMessage.success("发布成功")
    resetsceondcomment()
    reloadcommentlist()
  }

}
</script>

<style lang="scss" scoped>
.commentList {
  padding: 7px 0;
  // background-color: pink;
  padding-left: 14px;

  .first {
    display: flex;
    align-items: flex-end;
  }

  .content {
    span {
      font-weight: 600;
    }
  }

  .createtime {
    font-size: 12px;
    color: #939393;
  }

  .second {
    margin: 6px 15px 2px 44px;
    position: relative;

    // background-color: red;
    &::before {
      content: "";
      position: absolute;
      top: 4px;
      bottom: 4px;
      left: 0;
      border-left: 2px solid var(--w-card-border-color);
    }
  }
}
</style>