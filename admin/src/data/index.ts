export function MenuList(): any {
    return [
        {
            "path": "/home/index",
            "name": "home",
            "component": "/dashboard/index",
            "meta": {
                "icon": "HomeFilled",
                "title": "首页",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": true,
                "isKeepAlive": true
            }
        },

        {
            "path": "/proTable",
            "name": "proTable",
            "redirect": "/proTable/useProTable",
            "meta": {
                "icon": "MessageBox",
                "title": "博客管理",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": true
            },
            "children": [
                {
                    "path": "/blog/write",
                    "name": "writleblog",
                    "component": "/blog/index",
                    "meta": {
                        "icon": "EditPen",
                        "title": "写博客",
                        "isLink": "",
                        "isHide": false,
                        "isFull": false,
                        "isAffix": false,
                        "isKeepAlive": true
                    },
                },
                {
                    "path": "/blog/manage",
                    "name": "blogmanage",
                    "component": "/blog/blogmanage",
                    "meta": {
                        "icon": "Tickets",
                        "title": "文章管理",
                        "isLink": "",
                        "isHide": false,
                        "isFull": false,
                        "isAffix": false,
                        "isKeepAlive": true,
                    }
                }
            ]
        },
        {
            "path": "/blog/category",
            "name": "category",
            "component": "/category/index",
            "meta": {
                "icon": "Menu",
                "title": "分类管理",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": true
            }
        },
        {
            "path": "/blog/tag",
            "name": "tag",
            "component": "/tag/index",
            "meta": {
                "icon": "Briefcase",
                "title": "标签管理",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": true
            },
        },
        {
            "path": "/blog/comment",
            "name": "comment",
            "component": "/comment/index",
            "meta": {
                "icon": "Tickets",
                "title": "评论管理",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": true
            },
        },
        {
            "path": "/system",
            "name": "system",
            "redirect": "/system/accountManage",
            "meta": {
                "icon": "Tools",
                "title": "系统管理",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": true
            },
            "children": [
                {
                    "path": "/system/accountManage",
                    "name": "accountManage",
                    "component": "/system/accountManage/index",
                    "meta": {
                        "icon": "Menu",
                        "title": "账号管理",
                        "isLink": "",
                        "isHide": false,
                        "isFull": false,
                        "isAffix": false,
                        "isKeepAlive": true
                    }
                },
            ]
        },
        
    ]
}

export function AuthButtons(): any {
    return {
        "useProTable": [
            "add",
            "batchAdd",
            "export",
            "batchDelete",
            "status"
        ],
        "authButton": [
            "add",
            "edit",
            "delete",
            "import",
            "export"
        ]
    }
}

export function UserList(): any {
    return {
        "list": [
            {
                "id": "035722203467301802",
                "username": "杨秀英",
                "gender": 1,
                "user": {
                    "detail": {
                        "age": 25
                    }
                },
                "idCard": "035722203467301802",
                "email": "s.vhm@mvtrkzf.net",
                "address": "江西省 上饶市",
                "createTime": "1974-03-27 06:43:51",
                "status": 1,
                "avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
            },
            {
                "id": "758372337945652628",
                "username": "石伟",
                "gender": 2,
                "user": {
                    "detail": {
                        "age": 16
                    }
                },
                "idCard": "758372337945652628",
                "email": "b.sahvngmqii@ojkcw.zm",
                "address": "云南省 大理白族自治州",
                "createTime": "1998-05-11 05:27:29",
                "status": 1,
                "avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
            },
            {
                "id": "450072321542115694",
                "username": "金超",
                "gender": 2,
                "user": {
                    "detail": {
                        "age": 23
                    }
                },
                "idCard": "450072321542115694",
                "email": "k.wmbqxz@ljyvztllt.pf",
                "address": "陕西省 榆林市",
                "createTime": "2000-03-31 06:05:11",
                "status": 1,
                "avatar": "https://i.imgtg.com/2023/01/16/QRa0s.jpg"
            },
            {
                "id": "464853227842202368",
                "username": "田平",
                "gender": 2,
                "user": {
                    "detail": {
                        "age": 11
                    }
                },
                "idCard": "464853227842202368",
                "email": "j.djywqu@vsghi.sg",
                "address": "四川省 甘孜藏族自治州",
                "createTime": "2010-12-05 05:18:26",
                "status": 0,
                "avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
            },
            {
                "id": "002918839727762512",
                "username": "贾洋",
                "gender": 2,
                "user": {
                    "detail": {
                        "age": 18
                    }
                },
                "idCard": "002918839727762512",
                "email": "f.sdwprbi@scldj.mz",
                "address": "辽宁省 丹东市",
                "createTime": "1987-08-17 07:54:06",
                "status": 0,
                "avatar": "https://i.imgtg.com/2023/01/16/QRBHS.jpg"
            },
            {
                "id": "479048382063896858",
                "username": "贾杰",
                "gender": 1,
                "user": {
                    "detail": {
                        "age": 24
                    }
                },
                "idCard": "479048382063896858",
                "email": "o.fhqbdz@rwqlf.tz",
                "address": "江苏省 连云港市",
                "createTime": "2014-08-06 10:45:09",
                "status": 1,
                "avatar": "https://i.imgtg.com/2023/01/16/QR57a.jpg"
            },
            {
                "id": "374455784193551588",
                "username": "郑艳",
                "gender": 2,
                "user": {
                    "detail": {
                        "age": 11
                    }
                },
                "idCard": "374455784193551588",
                "email": "w.evfd@nsunscjwkr.pw",
                "address": "河南省 濮阳市",
                "createTime": "2012-01-28 16:18:14",
                "status": 1,
                "avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
            },
            {
                "id": "910407996872917027",
                "username": "康洋",
                "gender": 1,
                "user": {
                    "detail": {
                        "age": 11
                    }
                },
                "idCard": "910407996872917027",
                "email": "f.fuplku@vxcsdhnctm.sy",
                "address": "山西省 运城市",
                "createTime": "2011-06-07 01:53:25",
                "status": 1,
                "avatar": "https://i.imgtg.com/2023/01/16/QR57a.jpg"
            },
            {
                "id": "955646337974367569",
                "username": "石军",
                "gender": 1,
                "user": {
                    "detail": {
                        "age": 21
                    }
                },
                "idCard": "955646337974367569",
                "email": "i.ijruncjed@dpcrbmbgh.al",
                "address": "山东省 德州市",
                "createTime": "2007-03-13 01:46:45",
                "status": 1,
                "avatar": "https://i.imgtg.com/2023/01/16/QRa0s.jpg"
            },
            {
                "id": "834837162710557711",
                "username": "蔡超",
                "gender": 2,
                "user": {
                    "detail": {
                        "age": 25
                    }
                },
                "idCard": "834837162710557711",
                "email": "f.qohwirwp@tbntqou.mn",
                "address": "安徽省 芜湖市",
                "createTime": "2000-03-25 01:26:21",
                "status": 1,
                "avatar": "https://i.imgtg.com/2023/01/16/QRqMK.jpg"
            }
        ],
        "pageNum": 1,
        "pageSize": 10,
        "total": 2000
    }
}