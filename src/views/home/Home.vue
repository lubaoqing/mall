<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="tabControl1" :titles="['流行', '新款', '精选']" class="tab-control1"
     @tabClick="tabClick" v-show="isTabControlShow"/>
    <scroll class="content" ref="scroll" 
    :probe-type="3" @scroll="contentScroll"
    :pull-up-load="true" @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <tab-control ref="tabControl2" :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
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
import {debounce} from 'common/utils'

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
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabControlShow: false,
      saveY: 0
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
  mounted() {
    //监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 20)
    this.$bus.$on('homeItemImgLoad', () => {
      refresh()
    })
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
    //监听tab切换
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
      this.goToTabControll()
    },
    goToTabControll() {
      if (this.$refs.scroll.getScrollY() < - this.tabOffsetTop) {
        this.$refs.scroll.scrollTo(0, - this.tabOffsetTop + this.$refs.tabControl2.$el.offsetHeight, 200)
      }
    },
    //监听返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    //监听滚动
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
      this.isTabControlShow = (-position.y) > (this.tabOffsetTop - 44)
    },
    //监听上拉加载
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad() {
      //获取tabctrol得offsetTop得值
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
        
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
}
</script>

<style scoped>
  #home {
    height: 100vh;
  }
  .tab-control1 {
    position: absolute;
    z-index: 9;
    width: 100%;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .content {
    height: calc(100% - 49px);
    overflow: hidden;
  }
  /* .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  } */
</style>