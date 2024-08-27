export default function (req, res, next) {
  if (req.method === 'POST') {
    
    // eğer post yöntemiyle yapıldıysa başarı mesajı döndürür yoksa hata 405 method not allowed hatasını döndürür.
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Login successful' }));
  } else {
    res.statusCode = 405; 
    res.end('Method Not Allowed');
  }
}
