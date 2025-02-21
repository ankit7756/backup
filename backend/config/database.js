// // // // database/db.js
// // // const { Sequelize } = require('sequelize');

// // // // Sequelize setup: PostgreSQL connection
// // // const sequelize = new Sequelize(
// // //   process.env.PG_DATABASE,  // Database name
// // //   process.env.PG_USER,      // Database user
// // //   process.env.PG_PASSWORD,  // Database password
// // //   {
// // //     host: process.env.PG_HOST,  // Host of the database (usually localhost for local development)
// // //     port: process.env.PG_PORT,  // Port number for PostgreSQL (default is 5432)
// // //     dialect: 'postgres',        // Dialect is PostgreSQL
// // //   }
// // // );

// // // // Function to test the database connection
// // // const connection = async () => {
// // //   try {
// // //     await sequelize.authenticate();  // Attempt to authenticate the connection
// // //     console.log("Database connected successfully!");
// // //   } catch (error) {
// // //     console.error("Failed to connect to the database:", error);
// // //   }
// // // };

// // // // Exporting sequelize and connection function
// // // module.exports = { sequelize, connection };

// // const { Sequelize } = require("sequelize");

// // const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
// //   host: process.env.DB_HOST,
// //   dialect: "postgres",
// // });

// // const connection = async () => {
// //   try {
// //     await sequelize.authenticate();
// //     console.log("Database connected successfully.");
// //   } catch (error) {
// //     console.log("Failed to connect to the database:", error);
// //   }
// // };

// // module.exports = { sequelize, connection };

// // const { Sequelize } = require('sequelize');

// // const sequelize = new Sequelize('Testing', 'postgres', '@nkit123', {
// //   host: 'localhost',
// //   dialect: 'postgres'
// // });

// // // Authenticate database connection
// // sequelize.authenticate()
// //   .then(() => console.log('Database connected successfully!'))
// //   .catch(err => console.error('Failed to connect to database:', err));

// // module.exports = sequelize; // Only export sequelize (no connection function)


// // Chatgpt

// const { Sequelize } = require("sequelize");

// // Create a new Sequelize instance
// const sequelize = new Sequelize(process.env.POSTGRES_URI, {
//   dialect: "postgres",
//   logging: false, // Set to true to see SQL queries in console
// });

// // Function to connect to the database
// const connectDB = async () => {
//   try {
//     await sequelize.authenticate(); // Check connection
//     console.log("Database Connected Successfully!");
//   } catch (error) {
//     console.error("Database Connection Error:", error.message);
//     process.exit(1); // Exit the process if connection fails
//   }
// };

// // Export both Sequelize instance and connection function
// module.exports = { sequelize, connectDB };




// // Gemini

// // const { Sequelize } = require("sequelize");

// // // Create a new Sequelize instance.  Directly use environment variables.
// // const sequelize = new Sequelize(
// //   process.env.PG_DATABASE, // Database name
// //   process.env.PG_USER,     // Username
// //   process.env.PG_PASSWORD, // Password
// //   {
// //     host: process.env.PG_HOST, // Host
// //     port: process.env.PG_PORT, // Port
// //     dialect: "postgres",
// //     logging: false, // Set to true to see SQL queries in console (for development)
// //   }
// // );


// // const connectDB = async () => {
// //   try {
// //     await sequelize.authenticate(); // Check connection
// //     console.log("Database Connected Successfully!");
// //   } catch (error) {
// //     console.error("Database Connection Error:", error.message);
// //     process.exit(1); // Exit the process if connection fails
// //   }
// // };

// // module.exports = { sequelize, connectDB };


// // Claude

// // const { Sequelize } = require('sequelize');

// // const sequelize = new Sequelize(
// //     process.env.DB_NAME || 'aptify',
// //     process.env.DB_USER || 'postgres',
// //     process.env.DB_PASSWORD,
// //     {
// //         host: process.env.DB_HOST || 'localhost',
// //         port: process.env.DB_PORT || 5432,
// //         dialect: 'postgres',
// //         logging: false, // Set to true if you want to see SQL queries in console
// //         pool: {
// //             max: 5,
// //             min: 0,
// //             acquire: 30000,
// //             idle: 10000
// //         }
// //     }
// // );

// // const connectDB = async () => {
// //     try {
// //         await sequelize.authenticate();
// //         // Sync models with database (in development)
// //         // In production, you should use migrations instead
// //         await sequelize.sync({ alter: true });
// //         console.log('Database Connected');
// //     } catch (error) {
// //         console.error('Database Connection Error:', error.message);
// //         process.exit(1);
// //     }
// // };

// // module.exports = {
// //     sequelize,
// //     connectDB
// // };

// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(
//   process.env.PG_DATABASE,
//   process.env.PG_USER,
//   process.env.PG_PASSWORD,
//   {
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     dialect: 'postgres',
//   }
// );

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connected successfully!");
//   } catch (error) {
//     console.error("Failed to connect to the database:", error);
//   }
// };

// export { sequelize, connectDB };


// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(
//   process.env.PG_DATABASE,
//   process.env.PG_USER,
//   process.env.PG_PASSWORD,
//   {
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     dialect: "postgres",
//     logging: false, // Remove logs for clean console output
//   }
// );

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connected successfully!");

//     // Synchronize all models with the database (ONLY DO THIS ONCE)
//     // await sequelize.sync({ alter: true });
//     // console.log("All models were synchronized successfully.");
//   } catch (error) {
//     console.error("Failed to connect to the database:", error);
//   }
// };

// export { sequelize, connectDB };

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: "postgres",
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    // Only run this once when setting up the database for the first time
    // Then comment it out to prevent data loss
    // await sequelize.sync({ alter: true });

  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};