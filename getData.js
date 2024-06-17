const connectDB = require('./connectdb')

async function getProducts(){
  try{
    const db = await connectDB();
    const collection = db.collection('products');
    const data = await collection.find().toArray();

    return data;
  }catch(err){
    console.log(`Error getting products: ${err.message}`)
  }
}

async function getDeletedProducts(){
  try{
    const db = await connectDB();
    const collection = db.collection('deleted');
    const data = await collection.find().toArray();

    return data;
  }catch(err){
    console.log(`Error getting deletedItems: ${err.message}`)
  }
}

module.exports = {getProducts, getDeletedProducts};