import { drizzle } from 'drizzle-orm/node-postgres/driver';
import { Pool } from 'pg';
import * as schema from './Schema';
import { getConfigOrThrow } from '../Util/Util';
import 'dotenv/config';

const dbPort = parseInt(getConfigOrThrow('DB_PORT'));
if(isNaN(dbPort)) {
    console.error('Error: DB_PORT must be a number');
    process.exit(1);
}

const client = new Pool({
    host: getConfigOrThrow('DB_HOST'),
    user: getConfigOrThrow('DB_USER'),
    port: dbPort,
    password: getConfigOrThrow('DB_PASS'),
    database: getConfigOrThrow('DB_DATABASE')
});

export const db = drizzle(client, { schema });
