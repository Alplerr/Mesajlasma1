<template>
    <div>
      <!-- Kayıt yapma -->
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      <div v-if="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: null
      };
    },
    methods: {
      async register() {
        try {
          const response = await this.$axios.$post('/api/register', {
            username: this.username,
            password: this.password
          });
          console.log('Registration successful:', response);  // Başarılı olur ise registration successful yazsın.
          
        } catch (error) {
          console.error('Registration error:', error);        //Başarısız olursa hata mesajı.
          this.error = 'An error occurred during registration.';
        }
      }
    }
  };
  </script>
  