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
    secret_key: process.env['SECRET_KEY'] as string,
};
