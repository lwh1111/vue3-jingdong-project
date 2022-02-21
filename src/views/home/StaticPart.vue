<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe61f;</span>
    北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe60b;</span>
  </div>
  <div class="search">
    <div class="iconfont">&#xe600;</div>
    <input class="search__text" placeholder="山姆会员商店优惠商品"/>
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
  <div class="icons">
    <div
      class="icons__item"
      v-for="item in iconsList"
      :key="item.desc"
    >
      <img
        class="icons__item__img"
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
      />
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.2rem;
  font-size: 0.16rem;
  color: $content-fontcolor;
  @include ellipse;
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
}

.search {
  display: flex;
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  color: $search-fontColor;
  font-size: 0.14rem;
  background-color: $search-bgColor;
  border-radius: 0.16rem;
  .iconfont {
    margin-left: .04rem;
    // width: .44rem;
    padding: 0 .06rem 0 .12rem;
    text-align: center;
    font-size: 0.18rem;
    color: $search-fontColor;
  }
  &__text {
    // display: inline-block;
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

.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 20%;
    text-align: center;
    &__img {
      height: 0.4rem;
      width: 0.4rem;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem;
      font-size: 0.12rem;
      line-height: 0.17rem;
      color: $content-fontcolor;
    }
  }
}

.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: $content-bgColor;
}
</style>
