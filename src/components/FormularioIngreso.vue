<template>
<div class="container">
  <form class="m-4 p-4">
    <div class="row mt-4">
        <label>Usuario</label>
        <input type = "text" 
        v-model = "usuario.user"
        class = "from-control col-6 offset-3">
        
    </div>
    <div class="row mt-4">
        <label>Password</label>
        <input type = "password"
        v-model = "usuario.pass"
        class = "from-control col-6 offset-3">
    </div>
    <div class="row mt-4 col-3 offset-6">
        <button class="btn btn-primary " @click="ingreso">Ingresar</button>
    </div>
  </form>

  <p>si no eres un usuario 
    <router-link to="/registro">registrate aqui</router-link> 
  </p>
</div>
</template>

<script>
export default {
    name : 'FormularioIngreso',
    data(){
        return {
            usuario: {
                user : "",
                pass : ""
            }
        }
    },
    methods:{
        async ingreso(){
            try{
                if(localStorage.mascotas){
                    throw "ya has ingresado"
                }
                console.log(this.usuario.user, this.usuario.pass)
                const req = await fetch("https://api-mascotas-jorge.herokuapp.com/api/login", {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify(this.usuario)
                }) 
                if(req.status != 200){
                    localStorage.clear()
                    throw "no login" 
                }
                let res = await req.json()
                localStorage.setItem('mascotas', JSON.stringify(res))
                this.resetEstado()
                this.$emit("ingresarUser", "hola")

                this.$router.push("/")
            }catch(error){
                console.log(error)
            }
            

        },
        resetEstado(){
            this.usuario.user="",
            this.usuario.pass=""
        }

    }
}
</script>

<style>

</style>