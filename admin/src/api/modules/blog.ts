import { ResPage, ReqPage, Blog } from "@/api/interface/index";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// * 获取用户列表
export const getBlogList = (params: ReqPage) => {
  return http.get<ResPage<Blog.ResUserList>>( `/blog/all`, params);
};
export const getBlogById = (params: {blog_id:number}) => {
  return http.get<Blog.ResUserList>(`/blog/one`, params);
};
export const CreateBlogList = (params: Blog.Reqcreate) => {
  return http.post(`/blog/_token/create`, params);
};
export const DeleteBlogByid = (params: { blog_id: number }) => {
  return http.delete(`/blog/_token/delete`, params);
};
export const UpdateBlogByid = (params: Blog.Requpdate) => {
  return http.put(`/blog/_token/update`, params);
};

export const TopNews = (params:{blog_id:Number}) => {
  return http.put(`/blog/_token/top`, params);
};

export const UnTopNews = (params: { blog_id: Number }) => {
  return http.put(`/blog/_token/top/cannel`, params);
};

export const ViewNews = (params: { blog_id: Number }) => {
  return http.put(`/blog/_token/view`, params);
};

export const UnViewNews = (params: { blog_id: Number }) => {
  return http.put(`/blog/_token/view/cannel`, params);
};
