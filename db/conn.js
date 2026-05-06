const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/testemongodb2';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect()
        console.log('conectamos ao mongo');

    } catch (err) {
        console.log(err)
    }
}

run();
module.exports = client