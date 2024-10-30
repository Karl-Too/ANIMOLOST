const { TableClient } = require('@azure/data-tables');

module.exports = async function (context, req) {
    const connectionString = process.env.AzureWebJobsStorage; // Ensure you set this in your Function App settings
    const tableName = "LostItems"; // Replace with your actual table name

    const client = TableClient.fromConnectionString(connectionString, tableName);

    try {
        const entities = [];
        for await (const entity of client.listEntities()) {
            entities.push(entity);
        }
        
        context.res = {
            status: 200,
            body: entities,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        context.log(error);
        context.res = {
            status: 500,
            body: "Error retrieving entries"
        };
    }
};
