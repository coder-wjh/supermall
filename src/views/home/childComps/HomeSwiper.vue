<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name:'HomeSwpier',
  props: {
    banners: {
        type: Array,
        default() {
          return []
      }
    }
  },
  data(){
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,SwiperItem
  },
  methods: {
    imgLoad(){
      if(!this.isLoad){
        this.$emit("swiperImgLoad")
        this.isLoad = true
      }   
    }
  }
}
</script>

<style>

</style>