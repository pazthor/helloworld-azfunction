import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from "@azure/identity";
import  { SecretClient } from "@azure/keyvault-secrets";



const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    require("dotenv").config();

    const credential = new DefaultAzureCredential();

    const vaultName =process.env.KEYVAULT_NAME;
    const url = `https://${vaultName}.vault.azure.net/`;

    const client = new SecretClient(url, credential);

    const secretName = "MySecretName";
    const secretNameName = "secretNameName";


    try {

        const name = (req.query.name || (req.body && req.body.name));
        const result = await client.getSecret(secretName);
        const retrievedSecret = await client.getSecret(secretNameName);
        context.log(result);

        const responseMessage = name
            ? "Hola, " + name + ". This HTTP" +result.value+ " triggered function executed successfully." + retrievedSecret.value
            : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };

    } catch (error) {

        context.log(error);

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: error
        };
    }

};

export default httpTrigger;