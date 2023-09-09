const {MongoClient} = require('mongodb')

let dbConnection
// let uri1 = 'mongodb://localhost:27017'
let uri2 = 'mongodb+srv://asterisk:tester123@psycologist.izi7wdg.mongodb.net/psycologist?retryWrites=true&w=majority'
module.exports = {
    connectToDb : (cb) => {
        MongoClient.connect(uri2)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch (err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}
