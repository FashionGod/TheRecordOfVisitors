// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  let allVisitorNumber;
  let todayvisitorNumber;
  let appSetting;
  try{

    //顺便拿一下appSetting的值
    await db.collection('admin').where({
      appSetting:true
    }).get().then(res => {
      // console.log(res.total)
      appSetting =res
    })


 await db.collection('visitors-Info').count().then(res => {
  // console.log(res.total)
  allVisitorNumber =res.total
})

await db.collection('visitors-Info').where({
  visitData: db.RegExp({
    regexp: event.today,
    //从搜索栏中获取的value作为规则进行匹配。
    options: 'i',
    //大小写不区分
  })
}).count().then(res => {
  // console.log(res.total)
  todayVisitorNumber =res.total
})
    
}
catch(e) {
  mess.code = -1
  mess.err = e
}

return {
  allVisitorNumber,
  todayVisitorNumber,
  appSetting
}
}