import http from "@/api";
import { Comment } from "@/api/interface/index";

export const FrstCommentCreate = (params: Comment.Reqfirst) => {
  return http.post(`/comment/create/first`, params);
};