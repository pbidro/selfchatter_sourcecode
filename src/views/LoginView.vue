<template>
  <div>
    <h1>Iniciar sesión</h1>
    <p>email: <input v-model="user.email" /></p>
    <p>password: <input v-model="user.password" /></p>
    <button @click="ingresar">ingresar</button>
  </div>
      <h3>¿no tienes cuenta?<router-link to="/register"> haz click aquí </router-link> </h3>

</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default {
  name: "LoginView",
  data() {
    return { user: { email: "", password: "" } };
  },
  methods: {
    async ingresar() {
      const { email, password } = this.user;
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      console.log('next is now home')
      this.$router.push("/");
    },
  },
};
</script>
