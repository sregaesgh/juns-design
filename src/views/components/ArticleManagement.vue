<script setup>
import ContainerHeader from '@/components/containerHeader.vue'
import { ref } from 'vue'
import ArcitleDrawer from '@/components/articleDrawer.vue'
import { useArticleStore } from '@/stores/modules/articleStore';
import { useCategoryStore } from '@/stores/index';
import { Edit, Delete } from '@element-plus/icons-vue'
import { getArticleDetailsService } from '@/api/getArticleDetails';
import { deleteArticleService } from '@/api/deleteArticle';
import { ElLoading } from 'element-plus'



const isLoading = ref(false)
const countTotal = ref(0)
const articlesList = ref([])
const categoryStore = useCategoryStore()
const categoryList = categoryStore.categoryList
const articleStore = useArticleStore()
const publicState = ref([{index: 1, state: "已发布"}, {index: 2, state: "草稿"}])
const defaultParams = {
  pagenum: 1,
  pagesize: "10",
  cate_id: "",
  state: ""
}
const params = ref({...defaultParams})
const drawer = ref()

// 发布文章按钮
const publicArticle = () => {
  drawer.value.isVisible = true
}
// 初始渲染
const articleRender = async () => {
  isLoading.value = true
  await articleStore.getArticleList(params.value)
  articlesList.value = articleStore.articleList
  countTotal.value = articleStore.total
  isLoading.value = false
}
articleRender()

// 用户改变每天渲染数目
const handleSizeChange = () => {
  articleRender()
}

// 用户翻页
const handleCurrentChange = () => {
  articleRender()
}

// 用户搜索
const searchBtn = () => {
  articleRender()
}

// 用户搜索重置
const resetBtn = () => {
  params.value = { ...defaultParams }
  articleRender()
}

// 文章编辑
const articleEdit = async (id) => {
  const drawerDOM = document.querySelector(".el-drawer")
  const loadingInstance = ElLoading.service({
    target: drawerDOM
    // fullscreen: true
  })
  drawer.value.isVisible = true
  const res = await getArticleDetailsService(id.toString())
  let { title, cate_id, cover_img, content, state } =  res.data.data
  cover_img = "http://big-event-vue-api-t.itheima.net" + cover_img
  drawer.value.updateDrawer({ title, cate_id, cover_img, content, state})
  drawer.value.imageUrl = cover_img
  loadingInstance.close()
}

// 文章删除
const articleDelete = async (row) => {
  await deleteArticleService(row.id)
  articleRender()
}
</script>

<template>
  <div class="articleManage">
    <ContainerHeader title="文章管理">
      <template #extra>
        <el-button type="primary" @click="publicArticle">发布文章</el-button>
      </template>
      <template #default>
        <el-form class="articleSearch">
          <el-form-item label="文章分类：">
            <el-select style="width: 150px;" v-model="params.cate_id">
              <el-option v-for="item in categoryList"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态：">
            <el-select style="width: 150px;" v-model="params.state">
              <el-option v-for="item in publicState"
              :key="item.index"
              :label="item.state"
              :value="item.state"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchBtn">搜索</el-button>
            <el-button plain @click="resetBtn">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table style="width: 100%" :data="articlesList" stripe max-height="550px" size="large" v-loading="isLoading">
          <el-table-column label="文章标题" prop="title"></el-table-column>
          <el-table-column label="分类" width="260" prop="cate_name"></el-table-column>
          <el-table-column label="发表时间" width="260" prop="pub_date"></el-table-column>
          <el-table-column label="状态" width="260" prop="state"></el-table-column>
          <el-table-column label="操作" width="110" >
            <template #default="{ row }">
              <el-button circle type="primary" plain :icon="Edit" @click="articleEdit(row.id)"></el-button>
              <el-button circle type="danger" plain :icon="Delete" @click="articleDelete(row)"></el-button>
            </template>
          </el-table-column>
          <template #empty>
            <el-empty description="空空如也"></el-empty>
          </template>
        </el-table>
        <div class="pagination">
          <el-pagination 
          v-model:current-page="params.pagenum"
          v-model:page-size="params.pagesize"
          layout="jumper, total, sizes, prev, pager, next "
          :total="countTotal" 
          background 
          :page-sizes="[2, 3, 5, 10]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </template>
    </ContainerHeader>

    <ArcitleDrawer ref="drawer"></ArcitleDrawer>

  </div>
</template>


<style lang="less" scoped>
.articleManage {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 20px solid rgb(245, 245, 245);
  .articleHeader {
    color: rgb(64, 158, 255);
  }
}

.articleSearch {
  display: flex;
}

.el-form-item {
  margin-right: 30px;
}

.pagination {
  display: flex;
  margin-top: 20px;
  justify-content: end;
}
</style>