import { Comment } from "vue";

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
  export interface ReqCateGoryList {
    page: number,
    size: number
  }
  export interface ResCateGoryList {
    category_id: number,
    name: string,
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
    color: string
  }
  export interface ResTagNumslist {
    color: string; name: string, nums: number, tag_id: number
  }
}

export namespace commenttype {

  export interface ReqSecond {
    parent_nickname:string
  }

  export interface Reqfirst {
    blog_id: string,
    user_id: number,
    content: string,
    [key: string | number]: string | number | boolean;
  }
  export interface ReqGetComment{
    page:number,
    size:number,
    blog_id:string
  }
  export interface comment {
    blog_id:string,
    comment_id:number,
    content:string,
    createtime:string,
    isbanned:0|1,
    parent_id:string|null,
    parent_qqnumber:number|null,
    user_id:number
  }
}


// * 用户管理模块
export namespace blog {
  export interface ResUserList {
    blog_id: number,
    category_id: string,
    title: string,
    content: string,
    createtime: string,
    tag: string,
    status: number,
    istop: number,
    first_pic: string,
    view: number,
    introduce: string
  }
  export interface searchlist {
    blog_id: number,
    title: string,
    createtime: string,
  }

  export interface details {
    blog_id: number,
    category_id: string,
    title: string,
    content: string,
    createtime: string,
    tag: object,
    status: number,
    istop: number,
    first_pic: string,
    view: number,
    introduce: string
  }
  export interface ReqCateid extends ReqPage {
    id: string
  }

  export interface Reqcreate {
    category_id: number,
    title: string,
    content: string,
    tag: string,
    first_pic: string,
    introduce: string
  }
  export interface Requpdate {
    category_id: number,
    title: string,
    content: string,
    tag: string,
    first_pic: string,
    introduce: string
  }
}

