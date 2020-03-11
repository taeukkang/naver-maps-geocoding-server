const axios = require("axios");
const fastify = require("fastify")({
  logger: true
});
const fs = require("fs");

let configRaw = fs.readFileSync("config.json");
let config = JSON.parse(configRaw);

fastify.register(require("fastify-cors"), {
  origin: (origin, cb) => {
    if (origin.indexOf("localhost") || origin.indexOf("livecorona.co.kr")) {
      //  Request from localhost will pass
      cb(null, true);
      return;
    }
    cb(new Error("Not allowed"), false);
  }
});

fastify.get("/", async (request, reply) => {
  let address = encodeURIComponent(request.query.address);

  let result;
  console.log(request.params);
  try {
    result = await axios.get(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`,
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": config.ncpMapClientId,
          "X-NCP-APIGW-API-KEY": config.ncpMapClientSecret
        }
      }
    );
    console.log(result.data);
    reply.code(200);
    return result.data;
  } catch (error) {
    console.error(error);
    console.log("Failed to retrieve geocoding for: " + request.query.address);
    reply.type("application/json").code(500);
    return { success: false };
  }
});

fastify.listen(config.port || 4000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
