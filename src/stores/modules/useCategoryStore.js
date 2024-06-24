import { defineStore } from "pinia";
import { ref } from 'vue'
import { addCategoryService } from '@/api/addCategoryService'
import { getArticleCategoryService } from '@/api/getArticleCategoryService'
import { editCategoryService } from "@/api/editCategoryService";
import { deleteCategoryService } from "@/api/deleteCategoryService";

export const useCategoryStore = defineStore("categorys", () => {
  const categoryList = ref([])
  const addCategory = async (cate_name, cate_alias) => {
    await addCategoryService(cate_name, cate_alias)
  }
  const getCategorys = async () => {
    const res = await getArticleCategoryService()
    return res
  }
  const setCategoryList = (newCategoryList) => {
    categoryList.value = newCategoryList
  }
  const updateCategory = (id, cate_name, cate_alias) => {
    editCategoryService(id, cate_name, cate_alias)
  }
  const deleteCategory = async (id) => {
    await deleteCategoryService(id)
  }

  return {
    categoryList,
    addCategory,
    getCategorys,
    setCategoryList,
    updateCategory,
    deleteCategory
  }
}, {
  persist: true
})