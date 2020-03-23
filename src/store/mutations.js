import {ADD_COUNTER, ADD_TO_CART} from './mutations-type'
export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  }
  // addCart(state, payload) {
  //   // 判断payload是否已经存在 方式一
  //   let isExist = false
  //   for (const item of state.cartList) {
  //     //存在
  //     if (payload.iid === item.iid) {
  //       item.count += 1
  //       isExist = true
  //       return
  //     }
  //   }
  //   //不存在
  //   if (!isExist) {
  //     payload.count = 1
  //     state.cartList.push(payload)
  //   }
    /*
    // 判断payload是否已经存在 方式二
    let oldProduct = state.cartList.find( item => item.iid === payload.iid)
    if (oldProduct) {
      oldProduct.count += 1
    } else {
      payload.count = 1
      state.cartList.push(payload)
    }
    */
   
  //}
}