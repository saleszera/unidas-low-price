import app from './app';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const interval = 1000 * 60 * 60 * 2;
const endAt = new Date('03/03/2023').toLocaleDateString();

app({ interval, endAt });
