import pool from './config/db.js'; /** Ajusta tu import según tu configuración*/
 
async function crearBBDD() {
// TABLA LIKES
  await pool.query(`
    CREATE TABLE IF NOT EXISTS likes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      page_id VARCHAR(255) NOT NULL,
      user_ip VARCHAR(45) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (page_id, user_ip)
    );
  `);
}
 
// Ejecutar todo
(async () => {
  await crearBBDD();  
})();
 
 