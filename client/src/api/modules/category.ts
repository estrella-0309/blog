import { ResPage, CateGory, Result } from "@/api/interface/index";
import http from "@/api";

/**
 * @name 分类管理模块
 */
// * 获取用户列表
export const getCategoryList = (params: CateGory.ReqCateGoryList) => {
  return http.get<ResPage<CateGory.ResCateGoryList>>(`/category/all`, params);
};


// * 添加分类
export const newCategory = (params: { name: string }) => {
  return http.post<CateGory.ResCateGoryList>(`/category/_token/create`, params);
};

// * 编辑分类
export const editCategory = (params: CateGory.ResCateGoryList) => {
  return http.put<Result>(`/category/_token/update`, params);
};

// * 删除分类
export const deleteCategory = (params: { category_id: number }) => {
  return http.delete<Result>(`/category/_token/delete`, params);
};
