import { drizzle } from 'drizzle-orm/node-postgres/driver';
import { Pool } from 'pg';
import * as schema from './Schema';
import 'dotenv/config';

const getDbConfigOrThrow = (key: keyof typeof process.env): string => {
    const config = process.env[key];
    if(config) return config;

    console.error(`Error: Missing configuration for ${key} in process.env`);
    process.exit(1);
};

const dbPort = parseInt(getDbConfigOrThrow('DB_PORT'));
if(isNaN(dbPort)) {
    console.error('Error: DB_PORT must be a number');
    process.exit(1);
}

const client = new Pool({
    host: getDbConfigOrThrow('DB_HOST'),
    user: getDbConfigOrThrow('DB_USER'),
    port: dbPort,
    password: getDbConfigOrThrow('DB_PASS'),
    database: getDbConfigOrThrow('DB_DATABASE')
});

export const db = drizzle(client, { schema });
