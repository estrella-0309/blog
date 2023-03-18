import { ResPage, User, CateGory, Result } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 分类管理模块
 */
// * 获取用户列表
export const getCategoryList = (params: CateGory.ReqCateGoryList) => {
  return http.get<ResPage<CateGory.ResCateGoryList>>( `/category/all`, params);
};


// * 添加分类
export const newCategory = (params: {name:string}) => {
  return http.post<Result>( `/category/_token/create`, params);
};

// * 编辑分类
export const editCategory = (params: CateGory.ReqCateGoryList) => {
  return http.put<Result>( `/api/category/update`, params);
};

// * 删除分类
export const deleteUser = (params: { id: string[] }) => {
  return http.post(PORT1 + `/user/delete`, params);
};
