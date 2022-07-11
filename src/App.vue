<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/" >Mascotas</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav ">
          <li class="nav-item">
            <router-link class="nav-link" to="/mascotas">mascotas</router-link> 
          </li>
          <li class="nav-item" v-if="!rol">
            <router-link class="nav-link" to="/login">Ingresar</router-link>
          </li>
          <li class="nav-item" v-if="!rol">
            <router-link class="nav-link" to="/registro">Registro</router-link>
          </li>
          <li class="nav-item" v-if="rol==='pasas'">
            <router-link class="nav-link" to="/usuarios">usuarios</router-link>
          </li>
          <li class="nav-item" v-if="rol">
            <router-link class="nav-link" to="/" @click="outUser">cerrar sesion</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view @ingresar-user="entrarRol"/>
</template>

<script>
export default {
  data (){
    return {
      rol: false
    }
  },
  methods:{
    outUser(){
      this.rol = false
      localStorage.clear()
      this.$router.go()
    },
    entrarRol(){
      let act = localStorage.getItem("mascotas")
      act = JSON.parse(act)
      // console.log("act estado de rol")
      // console.log(act.rolAct)
      this.rol = act.rolAct
    },
  },
  mounted(){
    if(localStorage.getItem("mascotas")){
      this.entrarRol()
    }
  }
}

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>


