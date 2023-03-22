import http from "@/api";
import { ResPage, ReqPage, Blog } from "@/api/interface/index";

export const getBlogList = (params: ReqPage) => {
  return http.get<ResPage<Blog.ResUserList>>(`/blog/all`, params);
};