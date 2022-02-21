<template>
  <div  class="docker" >
    <div v-for="(item, index) in dockerList" :key="item.icon"
      :class="{'docker__item': true, 'docker__item--active': index === currentIndex}"
    >
      <router-link :to='item.to'>
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{item.title}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe64e;', title: '首页', to: { name: 'Home' } },
      { icon: '&#xe765;', title: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe713;', title: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe7d5;', title: '我的', to: { name: 'PersonalInfo' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/variables.scss";
.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  right: 0;
  // height: 0.49rem;
  box-shadow: 0 -.01rem .01rem 0 $content-bgColor;
  background-color: $bgColor;
  &__item {
    flex: 1;
    text-align: center;
    a {
      color: $medium-fontColor;
      text-decoration: none;
    }
    .iconfont {
      margin: 0.06rem 0 0.02rem 0;
      font-size: 0.2rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 0.2rem;
    line-height: .18rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
