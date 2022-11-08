const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000 

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ojtfupc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const serviceCollection = client.db("HomemadeCrunch").collection("services")

        app.get("/services",async(req,res)=>{
            const size = parseInt(req.query.size)
            if(size){
              result = await serviceCollection.find({}).limit(size).toArray()
            }
            else{
             result = await serviceCollection.find({}).toArray()
            }
            res.send({
                status:true,
                data:result
            })
        })

        app.get("/service/:id",async(req,res)=>{
           const id = req.params.id 
           const result = await serviceCollection.findOne({_id:ObjectId(id)})
           send({
            status:true,
            data:result
           })
           console.log(result)
        })
    
    }
    finally{
        
    }
}
run().catch(error=>console.error(error))










app.get("/",(req,res)=>{
    res.send("iam from kitchen")
})

app.listen(port,()=>{
    console.log(`HomemadeCurnch server is running on ${port}`)
})