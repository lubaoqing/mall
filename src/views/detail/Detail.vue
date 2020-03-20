<template>
  <div id="detail">
    <detail-nav-bar @topClick="tabNavClick" ref="nav"/>
    <scroll ref="scroll" class="content"
    :probe-type="3" @scroll="scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info ref="params" @detailGoodsImgLoad="detailGoodsImgLoad" :detail-info="detailInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <good-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import Scroll from 'components/common/scroll/Scroll'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodList from 'components/content/goods/GoodList'
import DetailBottomBar from './childComps/DetailBottomBar'


import {getDetail, GoodsDetail, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: []
    }
  },
  components: {
    DetailNavBar,
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar
  },
  created() {
    // 1.获取iid
    this.iid = this.$route.params.iid
    // 2.请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取数据
      const data = res.result
      // 2.轮播图信息
      this.topImages = res.result.itemInfo.topImages
      // 3.详情信息
      this.goodsInfo = new GoodsDetail(data.itemInfo, data.columns, data.shopInfo.services)
      // 4.店铺信息
      this.shop = new Shop(data.shopInfo)
      // 5.商品信息
      this.detailInfo = data.detailInfo
      // 6.参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 7.评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // this.$nextTick(() => {
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // })

    })
    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  methods: {
    detailGoodsImgLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
    },
    tabNavClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    scroll(position) {
      if ( position.y <= -this.themeTopYs[3]) {
        if(this.$refs.nav.currentIndex != 3) this.$refs.nav.currentIndex = 3
      }else if (position.y <= -this.themeTopYs[2]) {
        if(this.$refs.nav.currentIndex != 2) this.$refs.nav.currentIndex = 2
      }else if (position.y <= -this.themeTopYs[1]) {
        if(this.$refs.nav.currentIndex != 1) this.$refs.nav.currentIndex = 1
      }else {
        if(this.$refs.nav.currentIndex != 0) this.$refs.nav.currentIndex = 0
      }
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 20)
    this.$bus.$on('detailItemImgLoad', () => {
      refresh()
    })
  }
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .content {
    height: calc(100% - 102px);
    overflow: hidden;
  }
</style>