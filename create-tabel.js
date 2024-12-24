import { sql } from './sql.js';

sql`
CREATE TABLE videos (
    title TEXT,
    description TEXT,
    duration INTEGER NOT NULL
);
`;