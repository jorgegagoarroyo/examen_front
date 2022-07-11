<template>
  <div class="page">
    <h1>APP MASCOTAS</h1>
    <img class="central" src="https://cdn.pixabay.com/photo/2021/01/16/11/13/dogs-5921796_960_720.png" alt="Mascotas">
    <div v-show="!user">
      <p>Hola eres un invitado en la app mascotas solo podras ver mascotas</p>
      <p>para poder agregar mascotas debes <router-link to='/registro'> Registrarte como usuario</router-link> o <router-link to='/login'>Ingresar</router-link>
      </p>
    </div>
    <div v-show="user">
      <div v-if="user == 'super'">
        <p>hola <strong>ADMIN</strong> </p>
      </div>
      <div v-else>
         <p>Hola <strong>{{name}}</strong>  en la app mascotas podras ver mascotas y agregar mascotas</p>
      </div>

    </div>

  </div>
</template>


<script>
export default {
  data(){
    return{
      user: false,
      name: ""
    }
  },
  mounted(){
    let localUser = localStorage.getItem("mascotas")
    localUser = JSON.parse(localUser)
    if(localUser){
      console.log(localUser.rolAct)
      if(localUser.rolAct == "pasas"){
        this.user = "super"
      }else{
        this.user = "registrado"
      }
      this.name = localUser.nombre
      console.log(this.name)
    }
  }
}
</script>

<style scoped>
.central{
  width:75%;
  max-width: 500px;
  max-height: 500px;
  
}
</style>
