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

    <div class="postarea loading" v-if="loading">
      <h2>Buscando posts...</h2>
    </div>

    <div class="postarea" v-else>
      <article class="post" v-for="post in posts" v-bind:key="post.id">
        <h1>{{ post.autor }}</h1>
        <p>{{ post.content | postLength }}</p>
        <div class="action-post">
          <button v-on:click="likePost(post.id, post.likes)">
            {{ post.likes === 0 ? "Curtir" : post.likes + " curtida(s)" }}
          </button>
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
      loading: true,
      posts: [],
    };
  },
  async created() {
    const user = localStorage.getItem("devPost");
    this.user = JSON.parse(user);

    await firebase
      .firestore()
      .collection("posts")
      .orderBy("created", "desc")
      .onSnapshot((doc) => {
        this.posts = [];

        doc.forEach((item) => {
          this.posts.push({
            id: item.id,
            autor: item.data().autor,
            content: item.data().content,
            likes: item.data().likes,
            created: item.data().created,
            userId: item.data().userId,
          });
        });

        this.loading = false;
        console.log(this.posts);
      });
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
    async likePost(id, likes) {
      const userId = this.user.uid;
      const docId = `${userId}_${id}`;

      const doc = await firebase
        .firestore()
        .collection("likes")
        .doc(docId)
        .get();

      if (doc.exists) {
        await firebase
          .firestore()
          .collection("posts")
          .doc(id)
          .update({
            likes: likes - 1,
          });

        await firebase.firestore().collection("likes").doc(docId).delete();
        return;
      }

      await firebase.firestore().collection("likes").doc(docId).set({
        postId: id,
        userId: userId,
      });

      await firebase
        .firestore()
        .collection("posts")
        .doc(id)
        .update({
          likes: likes + 1,
        });
    },
  },
  filters: {
    postLength(valor) {
      if (valor.length < 70) {
        return valor;
      }

      return `${valor.substring(0, 70)}...`;
    },
  },
};
</script>

<style scoped>
@import "../css/home.css";
</style>
