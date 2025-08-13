const { connect } = require("mongoose");
module.exports = async () => {
    let url = ""
    if(!url){
         console.log("Falta Una url para la database")
    } else {
    console.log('Started connecting to MongoDB...');
    await connect(url).then(() => {
        console.log('MongoDB is connected to the atlas!', 'done')
    });
}
};