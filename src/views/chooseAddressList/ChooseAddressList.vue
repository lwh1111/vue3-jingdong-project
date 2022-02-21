<template>
  <div class="title">
    <div class="iconfont title__icon" @click="handleBackClick">&#xe646;</div>
    收货地址
  </div>
  <div class="wrapper">
    <div class="myAddress">我的收货地址</div>
    <Address
      v-for="address in addressList"
      :key="address._id"
      :address="address"
      @click="handleChooseClick(address._id)"
    />
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import Address from '../../components/Address.vue'
import { useStore } from 'vuex'
import { toRefs } from 'vue'
import useCommonAddressEffect from '../../effects/addressEffect'

export default {
  name: 'ChooseAddressList',
  components: { Address },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const shopId = route.params.shopId
    const handleBackClick = () => { router.back() }

    // 获取地址信息
    const { addressList } = toRefs(store.state)
    const { getAddressList } = useCommonAddressEffect()
    getAddressList()

    // 选择地址操作
    const handleChooseClick = (addressId) => {
      router.push(`/orderConfirmation/${shopId}/${addressId}`)
    }

    return { handleBackClick, addressList, handleChooseClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
@import "../../style/mixins.scss";

.title {
  text-align: center;
  font-size: .16rem;
  line-height: .44rem;
  padding: 0 .18rem;
  color: $content-fontcolor;
  background-color: $bgColor;
  &__icon {
    position: absolute;
    margin-left: -0.05rem;
    font-size: .2rem;
  }
}
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
.myAddress {
  font-size: .14rem;
  margin: .16rem 0 .12rem 0;
}
</style>
