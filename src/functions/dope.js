const sql = require('mssql');

module.exports = async function (context, req) {
    const { username, section, mainCategory, subCategory, description } = req.body;

    try {
        // Connect to the database
        await sql.connect(process.env['SQL_CONNECTION_STRING']);

        // Insert entry into the database
        await sql.query`
            INSERT INTO [System Table] (Username, Section, MainCategory, SubCategory, Description) 
            VALUES (@username, @section, @mainCategory, @subCategory, @description)
        `
        .input('username', sql.VarChar, username)
        .input('section', sql.VarChar, section)
        .input('mainCategory', sql.VarChar, mainCategory)
        .input('subCategory', sql.VarChar, subCategory)
        .input('description', sql.VarChar, description);

        context.res = {
            status: 200,
            body: { message: "Entry saved successfully!" }
        };
    } catch (error) {
        context.log.error('SQL error:', error);
        context.res = {
            status: 500,
            body: { error: "An error occurred while saving the entry." }
        };
    } finally {
        await sql.close(); // Ensure the database connection is closed
    }
};