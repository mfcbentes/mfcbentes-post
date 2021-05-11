<template>
  <div id="login">
    <div class="loginArea" v-if="login">
      <h1>Entrar</h1>
      <form>
        <input type="email" placeholder="mail@email.com" v-model="email" />
        <input type="password" placeholder="Sua senha..." v-model="senha" />
        <button type="submit">Acessar</button>
      </form>
      <a v-on:click="toogleBtn">Criar uma conta</a>
    </div>
    <div class="loginArea" v-else>
      <h1>Cadastrar</h1>
      <form v-on:submit.prevent="handleRegister">
        <input type="text" placeholder="Nome" v-model="nome" />
        <input type="email" placeholder="mail@email.com" v-model="email" />
        <input type="password" placeholder="Sua senha..." v-model="senha" />
        <button type="submit">Cadastrar</button>
      </form>
      <a v-on:click="toogleBtn">Já possuo uma conta</a>
    </div>
  </div>
</template>

<script>
import firebase from "../services/firebaseConnection";
export default {
  name: "Login",
  data() {
    return {
      nome: "",
      email: "",
      senha: "",
      login: true,
    };
  },
  methods: {
    toogleBtn() {
      this.login = !this.login;
      this.nome = "";
      this.email = "";
      this.senha = "";
    },
    async handleRegister() {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.senha);

      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          nome: this.nome,
        })
        .then(async () => {
          const usuarioLogado = {
            uid: user.uid,
            nome: this.nome,
          };

          await localStorage.setItem("devPost", JSON.stringify(usuarioLogado));
        })
        .catch((error) => {
          console.log("Erro ao cadastrar: " + error);
        });

      this.$router.push("/");
    },
  },
  components: {},
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: #fff;
}

.loginArea {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  margin-top: 25px;
  max-width: 600px;
  background: #4c5059;
  border-radius: 5px;
}

form {
  display: flex;
  flex-direction: column;
  margin: 0 25px;
}

input {
  margin-bottom: 10px;
  height: 15px;
  width: 300px;
  font-size: 18px;
  padding: 10px;
  outline: none;
  border: 0;
  background: rgb(241, 241, 241);
}

button {
  height: 35px;
  border: 0;
  background-color: #7289da;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
}

.loginArea a {
  margin-top: 20px;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
}
</style>
