<template>
  <div id="home">
    <div class="newpost">
      <h2>Bem vindo de volta!</h2>
      <span>Compartilhe seu dia</span>
      <textarea placeholder="O que está fazendo hoje?" rows="15"> </textarea>
      <button>Compartilhar</button>
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
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
@import "../css/home.css";
</style>
