<template>
  <div class="title">我的订单</div>
  <div class="wrapper">
    <div class="orders">
      <div
        class="order"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="order__title">{{item.shopName}}
          <span class="order__status">
            {{item.isCanceled ? '已取消' : '已下单'}}
          </span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template
              v-for="(innderItem, innerIndex) in item.products"
              :key="innerIndex"
            >
              <img
                class="order__content__img"
                :src="innderItem.product.img"
                v-if="innerIndex <= 3"
              />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">¥ {{item.totalPrice}}</div> <!-- item就是order -->
            <div class="order__content__count">共 {{item.totalNumber}} 件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex = "2"/>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Docker from '../../components/Docker.vue'
import { get } from '../../utils/request'

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getOrderList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach((productItem) => {
          totalNumber += (productItem?.orderSales || 0) // 获取订单总价
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0) // 获取订单商品总数
        })
        order.totalPrice = totalPrice // order.totalPirce 在每个订单上都加上 totalPirce 属性
        order.totalNumber = totalNumber
      })
      // 这是个引用类型，改 orderList 实际上就是在改 result.data ，所以不用把 orderList 重新赋值给 result.data
      data.list = result.data
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';

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

.title {
  text-align: center;
  font-size: .16rem;
  line-height: .44rem;
  color: $content-fontcolor;
  background-color: $bgColor;
}

.order {
  box-sizing: border-box;
  margin-top: .16rem;
  padding: .16rem;
  height: 1.1rem;
  background-color: $bgColor;
  border-radius: .04rem;
  &__title {
    line-height: .22rem;
    font-size: .16rem;
    font-weight: 600;
    color: $content-fontcolor;
  }
  &__status {
    float: right;
    text-align: right;
    font-size: .14rem;
    color: $light-fontColor;
  }
  &__content {
    margin-top: .16rem;
    display: flex;
    &__imgs {
      flex: 1;
      height: .4rem;
    }
    &__img {
      margin-right: .12rem;
      width: .4rem;
      height: .4rem;
    }
    &__info {
      width: .7rem;
      text-align: right;
    }
    &__price {
      line-height: .2rem;
      font-size: .14rem;
      color: $highlight-fontColor;
    }
    &__count {
      margin-top: .04rem;
      font-size: .12rem;
    }
  }

}
</style>
