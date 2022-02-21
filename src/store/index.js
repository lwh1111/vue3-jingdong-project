import { createStore } from 'vuex'

// 储存购物车信息到localstorage
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList) // 存储到localstorage里必须是JSON内容
  localStorage.cartList = cartListString
}

// 从localstorage获取购物车信息
const getLocalCartList = () => {
  // JSON.parse后面是undefind会提示错误，最好放到 try catch 里
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    // {shopId{shopName: '', productList: {productId: {} } } }
    cartList: getLocalCartList(),
    // 第一层级是商铺ID
    // shopId: {
    //   shopName: '沃尔玛',
    //   productList: {
    //       productId: {
    //          _id: '1',
    //          name: '番茄250g/份',
    //          imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //          sales: 10,
    //          price: 33.6,
    //          oldPrice: 39.6,
    //          count: 2
    //       },
    //    }
    // },
    addressList: []
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      // vuex底层会把state里的数据转换成一个proxy数据，具有响应式效果，所以不用reactive
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} } // 1. 获取传过来的shopId 方括号[]表示动态查找，如果不存在就创建{}
      let product = shopInfo.productList[productId] // 2. 获取传过来的sproductId
      if (!product) { // ! 用于将操作的值强制转换为布尔值并取反
        productInfo.count = 0
        product = productInfo
      }
      product.count = product.count + num
      if (num > 0) { product.check = true }
      if (product.count < 0) { product.count = 0 }
      if (product.count > 99) { product.count = 99 }
      // 给productInfo和shopInfo重新赋值  修改了引用类型 需要把修改后的productInfo和shopInfo赋值回state.cartList
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    // 选择按钮相关逻辑
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      // state.cartList[shopId][productId].check = !state.cartList[shopId][productId].check
      // 只修改了一个基础类型，比如布尔值，不用重新赋值
      setLocalCartList(state)
    },

    // 全选按钮相关逻辑
    setCartItemChecked (state, payload) {
      const { shopId, allChecked } = payload
      const shopInfo = state.cartList[shopId].productList
      for (const i in shopInfo) {
        const product = shopInfo[i]
        if (allChecked) {
          product.check = false
        } else {
          product.check = true
        }
      }
      setLocalCartList(state)
    },

    // 清空购物车
    clearCartProducts (state, shopId) {
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },

    // 获取地址信息
    changeAddressList (state, addressList) {
      state.addressList.splice(0, state.addressList.length, ...addressList)
    }
  },
  actions: {
  },
  modules: {
  }
})
