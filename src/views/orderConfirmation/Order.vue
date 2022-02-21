<template>
  <div class="order">
    <div class="order__info">实付金额
      <span class="order__info__price">&yen;{{calculations.price}}</span>
    </div>
      <div class="order__btn" @click="() => handleShowConfirmChange(true)">提交订单</div>
  </div>
  <div
    class="mask"
    v-show="showConfirm"
    @click="() => handleShowConfirmChange(false)"
  >
    <!-- @click.stop 禁止冒泡 -->
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="() => handleConfirmOrder(true)"
        >取消订单</div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="() => handleConfirmOrder(false)"
        >确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCommonCartEffect } from '../../effects/cartEffect'
import { useRoute, useRouter } from 'vue-router'
import { post } from '../../utils/request'
import { useStore } from 'vuex'
import { ref } from 'vue'

// 处理确认支付相关逻辑
const useMakeOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter()
  const store = useStore()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    // 用 for in 循环遍历 productList，productList是计算属性，要加上 .value
    for (const i in productList.value) {
      const product = productList.value[i]
      // parseInt(string, radix) 将字符串转换为整数， radix 表示基数，10 为 10 进制
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    try { // 使用 try catch 语法，当 逻辑异常时 显示‘下单失败’
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value, // shopName 是计算属性，要加上 .value，否则发送请求失败
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        store.commit('clearCartProducts', shopId)
        router.push({ name: 'OrderList' })
      }
    } catch (e) {
      // 提示下单失败
    }
  }
  return handleConfirmOrder
}

// 和弹层展示相关逻辑
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirmChange }
}

export default {
  name: 'Order',
  setup () {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { shopName, productList, calculations } = useCommonCartEffect(shopId)
    const handleConfirmOrder = useMakeOrderEffect(shopId, shopName, productList)
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect()

    return { showConfirm, handleShowConfirmChange, calculations, handleConfirmOrder }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';

.order {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: .49rem;
  font-size: .14rem;
  line-height: .49rem;
  background-color: $bgColor;
  box-shadow: 0 -.01rem .01rem 0 $content-bgColor;
  &__info {
    flex: 1;
    padding-left: .24rem;
    &__price {
      font-weight: 600;
    }
  }
  a {
      text-decoration: none;
  }
  &__btn {
    width: .98rem;
    font-weight: 600;
    text-align: center;
    background-color:$buttom-bgColor;
    color: $bgColor;
  }
}

.mask {
  // z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,0.50);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3.01rem;
    height: 1.57rem;
    background-color: $bgColor;
    border-radius: .04rem;
    &__title {
      margin: .24rem 0 0 0;
      font-size: .18rem;
      line-height: .25rem;
      text-align: center;
      color: $content-fontcolor;
    }
    &__desc {
      margin-top: .08rem;
      font-size: .14rem;
      line-height: .2rem;
      text-align: center;
      color: $medium-fontColor;
    }
    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }
    &__btn {
      text-align: center;
      width: .78rem;
      height: .3rem;
      font-size: .14rem;
      line-height: .3rem;
      border-radius: .16rem;
      border: .01rem solid #4FB0F9;
      &--first {
        margin-right: .24rem;
        color: $buttom-bgColor;
        background-color: $bgColor;
      }
      &--last {
        color: $bgColor;
        background-color: #4FB0F9;
      }
    }
  }
}
</style>
