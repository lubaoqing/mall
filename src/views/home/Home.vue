<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" />
    <home-recommend-view :recommends="recommends" />
    <home-feature-view />
    <tab-control :titles="['aaa', 'bbb', 'ccc']" />
  </div>
</template>

<script>
import homeSwiper from './childComps/homeSwiper'
import homeRecommendView from './childComps/homeRecommendView'
import homeFeatureView from './childComps/homeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import tabControl from 'components/content/tabControl/tabControl'

import {getHomeMultiddata} from 'network/home'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    homeSwiper,
    homeRecommendView,
    homeFeatureView,
    NavBar,
    tabControl
  },
  created() {
    getHomeMultiddata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  },
}
</script>

<style scoped>
  #home {
    padding: 44px 0 50px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
</style>