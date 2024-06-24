<script setup>
import ContainerHeader from '@/components/containerHeader.vue'
import CategoryDialog from '@/components/categoryDialog.vue'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useCategoryStore } from '@/stores/index'

// const categoryList = ref([])
const dialog = ref()
const dialogTitle = ref("")
const categoryStore = useCategoryStore()

// 初始化文章分类信息
const initCategory = async () => {
  const res = await categoryStore.getCategorys()
  // categoryList.value = res.data.data
  categoryStore.setCategoryList(res.data.data)
}
initCategory()


// 添加按钮触发事件
const addCategory = () => {
  dialogTitle.value = "添加分类"
  dialog.value.open({})
}

// 添加编辑category按钮
const categoryEdit = (row) => {
  // console.log(row.id)
  dialogTitle.value = "编辑分类"
  dialog.value.open(row)
}

const delCategory = async (row) => {
  await categoryStore.deleteCategory(row.id)
  const res = await categoryStore.getCategorys()
  await categoryStore.setCategoryList(res.data.data)
}

</script>

<template>
  <div class="category">
    <ContainerHeader title="文章分类">
      <template #extra>
        <el-button type="primary" @click="addCategory">添加分类</el-button>
      </template>
      <template #default>
        <el-table :data="categoryStore.categoryList" style="width: 100%" size="large">
          <el-table-column label="序号" width="100" type="index"></el-table-column>
          <el-table-column prop="cate_name" label="分类名称" ></el-table-column>
          <el-table-column prop="cate_alias" label="分类别名" ></el-table-column>
          <el-table-column label="操作" width="110" align="center">
            <template #default="{ row }">
              <el-button circle type="primary" plain :icon="Edit" @click="categoryEdit(row)"></el-button>
              <el-button circle type="danger" plain :icon="Delete" @click="delCategory(row)"></el-button>
            </template>
          </el-table-column>
          <template #empty>
            <el-empty description="空空如也"></el-empty>
          </template>
        </el-table>
      </template>
    </ContainerHeader>

    <CategoryDialog ref="dialog" :title="dialogTitle"></CategoryDialog>

    
  </div>
</template>


<style lang="less" scoped>
.category {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 20px solid rgb(245, 245, 245);
}

</style>