<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'


import {getDetail} from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      console.log(res)
      this.topImages = res.result.itemInfo.topImages
    })
  },
  deactivated() {
    this.iid = null
  },
}
</script>

<style>

</style>