<template>
  <div class="address">
    <div class="address__info">
      <span class="address__info__name">{{address.name}}</span>
      <span class="address__info__phone">{{address.phone}}</span>
    </div>
    <p class="address__detail">
      {{address.city}}{{address.department}}{{address.houseNumber}}
    </p>
    <div class="iconfont address__enter">&#xe646;</div>
  </div>
</template>

<script>
export default {
  name: 'Address',
  props: ['address']
}
</script>

<style lang="scss" scoped>
@import '../style/variables';
@import "../style/mixins.scss";

.address {
  position: relative;
  margin-bottom: .16rem;
  padding: .18rem 0 .18rem .16rem;
  color: $content-fontcolor;
  background-color: $bgColor;
  border-radius: .04rem;
  &__detail {
    margin: 0;
    padding: .08rem .4rem 0 0;
    font-size: .14rem;
    line-height: .2rem;
  }
  &__info {
    font-size: .14rem;
    line-height: .2rem;
    color: $light-fontColor;
    &__name {
      display: inline-block;
      margin-right: .04rem;
      width: .9rem;
    }
    &__phone {
      display: inline-block;
    }
  }
  &__enter {
    position: absolute;
    right: .12rem;
    top: 50%;
    transform: translate(0, -50%) rotate(180deg);
    font-size: .18rem;
    color: $light-fontColor;
  }
}
</style>
