<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3" >
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick"  v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goods/GoodsList"

import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    }
  },
  created() {
    // 1.保存传入的id
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的图片轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品详情的数据
      this.detailInfo = data.detailInfo

      // 5.获取参数信息
      this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)

      // 6.获取评论信息
      this.commentInfo = data.rate.list[0]

      // 1.第一次获取，值不对
      // 值不对的原因：this.$refs.params.$el压根没有渲染
      // this.themeTopYs = []

      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      // console.log(this.themeTopYs);

      // this.$nextTick(() => {
      //   // 2.第二次获取：值不对
      //   // 值不对的原因：图片没有完全加载
      //   // 根据最新的数据，对应的DOM是已经被加载出来了
      //   // 但是图片没有加载完（目前获取到offsetTop不包含其中的图片）
      //   // offsetTop值不对的时候，都是因为图片的问题
      //   this.themeTopYs = []

      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      //   console.log(this.themeTopYs);
      // })
      
      
    })

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list
    })

    // 4.getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []

      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
      this.themeTopYs.push(Number.MAX_VALUE)

      console.log(this.themeTopYs);
    },100)
  },
  mounted() {
    
  },
  updated(){
    
  },
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.ItemImgListener)
  },

  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()

      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y

      // 2.positionY和主题中值进行对比
      let length = this.themeTopYs.length
      for(let i = 0 ; i < length-1 ; i++){
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[+i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 3.显示回到顶部
      this.isShowBackTop = position.y < -1000
    },
    addToCart() {
      console.log('--');
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: white;

    height:  100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: white;
  }

  .content {
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style>