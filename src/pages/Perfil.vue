<template>
  <div id="perfil">
    <div class="postarea loading" v-if="loading">
      <h2>Buscando posts...</h2>
    </div>
    <div v-else>
      <div class="headerPerfil">
        <h2>Olá, {{ nome }}!</h2>
        <span>Já fez <strong>3</strong> posts.</span>
      </div>
      <div class="postarea">
        <article class="post" v-for="post in posts" v-bind:key="post.id">
          <h1>{{ post.autor }}</h1>
          <p>{{ post.content }}</p>
          <div class="action-post">
            <button>Veja o post completo</button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../services/firebaseConnection";

export default {
  name: "Perfil",
  data() {
    return {
      loading: true,
      showPostModal: false,
      fullPost: {},
      posts: [],
      nome: "",
      user: {},
    };
  },
  props: ["userid"],
  components: {},
  async created() {
    const user = localStorage.getItem("devPost");
    this.user = JSON.parse(user);

    await firebase
      .firestore()
      .collection("posts")
      .where("userId", "==", this.userid)
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        this.posts = [];

        snapshot.forEach((doc) => {
          this.posts.push({
            id: doc.id,
            autor: doc.data().autor,
            content: doc.data().content,
            likes: doc.data().likes,
            created: doc.data().created,
            userId: doc.data().userId,
          });
        });

        this.nome = this.posts[0].autor;
      });

    this.loading = false;
  },
};
</script>

<style scoped>
</style>
