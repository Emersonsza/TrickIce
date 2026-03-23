import mysql from 'mysql2';
const db = mysql.createPool(
    {
        host: '172.30.2.46',
        username: 'back',
        password:'12345',
        database: 'trickice'
    }
)

export default db