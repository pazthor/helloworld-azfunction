import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
      const Redis = require("ioredis");
      require("dotenv").config();
      
      const host = process.env.REDIS_HOST;
       const port = 6380;
       const password = process.env.PASSWORD;

        const config = {
            host: host,
            port: Number(port),
            password: password,
            tls: { servername: host }
        }
	 const redis = new Redis(config);
	const value1 = await redis.get('cacheKey');
        const value2 = await redis.get('cacheKey1');
        const value3 = await redis.get('cacheKey2');
	const value = await redis.get('name');

	
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    if (name){
       redis.set('name2',name)
    }
    
    redis.disconnect();
    
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully: este nombre se guardo tiempo atras :v "+ value
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;