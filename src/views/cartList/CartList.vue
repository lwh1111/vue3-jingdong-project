<template>
  <div class="title">我的全部购物车</div>
  <div class="wrapper">
    <div
      class="empty"
      v-if="Object.keys(newCartList).length === 0"
    >当前购物车是空的</div>
    <template
      v-for="(item, index) in newCartList"
      :key="index"
    >
      <div
        class="products"
        v-if="getProductsCount(item.productList) !== 0"
      >
        <h4 class="products__title">{{item.shopName}}</h4>
        <div :class="item.showAll ? `products__list` : `products__list--noShow`">
          <div
            class="products__item"
            v-for="innerItem in item.productList"
            :key="innerItem._Id"
          >
            <img class="products__item__img" :src="innerItem.imgUrl" />
            <div class="products__item__detail">
              <h4 class="products__item__title">{{innerItem.name}}</h4>
              <p class="products__item__price">
                  <span class="products__item__single">
                    <span class="products__item__yen">&yen;</span>
                    <span class="products__item__money">{{innerItem.price}} x {{innerItem.count}}</span>
                  </span>
                  <span class="products__item__total">
                    <span class="products__item__yen">&yen;</span>
                    <span class="products__item__money">{{(innerItem.price * innerItem.count).toFixed(2)}}</span>
                  </span>
              </p>
            </div>
          </div>
        </div>
        <div
          class="products__btn"
          v-if="getProductsCount(item.productList) >= 4"
          @click="showAllProductsClick(item)"
        >
          共计 {{getProductsCount(item.productList)}} 件
          <span class="products__btn__icon iconfont">{{item.showAll ? '&#xe76e;' : '&#xe772;'}}</span>
        </div>
      </div>
    </template>
  </div>
    <Docker :currentIndex="1"/>
</template>

<script>
import { computed } from 'vue'
import Docker from '../../components/Docker.vue'
import { useCommonCartEffect } from '../../effects/cartEffect'

// 清除 cartList 里所有 count 为 0 的 product，并为每个 shop加上'showAll'属性
const useCartListEffect = () => {
  const { cartList } = useCommonCartEffect()
  const newCartList = computed(() => {
    const notEmptyCartList = {}
    for (const shopId in cartList) {
      let total = 0
      const productList = cartList[shopId].productList
      const notEmptyProductList = {}
      for (const productId in productList) {
        const product = productList[productId]
        if (product.count > 0) {
          notEmptyProductList[productId] = product
          total += product.count
        }
      }
      if (total > 0) {
        notEmptyCartList[shopId] = cartList[shopId]
        notEmptyCartList[shopId].productList = notEmptyProductList
        notEmptyCartList[shopId].showAll = false
      }
    }
    return notEmptyCartList
  })
  return { newCartList }
}

// 获取每个店铺的商品总数
const useProductsCountEffect = () => {
  const getProductsCount = (productList) => {
    const productsCount = Object.keys(productList).length // Object.keys().length 获取对象的长度
    return productsCount
  }
  return { getProductsCount }
}

// 控制商品是否全部展示
const useShowAllEffect = () => {
  const showAllProductsClick = (shopId) => {
    shopId.showAll = !shopId.showAll
    return shopId.showAll
  }
  return { showAllProductsClick }
}

export default {
  name: 'CartList',
  components: { Docker },
  setup () {
    const { newCartList } = useCartListEffect()
    const { getProductsCount } = useProductsCountEffect()
    const { showAllProductsClick } = useShowAllEffect()

    return { getProductsCount, showAllProductsClick, newCartList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import "../../style/mixins.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  top: .44rem;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0 0.18rem 0.65rem 0.18rem;
  background-color: #f8f8f8;
}
.title {
  text-align: center;
  font-size: .16rem;
  line-height: .44rem;
  color: $content-fontcolor;
  background-color: $bgColor;
}
.empty {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: .16rem;
  color: $light-fontColor;
}
.products {
  box-sizing: border-box;
  margin-top: .16rem;
  padding: .16rem;
  background-color: $bgColor;
  border-radius: .04rem;
  &__title {
    line-height: .22rem;
    font-size: .16rem;
    margin: 0;
    color: $content-fontcolor;
  }
  &__list {
    &--noShow {
      max-height: 1.86rem;
      overflow: hidden;
    }
  }
  &__item {
    position: relative;
    display: flex;
    height: .46rem;
    margin-top: .16rem;
    &__img {
    height: .46rem;
    width: .46rem;
    margin-right: .16rem;
    }
    &__detail {
      overflow: hidden;
      flex: 1;
    }
    &__title {
      @include ellipse;
      margin: 0 0 .06rem 0;
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
      display: flex;
      height: .2rem;
      margin: 0;
      font-size: .14rem;
      font-weight: 400;
      line-height: .2rem;
      color: $highlight-fontColor;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: $content-fontcolor;
    }
    &__yen {
      font-size: .1rem;
    }
  }
  &__btn {
    margin-top: .16rem;
    height: .28rem;
    line-height: .28rem;
    font-size: .14rem;
    text-align: center;
    color: $light-fontColor;
    background-color: $search-bgColor;
    &__icon {
      margin-left: .02rem;
      font-size: .14rem;
    }
  }
}
</style>
