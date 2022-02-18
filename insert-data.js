const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://wei:jklasd@lesson.0zazi.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "lesson3145";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("order information");

         // Construct a document                                                                                                                                                              
         let orderDocument = {
             "name":"alkrgv",
             "phone number": 64905646,
             "lesson ID": 1001,                                                                                                                                                                                                                                                      
             "number of space": 1,
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(orderDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);