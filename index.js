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
        const reviewCollection = client.db("HomemadeCrunch").collection("reviews")

        // services api
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

        app.get("/services/:id",async(req,res)=>{
           const id = req.params.id 
           const result = await serviceCollection.findOne({_id:ObjectId(id)})
           res.send({
            status:true,
            data:result
           })
        })


        // review api
        app.get("/reviews",async(req,res)=>{
            const id = req.query.serviceId
            console.log(id)
            const query = {serviceId:id}
            const result = await reviewCollection.find(query).toArray()
            res.send({
                data:result
            })
        })

        app.post("/reviews",async(req,res)=>{
            const review = req.body 
            const result = await reviewCollection.insertOne(review)
            res.send(result)
        })

        app.get("/myreviews",async(req,res)=>{
            const emailAdd= req.query.email 
            const query={email:emailAdd}
            const result = await reviewCollection.find(query).toArray()
            res.send({
                data:result
            })
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