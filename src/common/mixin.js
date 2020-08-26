import {debounce} from 'common/utils'

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