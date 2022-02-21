<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
    <div class="wrapper__input">
      <input
      @focus="handleFocus"
      class="wrapper__input__content"
      type="text" placeholder="请输入用户名"
      v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
      class="wrapper__input__content"
      type="password" placeholder="请输入密码"
      v-model="password"
      autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request' // 引入封装的post方法
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 处理登录相关逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter()// 获取useRouter实例
  const data = reactive({ username: '', password: '' })

  const handleLogin = async () => {
    // 密码错误时显示‘登陆失败’ 网络异常时显示‘请求失败’
    try { // 使用 try catch 语法，当 逻辑异常时 显示‘请求失败’
      const { username, password } = data
      if (username === '') {
        showToast('请输入用户名')
      } else if (password === '') {
        showToast('请输入密码')
      } else {
        const result = await post('/api/user/login', {
          username: data.username,
          password: data.password
        })
        if (result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          showToast('登录失败')
        }
      }
    } catch (e) {
      showToast('请求失败')
    }
  }

  const { username, password } = toRefs(data)// 把多个reactive类型的数据转成 toRefts 类型的数据
  return { username, password, handleLogin }
}

// 处理注册跳转
const useRegisterEffect = () => {
  const router = useRouter()// 获取useRouter实例
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegisterClick }
}

export default {
  name: 'Login',
  components: { Toast },
  // setup 函数的职责是告诉代码执行的流程
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()

    return { username, password, show, toastMessage, handleLogin, handleRegisterClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto .4rem;
    width: .66rem;
    height: .66rem;
  }
  &__input {
    box-sizing: border-box;
    margin: 0 auto .16rem;
    width: 2.95rem;
    height: .48rem;
    &__content {
      box-sizing: border-box;
      padding: 0 .16rem;
      width: 2.95rem;
      height: .48rem;
      line-height: .48rem;
      font-size: .16rem;
      background-color: #F9F9F9;
      border: .01rem $content-notice-fontcolor solid;
      border-radius: .04rem;
      outline: none;
      font-size: .16rem;
      color: $content-notice-fontcolor;
      &::placeholder {
      color: $content-notice-fontcolor;
      }
    }
    &__content:focus {
      border: .01rem solid $buttom-bgColor;
    }
  }
  &__login-button {
    margin: .32rem auto .16rem;
    width: 2.95rem;
    font-size: .16rem;
    line-height: .48rem;
    text-align: center;
    color: $bgColor;
    background: $buttom-bgColor;
    border-radius: .04rem;
    box-shadow: 0 .04rem .08rem rgba(0,145,255,0.32);
  }
  &__login-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
