// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'fangkejilu-jcgws',
})
const db = cloud.database();
const $ = db.command.aggregate
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var mess = {}
  try{
    var result = await db.collection('visitors-Info').where({
      visitData: event.visitData
    }).remove();
    mess.result = result
    mess.code = 0
  }
  catch(e){
    mess.err = e
    mess.code = -1
  }
  return mess
}