<template>
<div class="container">
  <form class="m-4 p-4">
    <div class="row mt-4">
        <label>Usuario (debe ser un email)</label>
        <input type = "email"
        ref = user
        v-model = "usuario.user"
        class = "from-control col-6 offset-3">
    </div>
    <div class="row mt-4">
        <label>Nombre</label>
        <input type = "text"
        v-model = "usuario.name"
        class = "from-control col-6 offset-3">
    </div>
    <div class="row mt-4">
        <label>Password</label>
        <input type = "password"
        v-model = "usuario.pass"
        class = "from-control col-6 offset-3">
    </div>
        <div class="row mt-4">
        <label>Password</label>
        <input type = "password"
        v-model = "usuario.pass2"
        class = "from-control col-6 offset-3">
    </div>
    <div class="row mt-4 col-3 offset-6">
        <button class="btn btn-primary" @click="nuevoUsuario">Registrarse</button>
    </div>
  </form>

  <p>
    si ya eres un usuario has  
    <router-link to="/login">login</router-link>
  </p>
</div>
</template>

<script>
export default {
    name : 'FormularioRegistro',
    data(){
        return {
            usuario: {
                user : "",
                name : "",
                pass : "",
                pass2: "",
            }
        }
    },
    methods:{
        async nuevoUsuario(){
            try{
                if(this.usuario.pass !== this.usuario.pass2){
                    let error = {
                        error: "password no coinciden"
                    }
                    throw error
                }
                let response = await fetch("https://api-mascotas-jorge.herokuapp.com/api/registro",{
                    method:"post",
                    headers:{
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body:JSON.stringify({
                        'nombre': this.usuario.name,
                        'user': this.usuario.user,
                        'pass': this.usuario.pass

                    })
                })
                if(response.status != 200){
                    throw "problemas al registrar usuario"
                }
                this.resetData()
                this.$router.push("/login")


            }catch(error){
                console.log(error)
                
            }
        },
        resetData(){
            this.usuario.name = ""
            this.usuario.user = ""
            this.usuario.pass = ""
            this.usuario.pass2 = ""
        }
    }

}
</script>

<style>

</style>