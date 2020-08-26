<template>
  <div id="Home"> 
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>  
    <tab-control :titles="['流行','新款','精选']"
          @tabclick="tabClick" 
          ref="tabControl1"
          class="tab-control"
          v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll" 
            :probe-type="3" 
            @scroll='contentScroll'
            :pullUpLoad='true'
            @pullingUp='loadMore'> 
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/> 
      <tab-control :titles="['流行','新款','精选']"
            @tabclick="tabClick" 
            ref="tabControl2" />
      <goods-list :goods="showGoods"/>
    </scroll>

    <!-- 监听组件事件要加上.native -->
    <back-top @click.native="backClick"  v-show="isShowBackTop"/>


  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

import BScroll from 'better-scroll'


export default {
  name: 'Home',
  data(){
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page:0 ,list:[]},
        'new': {page:0 ,list:[]},
        'sell': {page:0 ,list:[]}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      
    }
  },
  mixins: [itemListenerMixin],
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.ItemImgListener)
  },
  created() {
    // 1.请求多个数据
    this.gethomeMultidata()

    // 2.请求商品数据
    this.gethomeGoods('pop')
    this.gethomeGoods('new')
    this.gethomeGoods('sell')

  },
  mounted() {
    // // 1.图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh,50)

    // // 对监听的事件进行保存
    // this.ItemImgListener = () => {
    //   refresh()
    // }

    // this.$bus.$on('itemImgLoad', this.ItemImgListener )
    
  },
  methods: {
    // 事件监听相关的方法
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'  
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      // 1.判断backTop是否显示
      this.isShowBackTop = position.y < -1000

      // 2.决定tabControl是否吸顶（position：fiexd）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.gethomeGoods(this.currentType)
    },
    swiperImgLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // 网络请求相关的方法
    gethomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    gethomeGoods(type) {
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #Home {
    height: 100vh;
    /* padding-top: 44px; */
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
    background-color: white;
  }

  .content {
    /* height: calc(100% - 49px); */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>