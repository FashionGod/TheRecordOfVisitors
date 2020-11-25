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
  let listData 
  try {
    //姓名查找
    if(event.select_flag == 0) {
      listData = await db.collection('visitors-Info')
      .aggregate()
      .match({
        visitorName: event.visitorName
      })
      .limit(200)
      .end()
    }
    //手机号查找
    else if(event.select_flag == 1) {
      listData = await db.collection('visitors-Info')
      .aggregate()
      .match({
        visitorPhonenum: event.visitorPhonenum
      })
      .limit(200)
      .end()
      console.log(listData)
    }
    //公司名查找
    else if(event.select_flag == 2) {
      listData = await db.collection('visitors-Info')
      .aggregate()
      .match({
        visitorTeamName: event.visitorTeamName
      })
      .limit(200)
      .end()
    }
    //日期查找
    else {
      let vistDate = event.chooseDate.split('-').join('/')
      await db.collection('visitors-Info')
      .aggregate()
      .project({
        visitData: 1,
        aStrIndex: $.indexOfBytes(['$visitData', vistDate])
      })
      .project({
        matched: $.gt(['$aStrIndex', -1])
      })
      .match({
        matched:true
      })
      .project({
        _id:1
      })
      .limit(200)
      .end()
      .then(res=>{
        reasultList = res.list
      })
      listDatat = []
      listData = []
      for(let i = 0; i < reasultList.length; i++) {
        listDatat[i] = await db.collection('visitors-Info').where({
          _id: reasultList[i]._id
        })
        .get()
      }
      for(let i = 0; i < listDatat.length; i++) {
        listData[i] = listDatat[i].data[0]
      }
    }
    mess.code = 0
    mess.listData = listData
  }
  catch(e) {
    mess.code = -1
    mess.err = e
  }
  return mess
}