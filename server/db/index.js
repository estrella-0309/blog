
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '8.130.96.111',
  user: 'blog',
  password: 'luozeng123',
  database: 'blog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true //这里一定要加上这个。先别管什么用，一定要加上。
})

async function query(sql, values) {
  const connection = await pool.getConnection();
  try {
    const [rows, fields] = await connection.query(sql, values);
    // console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}
async function insert(table, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;
  try {
    let result= await query(sql, values);
    return result;
  } catch (error) {
    throw error;

  }

}

async function update(table, data, where) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const whereKeys = Object.keys(where);
  const whereValues = Object.values(where);
  const sql = `UPDATE ${table} SET ${keys.map(key => `${key} = ?`).join(', ')} WHERE ${whereKeys.map(key => `${key} = ?`).join(' AND ')}`;
  return await query(sql, [...values, ...whereValues]);
}
async function remove(table, where) {
  const whereKeys = Object.keys(where);
  const whereValues = Object.values(where);
  const sql = `DELETE FROM ${table} WHERE ${whereKeys.map(key => `${key} = ?`).join(' AND ')}`;
  return await query(sql, whereValues);
}
module.exports = { query, insert, update, remove };