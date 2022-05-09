import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * Load .env file
 */
dotenv.config({ path: path.join(process.cwd(), `.env`) });

/**
 * Environment variables
 */
export const env = {
    user: process.env['USER'] as string,
    password: process.env['PASSWORD'] as string
};
