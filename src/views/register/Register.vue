<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="text" placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content"
        type="password"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="确认密码"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有帐号去登录</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request' // 引入封装的post方法
import { useRouter } from 'vue-router'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useRegisterEffect = (showToast) => {
  const router = useRouter()// 获取useRouter实例
  const data = reactive({ username: '', password: '', ensurement: '' })

  // 处理注册相关逻辑
  const handleRegister = async () => {
    // 密码错误时显示‘登陆失败’ 网络异常时显示‘请求失败’
    try {
      const { username, password, ensurement } = data
      if (username === '') {
        showToast('请输入用户名')
      } else if (password === '') {
        showToast('请输入密码')
      } else if (ensurement === '') {
        showToast('请确认密码')
      } else if (ensurement !== password) {
        showToast('请输入相同的密码')
      } else {
        const result = await post('/api/user/register', { // 使用封装的post方法
          username: data.username,
          password: data.password
        })
        if (result?.errno === 0) {
          router.push({ name: 'Login' })
        } else {
          showToast('注册失败')
        }
      }
    } catch (e) {
      showToast('请求失败')
    }
  }

  const { username, password, ensurement } = toRefs(data)// 把多个reactive类型的数据转成 toRefts 类型的数据
  return { username, password, ensurement, handleRegister }
}

// 处理登录跳转
const useLoginEffect = () => {
  const router = useRouter()// 获取useRouter实例
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()

    return { username, password, ensurement, handleRegister, show, toastMessage, handleLoginClick }
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
  &__register-button {
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
  &__register-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
