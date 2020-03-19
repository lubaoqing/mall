<template>
  <div id="detail">
    <detail-nav-bar />
    <scroll ref="scroll" class="content">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info @detailGoodsImgLoad="detailGoodsImgLoad" :detail-info="detailInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <good-list :goods="recommends" />
    </scroll>
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
      recommends: []
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
    GoodList
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
    })
    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  methods: {
    detailGoodsImgLoad() {
      this.$refs.scroll.refresh()
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 20)
    this.$bus.$on('detailItemImgLoad', () => {
      refresh()
    })
  },
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
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>