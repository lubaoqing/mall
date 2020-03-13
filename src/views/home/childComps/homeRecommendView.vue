<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeRecommndView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    padding: 10px 0 25px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item {
    width: 20%;
    text-align: center;
  }
  .recommend-item img {
    width: 100%;
    margin-bottom: 10px;
  }
</style>