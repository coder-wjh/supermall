import {
  AAD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // actions:分发方法
  addCart(context,payload) {
    return new Promise((resolve,reject) => {
      // 1.查找之前的数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduct
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit(AAD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
      }else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新的商品')
      }
    })
  }
}