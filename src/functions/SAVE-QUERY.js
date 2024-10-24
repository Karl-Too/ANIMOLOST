const { app } = require('@azure/functions');
const sql = require('mssql');

app.http('SAVE-QUERY', {
    methods: ['POST'], // Use POST for adding entries
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const body = await request.json(); // Get the JSON body from the request

        // Extract values from the request body
        const username = body.username;
        const section = body.section;
        const mainCategory = body.mainCategory;
        const subCategory = body.subCategory;
        const description = body.description;

        // Connection string from your settings
        const config = {
            user: 'STM24',
            password: 'WeareGroup4!',
            server: 'animolost.database.windows.net',
            database: 'ANIMOLOST',
            options: {
                encrypt: true, // Use encryption
                trustServerCertificate: false // Avoid trusting server certificate
            }
        };

        try {
            // Connect to the database
            await sql.connect(config);

            // Insert entry into the database
            await sql.query`INSERT INTO System Table (Username, Section, MainCategory, SubCategory, Description) 
                            VALUES (@username, @section, @mainCategory, @subCategory, @description)`;

            return {
                status: 200,
                body: { message: "Entry saved successfully!" }
            };
        } catch (error) {
            context.log.error('SQL error:', error);
            return {
                status: 500,
                body: { error: "An error occurred while saving the entry." }
            };
        } finally {
            await sql.close(); // Ensure the database connection is closed
        }
    }
});
