// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init()

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  var mess = {};
  const wxContext = cloud.getWXContext()
  try {

    await db.collection('visitors-Info').add({
      data: {
        visitData: event.visitData,
        visitorName: event.visitorName,
        visitorPhonenum: event.visitorPhonenum,
        visitorId_num: event.visitorId_num,
        visitorTeamName: event.visitorTeamName,
        
        ndaSignPath:event.ndaSignPath,
        visitorPhoto:event.visitorPhoto,
        VisitorInfo: event.newVisitor
      }
    });

    mess.state = "上传成功"

  } catch (e) {
    mess.state = "上传失败"
  }

  return {
    mess
  }
}