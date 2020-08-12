<template>
  <TabBar>
      <TabBarItem path='/home' activeColor='deepPink'>
      <!-- 别称引用加 ~ ，import不用加 -->
        <img src="~assets/img/tabbar/home1.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path='/category' activeColor='deepPink'>
        <img src="~assets/img/tabbar/classification1.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/classification.svg" alt="" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem path='cart' activeColor='deepPink'>
        <img src="~assets/img/tabbar/shopping_cart1.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/shopping_cart.svg" alt="" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path='/profile' activeColor='deepPink'>
        <img src="~assets/img/tabbar/profile1.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/profile.svg" alt="" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>
</template>

<script>

import TabBar from 'components/tabbar/TabBar'
import TabBarItem from 'components/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>