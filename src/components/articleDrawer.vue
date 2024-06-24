<script setup>
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useCategoryStore } from '@/stores/index';
import { useArticleStore } from '@/stores/modules/articleStore';


const isVisible = ref(false)
const imageUrl = ref("")
const editor = ref()
const categoryStore = useCategoryStore()
// 默认数据对象
const defaultData = {
  title: "",
  cate_id: "",
  cover_img: {},
  content: "",
  state: ""
}
// 文章数据对象
const articleData = ref({ ...defaultData })
// drawer验证规则对象
const rules = ref({
  title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
  category: [{ required: true, trigger: "blur" }],
  cover_img: [{ required: true, trigger: "blur" }],
  content: [{ required: true, message: "文章内容不能为空", trigger: "blur" }]

})
// 文件上传成功钩子函数 
const handleAvatarChange = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  articleData.value.cover_img = uploadFile.raw
}
// 发布按钮功能
const articlePublic = async (state) => {
  // const { title, cate_id, content, cover_img } = articleData.value
  // const articleStore = useArticleStore()
  // console.log(cover_img)
  // const res = await articleStore.addArticle(title, cate_id.toString(), content, cover_img, state)
  // console.log(res)
  const articleStore = useArticleStore()
  articleData.value.state = state
  articleData.value.cate_id = articleData.value.cate_id.toString()
  // 转换 formData 数据
  const fd = new FormData()
  for (let key in articleData.value) {
    fd.append(key, articleData.value[key])
  }

  if (articleData.value.id) {
    console.log('编辑操作')
  } else {
    // 添加请求
    await articleStore.addArticle(fd)
    isVisible.value = false
    articleData.value = { ...defaultData }
    imageUrl.value = ""
    editor.value.setHTML("")
    // emit('success', 'add')
  }
}

// 对外暴露的修改drawer功能
const updateDrawer = (drawer) => {
  articleData.value = {...drawer}
}

defineExpose({
  isVisible,
  imageUrl,
  updateDrawer
})
</script>

<template>
  <el-drawer v-model="isVisible" size="50%" style="font-size: 16px;" >
    <template #header>
      <span>添加文章</span>
    </template>
    <template #default>
      <el-form style="margin-left: 20px;" :model="articleData" :rules="rules">
        <el-form-item label="文章标题" prop="title">
          <el-input placeholder="请输入标题" v-model="articleData.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="category">
          <el-select v-model="articleData.cate_id">
            <el-option v-for="item in categoryStore.categoryList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <el-upload
            class="avatar-uploader"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarChange"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <div class="editor">
            <QuillEditor style="min-height: 200px;" v-model:content="articleData.content" contentType="html"
            ref="editor"
            ></QuillEditor>
          </div>
        </el-form-item>
        <el-form-item class="drawerBtn">
          <el-button type="primary" @click="articlePublic('已发布')">发布</el-button>
          <el-button type="info" @click="articlePublic('草稿')">草稿</el-button>

        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
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

.editor {
  width: 100%;
}

.drawerBtn {
  margin-left: 68px;
}
</style>