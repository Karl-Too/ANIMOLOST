// Import necessary modules
const { TableServiceClient } = require("@azure/data-tables");
const { v4: uuidv4 } = require("uuid");

module.exports = async function (context, req) {
    // Check if the request method is POST
    if (req.method !== "POST") {
        context.res = {
            status: 405, // Method Not Allowed
            body: { message: "Method not allowed. Please use POST." }
        };
        return;
    }

    const connectionString = process.env.AzureWebJobsStorage; // Use the connection string from the environment variables
    const tableService = TableServiceClient.fromConnectionString(connectionString);
    const tableClient = tableService.getTableClient("LostItems");

    try {
        // Destructure required fields from the request body
        const { username, section, description, mainCategory, subCategory } = req.body;

        // Validate required fields
        if (!username || !section || !description || !mainCategory || !subCategory) {
            context.res = {
                status: 400, // Bad Request
                body: { message: "Missing required fields." }
            };
            return;
        }

        const item = {
            PartitionKey: "LostItem", // Partition key for the table
            RowKey: uuidv4(), // Unique row key
            username,
            section,
            description,
            category: mainCategory,
            subCategory,
            timeLogged: new Date().toISOString() // Timestamp
        };

        // Save the item to the table
        await tableClient.createEntity(item);

        context.res = {
            status: 201, // Created
            body: { message: "Item saved successfully." }
        };
    } catch (error) {
        context.log.error("Error saving data:", error);
        context.res = {
            status: 500, // Internal Server Error
            body: { message: "Error saving data", details: error.message }
        };
    }
};
