<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.nowLowPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" :style="{backgroundColor: goods.discountBgColor}">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length - 1].name}}</span>
    </div>
    <div class="info-serve">
      <span class="info-serve-item" v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .info-title {
    font-size: 18px;
    font-weight: bolder;
    height: 40px;
    overflow: hidden;
    line-height: 20px;
    margin: 2px 0;
  }
  .info-price {
    padding: 4px 0;
  }
  .info-price span {
    padding: 0 4px;
  }
  .n-price {
    color: var(--color-height-text);
    font-weight: bold;
  }
  .o-price {
    color: gray;
    font-size: 10px;
    text-decoration: line-through;
  }
  .discount {
    color: white;
    font-size: 14px;
    border-radius: 5px;
  }
  .info-other,.info-serve {
    display: flex;
    padding: 4px;
    justify-content: space-between;
    font-size: 10px;
    color: #997c7c;
    line-height: 16px;
  }
  .info-serve img {
    width: 14px;
    height: 14px;
    margin-top: 3px;
    vertical-align: -2px;
  }
</style>