<template>
   <Menu>
    <router-link to="/">Home</router-link> 
    <!-- <router-link to="/about">About</router-link> -->
    <router-link to="/estudiantes">Estudiantes</router-link>
    <router-link to="/cursos">Cursos</router-link>
    
  </Menu>
  <router-view/>
</template>

<script>

import Menu from './components/Menu.vue'

export default {
  name:'App',
  data(){
    return {

    }
  },
  components:{
    Menu
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
