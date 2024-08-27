const express = require('express');
const app = express();
const db = require('./config/db'); 

// sunucunun başlatılması
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
