import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      ItemImgListener: null,
      refresh: null
    }
  },
  mounted(){ 
    this.refresh = debounce(this.$refs.scroll.refresh,50)
    this.ItemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImgLoad', this.ItemImgListener )
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return { 
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0,300)
    },
  }
}