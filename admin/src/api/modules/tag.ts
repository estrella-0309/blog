import { ResPage, ReqPage,Tags, Result } from "@/api/interface/index";
import http from "@/api";

/**
 * @name 分类管理模块
 */
// * 获取用户列表
export const getTagsList = (params: ReqPage) => {
  return http.get<ResPage<Tags.ResTagsList>>(`/tag/all`, params);
};

// * 添加分类
export const newTags = (params: { name: string,color:string }) => {
  return http.post<Tags.ResTagsList>(`/tag/_token/create`, params);
};

// * 编辑分类
export const editTags = (params: Tags.ResTagsList) => {
  return http.put<Result>(`/tag/_token/update`, params);
};

// * 删除分类
export const deleteTags = (params: { tag_id: number }) => {
  return http.delete<Result>(`/tag/_token/delete`, params);
};
