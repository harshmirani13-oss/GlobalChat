const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb://harshmirani11_db_user:PASSWORD@159.41.168.48:27017,159.41.168.61:27017,159.41.168.53:27017/chatapp?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        await client.db("admin").command({
            ping: 1
        });

        console.log("✅ Connected to MongoDB!");

    } catch (err) {
        console.log("❌ Failed:");
        console.log(err);

    } finally {
        await client.close();
    }
}

run();