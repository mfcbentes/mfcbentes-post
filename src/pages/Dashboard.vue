<template>
  <div id="dashboard">
    <h1>Página Dasboard</h1>
    <button v-on:click="logOut">Sair</button>
  </div>
</template>

<script>
import firebase from "../services/firebaseConnection";

export default {
  name: "Dashboard",
  data() {
    return {};
  },
  methods: {
    async logOut() {
      const confirm = window.confirm("Você realmente deseja sair?");
      if (confirm) {
        await firebase
          .auth()
          .signOut()
          .then(async () => {
            await localStorage.removeItem("devPost");
            this.$router.push("/login");
          });
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
</style>
