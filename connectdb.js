require('dotenv').config()
const { MongoClient } = require('mongodb')

async function connectDB(){
  const url = process.env.MONGO_URL;
  try{
    const client = await MongoClient.connect(url)

    return client.db()
  }catch(err){
    console.log(`Connection to MongoDb Error: ${err.message}`)
  }
}

module.exports = connectDB;