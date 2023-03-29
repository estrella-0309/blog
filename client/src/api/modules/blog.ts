import http from "@/api";
import { ResultData,ResPage, ReqPage, blog ,Tags} from "@/api/interface/index";

export const getBlogList = (params: ReqPage) => {
  return http.get<ResPage<blog.ResUserList>>(`/blog/all`, params);
};

export const getTopSearchList = () => {
  return http.get<blog.ResUserList[]>(`/blog/view`);
};
export const getCategoryListByid = (params:blog.ReqCateid) => {
  return http.get<ResPage<blog.ResUserList>>(`/blog/category`,params);
};
export const getBlogByid = (params: {id:string}) => {
  return http.get<any>(`/blog/one`, params);
};

export const getSearchBlogList = (params: { searchstr: string }) => {
  return http.get<blog.searchlist[]>(`/blog/search`, params);
};

export const getTagNums = () => {
  return http.get<Tags.ResTagNumslist[]>(`/blog/tag/num`);
};
export const getBlogbyTime = () => {
  return http.get<any>(`/blog/timeline`);
};

