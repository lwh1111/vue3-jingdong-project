<template>
  <div class="title">
    <div class="iconfont title__back" @click="handleBackClick">&#xe646;</div>
    <div class="title__text">{{addressId ? '修改收货地址' : '新建收货地址'}}</div>
    <div class="title__add" @click="updateAddress">保存</div>
  </div>
  <div class="wrapper">
    <div class="form">
      <div class="form__item">
        <div class="form__item__label">所在城市：</div>
        <input class="form__item__content" placeholder="如：北京市" v-model="formData.city">
      </div>
      <div class="form__item">
        <div class="form__item__label">小区/大厦/学校：</div>
        <input class="form__item__content" placeholder="如：理工大学国防科技园" v-model="formData.department">
      </div>
      <div class="form__item">
        <div class="form__item__label">楼号-门牌号：</div>
        <input class="form__item__content" placeholder="A号楼B层" v-model="formData.houseNumber">
      </div>
      <div class="form__item">
        <div class="form__item__label">收货人：</div>
        <input class="form__item__content" placeholder="请填写收货人的姓名" v-model="formData.name">
      </div>
      <div class="form__item">
        <div class="form__item__label">联系电话：</div>
        <input class="form__item__content" placeholder="请填写收货手机号" v-model="formData.phone">
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
// import { useStore } from 'vuex'
import { reactive } from 'vue'
import { get, patch } from '../../utils/request'

export default {
  name: 'UpdateAddress',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const addressId = route.params.id
    const handleBackClick = () => { router.back() }
    const formData = reactive({ city: '', department: '', houseNumber: '', name: '', phone: '' })

    // 获得表格里的默认数据
    const getAddressList = async () => {
      const result = await get(`/api/user/address/${addressId}`)
      if (result?.errno === 0 && result?.data) {
        const { city, department, houseNumber, name, phone } = result.data
        formData.city = city
        formData.department = department
        formData.houseNumber = houseNumber
        formData.name = name
        formData.phone = phone
      }
    }
    if (addressId) { getAddressList() }

    // 将更新的内容传给接口
    const updateAddress = async () => {
      if (addressId) {
        const result = await patch(`/api/user/address/${addressId}`, { data: formData })
        if (result?.errno === 0) { router.back() }
      } else {
        const result = await patch('/api/user/address', { data: formData })
        if (result?.errno === 0) { router.back() }
      }
    }
    return { handleBackClick, addressId, formData, updateAddress }
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
  background-color: #f8f8f8;
}
.form {
  margin-top: .12rem;
  height: 2.24rem;
  background-color: $bgColor;
  overflow: hidden;
  &__item {
    display: flex;
    margin: 0 .18rem;
    font-size: .14rem;
    line-height: .44rem;
    border-bottom: .01rem solid $content-bgColor;
    &__label {
      color: $medium-fontColor;
    }
    &__content {
      flex: 1;
      padding: 0;
      width: 100%;
      outline: none;
      border: none;
      color: $medium-fontColor;
      &::placeholder {
        color: $light-fontColor;
      }
    }
  }
}
</style>
