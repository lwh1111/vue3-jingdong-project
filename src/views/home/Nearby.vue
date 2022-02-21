<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      v-for="item in nearbyList"
      :key="item._id"
      :to="`/shop/${item._id}`"
    >
    <ShopInfo :item = "item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  // 从接口取数据
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data.length) {
      nearbyList.value = result.data
    }
  }
  return { getNearbyList, nearbyList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { getNearbyList, nearbyList } = useNearbyListEffect()
    getNearbyList()

    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.nearby {
  &__title {
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    line-height: .25rem;
    font-weight: 500;
    color: $content-fontcolor;
  }
  a {
    text-decoration: none;
  }
}
</style>
