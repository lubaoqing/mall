import {ADD_COUNTER, ADD_TO_CART} from './mutations-type'
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find( item => item.iid === payload.iid)
      if (oldProduct) {//存在
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量加1成功')
      } else {
        context.commit(ADD_TO_CART, payload)
        resolve('商品添加成功')
      }
    })
  }
}