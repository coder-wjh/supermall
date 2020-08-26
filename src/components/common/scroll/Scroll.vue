<template>
  <!-- ref/children  -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      bscroll: null
    }
  },
  mounted(){
    // 1.创建BScroll对象
    this.bscroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2.监听滚动的位置
    this.bscroll.on('scroll', (position) => {
      this.$emit('scroll',position);
    })

    // 3.监听上拉事件
    if(this.pullUpLoad){
      this.bscroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x,y,time=500){
      this.bscroll && this.bscroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.bscroll && this.bscroll.finishPullUp()
    },
    refresh(){
      this.bscroll && this.bscroll.refresh()
    },
    getScrollY(){
      return this.bscroll ? this.bscroll.y : 0
    }
  }
}
</script>

<style>

</style>