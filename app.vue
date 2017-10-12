<template>
  <div>
    <div>Hello {{name}}</div>
    <v-title title="Vue组件化"></v-title>
    <v-button @click="handleClick">点击按钮</v-button>
    <p>
      <img src="./images/stom.jpg" style="width: 200px;">
    </p>
  </div>
</template>
<script>
  import vTitle from './title.vue';
  import vButton from './button.vue';

  export default {
    components: {
      vTitle,
      vButton
    },
    data () {
      return {
        name: "Vue.js"
      }
    },
    methods: {
      handleClick (e) {
        console.log(e)
      }
    }
  }
</script>
<style scoped>
  div {
    color: #f60;
    font-size: 34px;
  }
</style>