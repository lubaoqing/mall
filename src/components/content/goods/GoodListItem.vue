<template>
  <div class="goodsItem" @click="itemClick">
    <img :src="showImg" @load="imgLoad" />
    <p>{{goodsItem.title}}</p>
    <div>
      <span class="price">{{goodsItem.orgPrice}}</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      if (this.$rote.path.indexOf('/home')) {
        this.$bus.$emit('homeItemImgLoad')
      }else if(this.$rote.path.indexOf('/detail')) {
        this.$bus.$emit('detailItemImgLoad')
      }
      
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
}
</script>

<style scoped>
  .goodsItem {
    font-size: 14px;
    overflow: hidden;
    border-radius: 4px;
  }
  .goodsItem img {
    width: 100%;
  }
  .goodsItem p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 3px 0;
  }
  .goodsItem div {
    display: flex;
    justify-content: space-evenly;
    padding: 3px 0;
  }
  .goodsItem div .price {
    color: var(--color-height-text);
  }
  .goodsItem div .cfav {
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    background-repeat: no-repeat;
    padding-left: 15px;
  }
</style>