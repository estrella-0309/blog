// * 请求响应参数(不包含data)
export interface Result {
	status: number;
	message: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}

// * 分页响应参数
export interface ResPage<T> {
	list: T[];
	page: number;
	size: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	page: number;
	size: number;
}

// * 文件上传模块
export namespace Upload {
	export interface ResFileUrl {
		fileUrl: string;
	}
}

// * 登录模块
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		token: string;
	}
	export interface ResAuthButtons {
		[key: string]: string[];
	}
}
export namespace CateGory {
	export interface ReqCateGoryList{
		page:number,
		size:number
	}
	export interface ResCateGoryList{
		category_id:number,
		name:string,
	}
}
export namespace Tags {
	export interface ReqTagsList {
		page: number,
		size: number
	}
	export interface ResTagsList {
		tag_id: number,
		name: string,
		color:string
	}
}



// * 用户管理模块
export namespace Blog {
	export interface ResUserList {
		blog_id:number,
		category_id:number,
		title:string,
		content:string,
		createtime:string,
		tag:string,
		status:number,
		istop: number,
		first_pic:string,
		view:number,
		introduce:string
	}
}
