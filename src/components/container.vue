<template>
  <div>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <p><span>{{ num }}</span></p>
  </div>
</template>

<script>
    export default {
        props: ['num'], // 将父组件的值传递给子组件 注意变量值 应和父组件 保持一致
        name: "container",
        data(){
          return{
            num:0
          }
        },
        methods: {
          increment(){
            this.$emit('incre')
          },
          decrement(){
            this.$emit('drece')
          }
        }
    }
</script>

<style scoped>

</style>
