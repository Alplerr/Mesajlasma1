import { defineEventHandler, useNitroApp, setResponseHeader } from 'h3';
import jwt from 'jsonwebtoken';
import { getSession } from '../config/db';

// JWT doğrulama işlevi
const authenticateToken = async (event) => {
  const authHeader = event.req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    event.res.statusCode = 401;
    event.res.end('Unauthorized');
    return;
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    event.req.user = user;
    return true;
  } catch (err) {
    event.res.statusCode = 403;
    event.res.end('Forbidden');
    return false;
  }
};

// Kullanıcı doğrulama işlevi
export default defineEventHandler(async (event) => {
  try {
    // Token doğrulama
    const isAuthenticated = await authenticateToken(event);

    if (!isAuthenticated) return;

    const { username, password } = event.req.body;

    // Veritabanı kontrolü
    const user = await getSession(username, password);

    if (user) {
      // Kullanıcı var ve doğrulandı
      event.req.user = user;
    } else {
      // Kullanıcı doğrulanamadı
      event.res.statusCode = 401;
      event.res.end('Unauthorized');
    }
  } catch (error) {
    event.res.statusCode = 500;
    event.res.end('Internal Server Error');
  }
});

