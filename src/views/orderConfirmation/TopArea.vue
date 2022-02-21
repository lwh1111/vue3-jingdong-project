<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">&#xe646;</div>
      确认订单
    </div>
    <div class="top__recevier">
      <h4 class="top__recevier__title">收货地址</h4>
      <div v-if="address" @click="handleAddressClick">
        <p class="top__recevier__address">
          {{address.city}}{{address.department}}{{address.houseNumber}}
        </p>
        <div class="top__recevier__info">
          <span class="top__recevier__info__name">{{address.name}}</span>
          <span class="top__recevier__info__name">{{address.phone}}</span>
        </div>
        <div class="iconfont top__recevier__enter">&#xe646;</div>
      </div>
      <div v-else>
        <div class="top__receiver__address">
          暂无可用地址
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import useAddressEffect from './addressEffect'

export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const shopId = route.params.id
    const handleBackClick = () => { router.push(`/shop/${shopId}`) }
    const handleAddressClick = () => { router.push(`/chooseAddressList/${shopId}`) }
    const address = useAddressEffect()
    return { handleBackClick, handleAddressClick, address }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import '../../style/mixins';

.top {
  position: relative;
  height: 1.76rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;
  &__header {
    padding: .16rem .18rem .2rem .18rem;
    line-height: .32rem;
    color: $bgColor;
    font-weight: 400;
    text-align: center;
    font-size: .16rem;
    &__back {
      position: absolute;
      // width: 0.3rem;
      margin-left: -0.05rem;
      font-size: .24rem;
    }
  }
  &__recevier {
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    color: $content-fontcolor;
    background-color: $bgColor;
    border-radius: .04rem;
    &__title {
      margin: 0;
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      font-weight: 600;
      line-height: .22rem;
    }
    &__address {
      @include ellipse;
      margin: 0;
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      line-height: .2rem;
    }
    &__info {
      padding: .06rem 0 0 .16rem;
      font-size: .12rem;
      color: $medium-fontColor;
      &__name {
        margin-right: .08rem;
        line-height: .17rem;
      }
    }
    &__enter {
      transform: rotate(180deg);
      position: absolute;
      right: .12rem;
      top: .48rem;
      font-size: .18rem;
      color: $medium-fontColor;
    }
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
  }
}
</style>
