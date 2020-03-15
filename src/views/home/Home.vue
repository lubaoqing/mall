<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper :banners="banners" />
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <tab-control class="tabControl" 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick"
      />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" />
  </div>
</template>

<script>
import homeSwiper from './childComps/homeSwiper'
import homeRecommendView from './childComps/homeRecommendView'
import homeFeatureView from './childComps/homeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import tabControl from 'components/content/tabControl/tabControl'
import GoodList from 'components/content/goods/GoodList'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultiddata, getHomeGoods} from 'network/home'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop'
    }
  },
  components: {
    homeSwiper,
    homeRecommendView,
    homeFeatureView,
    NavBar,
    Scroll,
    tabControl,
    GoodList,
    BackTop
  },
  created() {
    // 获取banner和recommend数据
    this.getHomeMultiddata()
    //获取列表数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 2000)
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultiddata() {
      getHomeMultiddata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1
      })
    }
  },
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .tabControl {
    position: sticky;
    top: 44px;
  }
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>