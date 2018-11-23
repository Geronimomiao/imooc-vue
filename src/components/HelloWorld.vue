<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <counter v-bind:num="num" v-on:incre="increment" v-on:drece="decrement"></counter>
      <p>parent {{ num }}</p>
  <!-- 此处 data 中的数据 是本页面中的 data -->
  </div>
  </template>

  <script>
  import counter from './container'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        num: 10
      }
    },
    components: {
      counter
    },
    methods: {
      increment(){
        this.num++
      },
      decrement(){
        this.num--
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
