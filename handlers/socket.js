const {User, Message} = require('../database/db');

const setConnectedUser = async ( uid = 0 ) => {
 //  try {
    const [numberOfAffectedRows, affectedRows] = await User.update({ 
        online: true
      }, {
        where: {uid: uid},
        returning: true, 
        plain: true, 
        query: {raw: true}
      });

    return affectedRows['dataValues'];
   //} catch (error) {
    //   console.log(error)
  // }
}

const setDisconnectedUser = async ( uid = 0 ) => {
   // try {
        const [numberOfAffectedRows, affectedRows] = await User.update({ 
            online: false
          }, {
            where: {uid: uid},
            returning: true, 
            plain: true, 
            query: {raw: true}
        });

        return affectedRows['dataValues'];
 //  } catch (error) {
  //     console.log(error)
  // }

}

const saveMessage = async( payload ) => {
    try {
        const message = new Message( payload );
        await message.save(payload);

        return true;
    } catch (error) {
        return false;
    }
}


module.exports = {
  setConnectedUser,
  setDisconnectedUser,
  saveMessage
}
