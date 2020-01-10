<template>
  <div>
    <tabbar>
      <tab-bar-item path="/home" activecolor="#ccc">
        <img slot="item-icon" src="~assets/img/tabbar/home.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.png">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="~assets/img/tabbar/category.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.png">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.png">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/mine.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/mine_active.png">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tabbar>
  </div>
</template>

<script>
import Tabbar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabbar',
  components: {
    Tabbar,
    TabBarItem
  }
}
</script>

<style>

</style>