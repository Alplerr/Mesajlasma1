const mysql = require('mysql2');

// bağlantı konfigürasyonunun tanımlanması
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Password1081',
  database: 'my_database'
});
//veritabanına bağlanma işlemi
connection.connect(err => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

// modül olarak dışarı aktarma işlemi
module.exports = connection;

