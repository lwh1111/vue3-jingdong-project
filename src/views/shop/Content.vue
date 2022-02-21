<template>
  <div class="content">
    <div class="category" >
      <div
        :class="{'category__item':true, 'category__item--active':currentTab === item.tab}"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
      >{{item.name}}</div>
    </div>
    <div class="product">
      <div
        class="product__item"
        v-for="item in list"
        :key="item._id"
      >
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售{{item.sales}}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>
            <span class="product__item__money">{{item.price}}</span>
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="() => {changeCartItem(shopId, item._id, item, -1, shopName)}"
          >&#xe6a9;</span>
            {{getProductCartCount(cartList, shopId, item._id)}}
          <span
            class="product__number__plus iconfont"
            @click="() => {changeCartItem(shopId, item._id, item, 1, shopName)}"
          >&#xe60d;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { get } from '../../utils/request'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffect'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// 和Tab切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 获取列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    const result = await get(`api/shop/${shopId}/products`, {
      tab: currentTab.value
    }) // 第二个参数 根据接口的要求传一个tab值
    if (result?.errno === 0 && result?.data.length) {
      content.list = result.data
    }
  }

  // 当首次页面加载时以及监听的数据发生变化时执行watchEffect
  watchEffect(() => { getContentData() })

  const { list } = toRefs(content)
  return { list }
}

// 和购物车相关逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCartCount = (cartList, shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem, getProductCartCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect()

    return { categories, list, handleTabClick, currentTab, cartList, shopId, changeCartItem, getProductCartCount }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";

.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
.category {
  overflow-y: scroll;
  height: 100%;
  width: .76rem;
  background-color: $search-bgColor;
  &__item {
    font-size: .14rem;
    line-height: .4rem;
    text-align: center;
    color: $content-fontcolor;
    &--active {
      background-color: $bgColor;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    height: .68rem;
    padding: .12rem 0;
    margin: 0 .18rem 0 .16rem;
    border-bottom: .01rem #F1F1F1 solid;
    &__img {
    height: .68rem;
    width: .68rem;
    margin-right: .16rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__title {
      @include ellipse;
      margin: 0;
      font-size: .14rem;
      line-height: .2rem;
      color: $content-fontcolor;
    }
    &__sales {
      margin: .06rem 0;
      font-size: .12rem;
      line-height: .16rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
      font-size: .14rem;
      line-height: .2rem;
      height: .2rem;
      color: $highlight-fontColor;
    }
    &__yen {
      font-size: .10rem;
    }
    &__money {
      font-weight: 600;
    }
    &__origin {
      margin-left: 0.08rem;
      font-size: .10rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: .12rem;
      font-size: .14rem;
      color: $content-fontcolor;
      &__minus,
      &__plus {
        position: relative;
        top: .02rem;
        font-size: .2rem;
      }
      &__plus {
        color: $buttom-bgColor;
        margin-left: .05rem;
      }
      &__minus {
        color: $medium-fontColor;
        margin-right: .05rem;
      }
    }
  }
}
</style>
