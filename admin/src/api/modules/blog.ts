import { ResPage, ReqPage, Blog } from "@/api/interface/index";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// * 获取用户列表
export const getUserList = (params: ReqPage) => {
  return http.post<ResPage<Blog.ResUserList>>( `/blog/all`, params);
};

