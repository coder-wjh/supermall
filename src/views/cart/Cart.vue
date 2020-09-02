<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list  />

    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import cartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    cartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ]),

    // ...mapGetters({
    //   length: 'cartLength',  取别名
    //   list: 'cartList'
    // })
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar{
    background-color: var(--color-tint) ;
    color: #ffffff;
  }
</style>