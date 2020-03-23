<template>
  <div class="bottom-menu">
    <check-button class="select-all"
    :is-checked="isSelectAll"
    @click.native="checkClick" />
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{checkedLength}})</span>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import { mapGetters } from 'vuex'

	export default {
		name: "CartBottomBar",
    components: {
		  CheckButton
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => {
            item.checked = false
          });
        } else {
          this.cartList.forEach(item => {
            item.checked = true
          });
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        // 普通方法
        // let sum = 0
        // const list = this.$store.state.cartList
        // for (let item of list) {
        //   if (item.checked) {
        //     sum += item.price * item.count
        //   }
        // }
        // return sum
        //高级函数的方法
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + parseFloat(item.price) * parseInt(item.count)
        }, 0).toFixed(2)
      },
      checkedLength() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + parseInt(item.count)
        }, 0)
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false
        // return !(this.cartList.filter(item => {return !item.checked}).length)
        return !this.cartList.find(item => !item.checked)
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #fff;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
