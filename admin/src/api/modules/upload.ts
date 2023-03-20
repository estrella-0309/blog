import { Upload } from "@/api/interface/index";
import http from "@/api";
/**
 * @name 文件上传模块
 */
// * 图片上传
export const uploadImg = (params: FormData) => {
	return http.post<Upload.ResFileUrl>( `/upload/rich_editor_uplaod`, params);
};
