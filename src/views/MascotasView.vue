<template>
  <div class="mascotas">
    <lista-mascotas/>
  </div>
</template>

<script>
// @ is an alias to /src
import ListaMascotas from '@/components/ListaMascotas.vue'

export default {
  name: 'MascotasView',
  components: {
    ListaMascotas
  }
}
</script>