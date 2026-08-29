const dns = require("dns").promises;

const resolver = new dns.Resolver();

resolver.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);

resolver.resolveSrv("_mongodb._tcp.cluster0.voe2q4q.mongodb.net")
    .then(result => {
        console.log("✅ DNS works:");
        console.log(result);
    })
    .catch(error => {
        console.log("❌ DNS failed:");
        console.log(error);
    });