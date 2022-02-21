<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">
        &#xe646;
      </div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe600;</span>
        <input class="search__content__input" placeholder="请输入商品名称搜索" />
      </div>
    </div>
    <ShopInfo :item = "item" :hideBorder = "true" v-show="item.imgUrl"/>
    <Content :shopName = "item.name"/>
    <Cart />
  </div>
</template>

<script>
import ShopInfo from '../../components/ShopInfo'
import Cart from './Cart'
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Content from './Content'

const useShopInfoEffect = () => {
  const data = reactive({ item: {} })
  const route = useRoute()
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }

  const { item } = toRefs(data)
  return { item, getItemData }
}

// 点击后退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.push({ name: 'Home' })
  }
  return handleBackClick
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const handleBackClick = useBackRouterEffect()
    getItemData()

    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.wrapper {
  padding: 0 .18rem
}
.search {
  display: flex;
  margin: .16rem 0 .04rem;
  line-height: .32rem;
  &__back {
    width: .3rem;
    margin: 0 0.03rem 0 -.05rem;
    font-size: .24rem;
    color: $light-iconColor;
  }
  &__content {
    display: flex;
    flex: 1;
    background-color: $search-bgColor;
    border-radius: 0.16rem;
    &__icon {
      // width: .44rem;
      padding: 0 .06rem 0 .12rem;
      text-align: center;
      font-size: 0.18rem;
      color: $search-fontColor;
    }
    &__input {
      // display: block;
      width: 100%;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      font-size: 0.14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $search-fontColor;
      }
    }
  }
}
</style>
