import { defineEventHandler, setResponseHeader } from 'h3';
import { getSession } from 'config/db';

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await useBody(event);

    // Veritabanı kontrolü
    const user = await getSession(username, password);
    
    if (user) {
      // Kullanıcı girişi yaptı..
      setResponseHeader(event, 'Content-Type', 'application/json');
      return { message: 'User authenticated successfully' };
    } else {
      // Kullanıcı doğrulanamadı
      event.res.statusCode = 401; // yetkisiz erişim kodu
      setResponseHeader(event, 'Content-Type', 'application/json');
      return { error: 'Unauthorized' };
    }
  } catch (error) {
    // Hata durumu
    event.res.statusCode = 500; // İç sunucu hatası kodu
    setResponseHeader(event, 'Content-Type', 'application/json');
    return { error: 'Internal Server Error' };
  }
});
