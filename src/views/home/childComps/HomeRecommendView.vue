<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        {{item.title}}
      </a>
    </div>
  </div>
</template>

<script>


export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {

  }
}
</script>

<style>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px;
    border-bottom: 10px solid #eeeeee ;
  }

  .recommend-item {
    flex: 1;
    
  }

  .recommend-item img {
    height: 70px;
    width: 70px;
    margin-bottom: 10px;
  }
</style>