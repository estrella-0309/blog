import http from "@/api";
import { commenttype } from "@/api/interface/index";

export const FrstCommentCreate =async (params: commenttype.Reqfirst) => {
  return http.post(`/comment/create/first`, params);
};
export const SecondCommentCreate = async (params: commenttype.ReqSecond) => {
  return http.post(`/comment/create/second`, params);
};
export const getCommentbyId = (params:commenttype.ReqGetComment) => {
  return http.get<Object>(`/comment`, params);
};
