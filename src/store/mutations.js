import {
  AAD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每一个方法尽可能完成的事件比较单一一点

  // 老商品数量加一
  [AAD_COUNTER](state,payload){
    payload.count ++
  },

  // 添加新商品
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}