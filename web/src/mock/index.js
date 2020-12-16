// 引入mockjs
import Mock from 'mockjs'

const random = Mock.Random

// 拦截ajax请求，配置mock的数据
Mock.mock(/\/api\/login/, 'post', (req) => {
    const {
        username
    } = JSON.parse(req.body)
    console.log(username)
    return {
        Success: true,
        Data: {
            UserInfo: {
                username,
                img: random.dataImage('200x100')
            },
            Token: random.guid(),
        }
    }
})

const dataTmp = {
    ID: '@increment',
    PointCode:"@word",
    PointName:random.ctitle(),
    Lat: '@float',
    Lng: '@float',
    Size: '@string()',
    CreatedAt: '@datetime',
}

// 拦截ajax请求，配置mock的数据
Mock.mock(/\/api\/points/, 'get', (req) => {
    const {
        pageSize
    } = JSON.parse(req.body)

    const List = []
    for (let i = 0; i < pageSize; i++) {
        List.push(Mock.mock(dataTmp))
    }
    const data = {
        List,
        TotalCount:45
    }
    return {
        Success: true,
        Data: data
    }
})

Mock.mock(/\/api\/point/, 'get', () => {
    const data = Mock.mock(dataTmp)
    return {
        Success: true,
        Data: data
    }
})

// 拦截ajax请求，配置mock的数据
Mock.mock(/\/api\/cameras/, 'get', (req) => {
    const {
        pointCode
    } = JSON.parse(req.body)
    console.log(pointCode);

    const List = []
    for (let i = 0; i < random.integer(1,5); i++) {
        List.push(Mock.mock({
            ID: '@increment',
            Name:"摄像头",
            Url: '@url',
        }))
    }
    const data = {
        List,
        TotalCount:45
    }
    return {
        Success: true,
        Data: data
    }
})

// 拦截ajax请求，配置mock的数据
Mock.mock(/\/api\/boats/, 'get', (req) => {
    const {
        pageSize
    } = JSON.parse(req.body)
    const List = []
    for (let i = 0; i < pageSize; i++) {
        List.push(Mock.mock({
            ID: '@increment',
            MMSI:"@natural",
            Name: '船舶名称',
            EnName:"landaigongzhu",
            IMO:"@string(5)",
            Callsign:"@zip",
            CreatedAt: '@datetime',
        }))
    }
    const data = {
        List,
        TotalCount:45
    }
    return {
        Success: true,
        Data: data
    }
})

// 拦截ajax请求，配置mock的数据
Mock.mock(/\/api\/abnormal/, 'get', (req) => {
    const {
        pageSize
    } = JSON.parse(req.body)
    const List = []
    for (let i = 0; i < pageSize; i++) {
        List.push(Mock.mock({
            ID: '@increment',
            MMSI:"@natural",
            Name: '蓝黛公主',
            Type:["AIS未开启","航位偏离","驾驶失误"][random.integer(0,2)],
            Point:"黄浦江3号",
            CreatedAt: '@datetime',
        }))
    }
    const data = {
        List,
        TotalCount:45
    }
    return {
        Success: true,
        Data: data
    }
})

console.log('%c前端 mock 环境启动成功', 'color: #38f;font-weight: bold')

export default Mock