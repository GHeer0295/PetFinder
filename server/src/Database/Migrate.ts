import { db } from './Database';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const migrationsFolder = process.argv.at(2);
if(!migrationsFolder) {
    console.error('Missing argument: migration folder');
    process.exit(1);
}

console.log('Running migration...');
migrate(db, { migrationsFolder })
    .then(() => {
        console.log('Migration complete');
        process.exit(0);
    })
    .catch(err => {
        console.error(`Error running migration: ${err}`);
        process.exit(1);
    });
