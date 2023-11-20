import dotenv from "dotenv";

dotenv.config();

interface propertiesInterface {
    PORT: number; // in development
    SERVER_URL: string;
    MONGO_URI: string;
    JWT_SECRET: string;
    AES_SECRET: string;
}

const properties:propertiesInterface = {
    PORT: Number(process.env.PORT) || 3000,
    SERVER_URL: process.env.SERVER_URL || `https://authenticator-api-production-8231.up.railway.app`,
    MONGO_URI: process.env.MONGO_URI || 
        `mongodb+srv://abhisekhupa:Abhi07080721@cluster0.cleu6ig.mongodb.net/heliverse`,
    JWT_SECRET: process.env.JWT_SECRET || "jdfjsdkjfdskjhuyu",
    AES_SECRET: process.env.AES_SECRET || "trertjsdkjfdskjhuyu"
}

export default properties;