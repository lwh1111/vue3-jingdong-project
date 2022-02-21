<template>
<div class="warpper">
  <div class="header"></div>
  <div class="personalInfo">
    <img class="personalInfo__photo" src="../../assets/photo.jpg" />
    <h3 class="personalInfo__name">{{userInfo.username}}</h3>
    <div class="personalInfo__id">ID: {{userInfo._id}}</div>
    <div class="personalInfo__cards">
      <div
        class="personalInfo__card"
        v-for="item in cartList"
        :key="item.title"
      >
        <div class="personalInfo__card__title">{{item.title}}</div>
        <div class="personalInfo__card__number">{{item.numer}}</div>
      </div>
    </div>
  </div>
  <div class="list">
    <template
      v-for="(item, index) in list"
      :key="index"
    >
      <!-- <router-link> -->
        <div
          class="list__item"
          @click="item.to"
        >
          <div
            class="list__item__icon iconfont"
            :style="`background-color:` + item.style"
            v-html="item.icon"
          />
          <div class="list__item__test">{{item.test}}</div>
          <div class="list__item__enter iconfont">&#xe646;</div>
        </div>
      <!-- </router-link> -->
    </template>
  </div>
  <div class="logout" @click="handleLogoutClick">退出登录</div>
</div>
<Docker :currentIndex = "3"/>
</template>

<script>
import { reactive } from 'vue'
import Docker from '../../components/Docker.vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'

// 获取用户信息
const useUserEffect = () => {
  const userInfo = reactive({ _id: '', username: '' })
  const getUserInfo = async () => {
    const result = await get('/api/user/info')
    if (result?.errno === 0 && result?.data) {
      const { _id, username } = result.data
      userInfo._id = _id || ''
      userInfo.username = username || ''
    }
  }
  getUserInfo()
  return userInfo
}

export default {
  name: 'PersonalInfo',
  components: { Docker },
  setup () {
    const router = useRouter()
    const cartList = [
      { title: '红包', numer: '218' },
      { title: '优惠券', numer: '12张' },
      { title: '鲜豆', numer: '88' },
      { title: '白条', numer: '1000' }
    ]
    const handleAddressClick = () => {
      router.push({ name: 'MyAddressList' })
    }
    const list = [
      { icon: '&#xe637;', test: '我的地址', style: '#32C5FF', to: handleAddressClick },
      { icon: '&#xe6aa;', test: '我的钱包', style: '#ED4A47', to: {} },
      { icon: '&#xe60c;', test: '客服与帮助', style: '#9013FE', to: {} }
    ]
    const userInfo = useUserEffect()
    const handleLogoutClick = () => {
      localStorage.removeItem('isLogin')
      router.replace({ name: 'Login' })
    }
    return { cartList, list, userInfo, handleLogoutClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";

.warpper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: $dark-bgColor;
}
.header {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1.8rem;
  background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
}
.personalInfo {
  position: absolute;
  top: .91rem;
  right: 0;
  left: 0;
  z-index: 2;
  margin: 0 .18rem 0 .18rem;
  height: 2.03rem;
  background-color: $bgColor;
  box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
  border-radius: .08rem;
  &__photo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    height: .94rem;
    width: .94rem;
    border-radius: 50%;
  }
  &__name {
    margin: .59rem 0 .02rem 0;
    font-size: .24rem;
    color: $content-fontcolor;
    text-align: center;
    line-height: .36rem;
  }
  &__id {
    font-size: .14rem;
    color: #C1C0C9;
    text-align: center;
  }
  &__cards {
    display: flex;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    height: .76rem;
    border-top: .01rem solid $content-bgColor;
  }
  &__card {
    flex: 1;
    text-align: center;
    &__title {
      margin-top: .12rem;
      font-size: .12rem;
      line-height: .17rem;
      color: #C1C0C9;
    }
    &__number {
      margin-top: .03rem;
      font-size: .20rem;
      line-height: .28rem;
      color: $content-fontcolor;
    }
    &__icon {
      border-radius: .08rem;
    }
  }
}
.list {
  margin: 3.1rem .18rem 0 .18rem;
  background-color: $bgColor;
  border-radius: .08rem;
  box-shadow: 0 .08rem .16rem 0 rgba(0,0,0,0.08);
  &__item {
    display: flex;
    line-height: .48rem;
    &__icon {
      margin: .13rem .12rem .13rem .16rem;
      width: .22rem;
      height: .22rem;
      font-size: .16rem;
      text-align: center;
      line-height: .23rem;
      color: $bgColor;
      border-radius: .08rem;
    }
    &__test {
      flex: 1;
      font-size: .14rem;
      color: $content-fontcolor;
    }
    &__enter {
      transform: rotate(180deg);
      margin-right: .12rem;
      font-size: .16rem;
      color: $search-fontColor;
    }
  }
  a {
  text-decoration: none;
  }
}
.logout {
  margin: .16rem .18rem 0 .18rem;
  font-size: .14rem;
  text-align: center;
  line-height: .4rem;
  color: $bgColor;
  background-color: $buttom-bgColor;
  border-radius: .08rem;
}
</style>
