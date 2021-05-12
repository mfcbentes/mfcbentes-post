<template>
  <div id="home">
    <div class="newpost">
      <h2>Bem vindo de volta!</h2>
      <span>Compartilhe seu dia</span>
      <textarea
        placeholder="O que está fazendo hoje?"
        rows="15"
        v-model="input"
      >
      </textarea>
      <button v-on:click="createPost">Compartilhar</button>
    </div>
    <div class="postarea">
      <article class="post">
        <h1>Manoel</h1>
        <p>Olá, bora codar???</p>
        <div class="action-post">
          <button>2 curtida(s)</button>
          <button>Veja o post completo</button>
        </div>
      </article>
      <article class="post">
        <h1>Fernando</h1>
        <p>Olá, é o meu primeiro post.</p>
        <div class="action-post">
          <button>1 curtida(s)</button>
          <button>Veja o post completo</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import firebase from "../services/firebaseConnection";

export default {
  name: "Home",
  data() {
    return {
      input: "",
      user: {},
    };
  },
  created() {
    const user = localStorage.getItem("devPost");
    this.user = JSON.parse(user);
  },
  methods: {
    async createPost() {
      if (this.input === "") {
        return;
      }

      await firebase
        .firestore()
        .collection("posts")
        .add({
          created: new Date(),
          content: this.input,
          autor: this.user.nome,
          userId: this.user.uid,
          likes: 0,
        })
        .then(() => {
          this.input = "";
          console.log("Post salvo com sucesso!");
        })
        .catch((erro) => {
          console.log("Erro ao criar o post: " + erro);
        });
    },
  },
};
</script>

<style scoped>
@import "../css/home.css";
</style>
