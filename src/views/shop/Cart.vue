<template>
  <div class="mask" v-if="showCart && calculations.total > 0" @click="handleCartShowChange"></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div
          class="product__header__icon iconfont"
          @click="() => setCartItemChecked(shopId, calculations.allChecked)"
          v-html="calculations.allChecked ? '&#xe652;':'&#xe651;'"
        >
        </div>
        <span class="product__header__all">全选</span>
        <div
          class="product__header__clear"
          @click="() => clearCartProducts(shopId)"
        >
          清空购物车
        </div>
      </div>
      <div
        class="product__item"
        v-for="item in productList"
        :key="item._id"
      >
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe652;':'&#xe651;'"
          @click="() => changeCartItemChecked(shopId, item._id)"
        >
        </div>
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>
            <span class="product__item__money">{{item.price}}</span>
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="() => changeCartItemInfo(shopId, item._id, item, -1)"
          >&#xe6a9;</span>
          {{item.count}}
          <span
            class="product__number__plus iconfont"
            @click="() => changeCartItemInfo(shopId, item._id, item, 1)"
          >&#xe60d;</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon" @click="handleCartShowChange">
        <img class="check__icon__img" src="http://www.dell-lee.com/imgs/vue3/basket.png">
        <div class="check__icon__tag" v-show="calculations.total > 0">{{calculations.total}}</div>
      </div>
      <div class="check__info" v-show="calculations.total > 0">
        <span class="check__info__totle">总计：</span>
        <span class="check__info__price">&yen;{{calculations.price}}</span>
      </div>
      <div class="check__info" v-show="calculations.total === 0">
        购物车是空的
      </div>
      <div class="check__btn" v-show="calculations.total > 0">
        <router-link :to="{path: `/orderConfirmation/${shopId}`}">
        去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffect'

// 获取购物车的产品信息逻辑
const useCartEffect = (shopId) => {
  const { changeCartItemInfo, productList, calculations } = useCommonCartEffect(shopId)
  const store = useStore()

  // 购物车勾选按钮相关逻辑
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }

  // 购物车全选按钮相关逻辑
  const setCartItemChecked = (shopId, allChecked) => {
    store.commit('setCartItemChecked', { shopId, allChecked })
  }

  const clearCartProducts = (shopId) => {
    store.commit('clearCartProducts', shopId)
  }

  return { calculations, changeCartItemInfo, productList, changeCartItemChecked, setCartItemChecked, clearCartProducts }
}

// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleCartShowChange } = toggleCartEffect()
    const { calculations, changeCartItemInfo, productList, changeCartItemChecked, setCartItemChecked, clearCartProducts } = useCartEffect(shopId)
    return { calculations, changeCartItemInfo, productList, changeCartItemChecked, shopId, clearCartProducts, setCartItemChecked, showCart, handleCartShowChange }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import '../../style/mixins.scss';

.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5)
}
.product {
  padding-bottom: .16rem;
  overflow-y: scroll;
  flex: 1;
  background-color: $bgColor;
  &__header {
    display: flex;
    position: relative;
    padding: 0 .18rem;
    height: .52rem;
    line-height: .52rem;
    font-size: .14rem;
    color: $content-fontcolor;
    background-color: $bgColor;
    border-bottom: .01rem solid $content-bgColor;
    &__icon {
      margin-right: .08rem;
      font-size: .24rem;
      color: $buttom-bgColor;
    }
    &__clear {
      position: absolute;
      right: .18rem;
    }
  }
  &__item {
    position: relative;
    display: flex;
    height: .46rem;
    padding-top: .16rem;
    margin: 0 .18rem 0 .18rem;
    // border-bottom: .01rem #F1F1F1 solid;
    &__checked {
      height: .46rem;
      line-height: .46rem;
      margin-right: .16rem;
      font-size: .24rem;
      color: $buttom-bgColor;
    }
    &__img {
      height: .46rem;
      width: .46rem;
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
    &__price {
      margin: .06rem 0 0 0;
      font-size: .14rem;
      line-height: .2rem;
      color: $highlight-fontColor;
    }
    &__yen {
      font-size: .1rem;
    }
    &__money {
      font-weight: 600;
    }
    &__origin {
      margin-left: 0.08rem;
      font-size: .1rem;
      line-height: .2rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      height: .46rem;
      line-height: .46rem;
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

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -.01rem .01rem 0 $content-bgColor;
}

.check {
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background-color: $bgColor;
  &__icon {
    position: relative;
    width: .84rem;
    &__img {
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }
    &__tag {
      position: absolute;
      left: .5rem;
      top: .04rem;
      padding: 0 .05rem;
      // min-width: .2rem;
      height: .2rem;
      font-size: .16rem;
      line-height: .2rem;
      text-align: center;
      color: $bgColor;
      font-weight: 600;
      background-color: $highlight-fontColor;
      border-radius: .1rem;
      transform: scale(.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: .12rem;
    &__totle {
      vertical-align: middle;
    }
    &__price {
      color: $highlight-fontColor;
      font-size: .18rem;
      font-weight: 600;
      vertical-align: middle;
    }
  }
  &__btn {
    width: .98rem;
    font-size: .14rem;
    font-weight: 600;
    text-align: center;
    background-color:$buttom-bgColor;
    a {
      text-decoration: none;
      color: $bgColor;
    }
  }
}
</style>
