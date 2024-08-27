<template>
  <div class="auth-container">
    <h1>Giriş Yap</h1>
    <form @submit.prevent="handleLogin" class="auth-form">
      <div class="form-group">
        <label for="username">Kullanıcı Adı:</label>
        <input v-model="loginUsername" type="text" id="loginUsername" required />
      </div>
      <div class="form-group">
        <label for="password">Şifre:</label>
        <input v-model="loginPassword" type="password" id="loginPassword" required />
      </div>
      <button type="submit" class="auth-button">Giriş Yap</button>
    </form>
    <div v-if="loginErrorMessage" class="error">{{ loginErrorMessage }}</div>

    <h1>Kayıt Ol</h1>
    <form @submit.prevent="handleRegister" class="auth-form">
      <div class="form-group">
        <label for="registerUsername">Kullanıcı Adı:</label>
        <input v-model="registerUsername" type="text" id="registerUsername" required />
      </div>
      <div class="form-group">
        <label for="registerPassword">Şifre:</label>
        <input v-model="registerPassword" type="password" id="registerPassword" required />
      </div>
      <button type="submit" class="auth-button">Kayıt Ol</button>
    </form>
    <div v-if="registerErrorMessage" class="error">{{ registerErrorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUsername: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',
      loginErrorMessage: '',
      registerErrorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.loginUsername, password: this.loginPassword })
        });

        const result = await response.json();

        if (response.ok) {
          this.$router.push('/messages'); // Mesajlaşma sayfasına yönlendir
        } else {
          this.loginErrorMessage = result.error || 'Giriş yapılamadı.';
        }
      } catch (error) {
        this.loginErrorMessage = 'Bir hata oluştu.';
      }
    },
    async handleRegister() {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.registerUsername, password: this.registerPassword })
        });

        const result = await response.json();

        if (response.ok) {
          this.registerUsername = '';
          this.registerPassword = '';
          this.loginErrorMessage = '';
          this.registerErrorMessage = 'Kayıt başarılı! Giriş yapabilirsiniz.';
        } else {
          this.registerErrorMessage = result.error || 'Kayıt yapılamadı.';
        }
      } catch (error) {
        this.registerErrorMessage = 'Bir hata oluştu.';
      }
    }
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.auth-form .form-group {
  margin-bottom: 15px;
}

.auth-form .form-group label {
  display: block;
  margin-bottom: 5px;
}

.auth-form .form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.auth-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.auth-button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
