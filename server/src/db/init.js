// Creates the tables. Run once with: npm run db:init
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { pool } from './pool.js'

const schemaPath = fileURLToPath(new URL('./schema.sql', import.meta.url))
const sql = await readFile(schemaPath, 'utf8')

await pool.query(sql)
console.log('Tables are ready.')
await pool.end()
