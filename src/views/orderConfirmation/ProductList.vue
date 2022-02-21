<template>
  <div class="products">
      <h4 class="products__title">{{shopName}}</h4>
      <div class="products__list">
        <div
          class="products__item"
          v-for="item in productList"
          :key="item._id"
        >
          <img class="products__item__img" :src="item.imgUrl" />
          <div class="products__item__detail">
            <h4 class="products__item__title">{{item.name}}</h4>
            <p class="products__item__price">
                <span class="products__item__single">
                  <span class="products__item__yen">&yen;</span>
                  <span class="products__item__money">{{item.price}} × {{item.count}}</span>
                </span>
                <span class="products__item__total">
                  <span class="products__item__yen">&yen;</span>
                  <span class="products__item__money">{{(item.price * item.count).toFixed(2)}}</span>
                </span>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { useCommonCartEffect } from '../../effects/cartEffect'
import { useRoute } from 'vue-router'

export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList, calculations } = useCommonCartEffect(shopId)

    return { shopName, productList, calculations }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import "../../style/mixins.scss";

.products {
  margin: .16rem .18rem .62rem .18rem;
  background-color: $bgColor;
  border-radius: .04rem;
  &__title {
    font-size: .16rem;
    margin: 0;
    padding: .16rem 0 0 .16rem;
    color: $content-fontcolor;
  }
  &__item {
      position: relative;
      display: flex;
      height: .46rem;
      padding: .12rem 0;
      margin: 0 .16rem 0 .16rem;
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
}
</style>
