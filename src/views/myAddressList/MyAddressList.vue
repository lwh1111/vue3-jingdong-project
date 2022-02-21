<template>
  <div class="title">
    <div class="iconfont title__back" @click="handleBackClick">&#xe646;</div>
    <div class="title__text">管理收货地址</div>
    <div class="title__add" @click="handleAddClick">新建</div>
  </div>
  <div class="wrapper">
    <div class="myAddress">我的收货地址</div>
    <Address
      v-for="address in addressList"
      :key="address._id"
      :address="address"
      @click="handleUpdateClick(address._id)"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { toRefs } from 'vue'
import Address from '../../components/Address.vue'
import useCommonAddressEffect from '../../effects/addressEffect'

export default {
  name: 'MyAddressList',
  components: { Address },
  setup () {
    const store = useStore()
    const router = useRouter()
    const handleBackClick = () => { router.back() }
    const handleAddClick = () => { router.push({ name: 'UpdateAddress' }) }
    // 点击已有的地址进行更新，会传相应的ID
    const handleUpdateClick = (addressId) => { router.push(`/updateAddress/${addressId}`) }

    const { addressList } = toRefs(store.state)

    const { getAddressList } = useCommonAddressEffect()
    getAddressList(true)

    return { handleBackClick, handleAddClick, handleUpdateClick, addressList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';

.title {
  display: flex;
  text-align: center;
  font-size: .16rem;
  line-height: .44rem;
  padding: 0 .18rem;
  color: $content-fontcolor;
  background-color: $bgColor;
  &__back {
    width: .28rem;
    margin: 0 .05rem 0 -.05rem;
    font-size: .2rem;
    color: $light-iconColor;
  }
  &__text {
    flex: 1;
  }
  &__add {
    width: .28rem;
    font-size: .14rem;
  }
}
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: .44rem;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0 0.18rem;
  background-color: #f8f8f8;
}
.myAddress {
  font-size: .14rem;
  margin: .16rem 0 .12rem 0;
  color: $content-fontcolor;
}
</style>
