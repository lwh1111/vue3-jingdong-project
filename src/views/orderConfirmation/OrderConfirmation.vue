<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
  </div>
  <Order />
</template>

<script>
import TopArea from './TopArea'
import ProductList from './ProductList'
import Order from './Order'
import useCommonAddressEffect from '../../effects/addressEffect'

export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductList, Order },
  setup () {
    const { getAddressList } = useCommonAddressEffect()
    getAddressList()
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';

.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f8f8f8;
  overflow-y: scroll;
}

</style>
