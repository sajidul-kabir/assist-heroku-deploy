const Professional = require("../model/professionalModel");
const Consumer = require("../model/consumerModel");

exports.getChatInfo = async (req, res) => {
  const receiverId = req.params.id;
  const { id, role } = req.user;
  let error = false;
  let senderInfo;
  let receiverInfo;
  try {
    if (role === "consumer") {
      senderInfo = await Consumer.findById(id);
      receiverInfo = receiverId
        ? await Professional.findById(receiverId)
        : null;
    } else {
      senderInfo = await Professional.findById(id);
      receiverInfo = receiverId ? await Consumer.findById(receiverId) : null;
    }
    if(!receiverInfo){
      if (role === "consumer") {
        receiverInfo=await Consumer.findById(id);
      }else{
        receiverInfo=await Professional.findById(id)
      }
    }
  } catch (err) {
    error = true;
  }
  if (error) {
    if (role === "consumer") {
      senderInfo = await Consumer.findById(id);
      receiverInfo = null;
    } else {
      senderInfo = await Professional.findById(id);
      receiverInfo = null;
    }
  }
  res.send({
    senderInfo,
    receiverInfo,
  });
};


exports.getSingleUser=(req,res)=>{
  res.send({
    user:req.user
  })
}