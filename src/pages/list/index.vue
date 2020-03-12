<template>
  <view>
    <!-- 筛选 -->
    <view class="filter">
      <text class="active">综合</text>
      <text>销量</text>
      <text>价格</text>
    </view>
    <!-- 商品列表 -->
    <scroll-view class="goods" scroll-y @scrolltolower='reachBottom'>
      <view :key='item.goods_id' v-for='item in goods' class="item" @click="goDetail(item.goods_id)">
        <!-- 商品图片 -->
        <image class="pic" :src="item.goods_small_logo"></image>
        <!-- 商品信息 -->
        <view class="meta">
          <view class="name">{{item.goods_name}}</view>
          <view class="price">
            <text>￥</text>{{item.goods_price}}<text>.00</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        // 搜索关键字
        kw: '',
        // 商品列表数据
        goods: [],
        // 商品列表总数
        total: 0,
        // 当前查询的页码
        pagenum: 1,
        // 每页查询多少条
        pagesize: 5,
        // 接口调用状态位
        loaded: false
      }
    },
    onLoad (param) {
      this.kw = param.kw
      this.loadData(param.kw)
    },
    onReachBottom () {
      console.log('页面滚动到了底部！！！')
    },
    methods: {
      reachBottom () {
        // console.log('列表区域已经触底')
        // 判断是否还有更多数据
        if (this.goods.length >= this.total) {
          // 没有更多数据了，给一个提示，终止后续的接口调用
          uni.showToast({
            title: '没有更多数据了'
          })
          return
        }
        // 加载下一页数据
        this.pagenum = this.pagenum + 1
        // 页码加一后需要再次调用后台接口
        this.loadData(this.kw)
      },
      async loadData (kw) {
        // 根据关键字查询商品列表
        if (this.loaded) {
          // 如果接口尚未返回数据，就阻止后续的请求
          return
        }
        // 表示接口正在发送请求，但是尚未返回结果
        this.loaded = true
        const {message} = await this.$request({
          // path: 'goods/search?pagenum=2&pagesize=5&query=' + kw,
          path: 'goods/search',
          param: {
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            query: kw
          }
        })
        // 对于分页来说应该做累加操作
        // this.goods.push(...message.goods)
        // this.goods = this.goods.concat(message.goods)
        this.goods = [...this.goods, ...message.goods]
        this.total = message.total
        // 接口返回数据后，允许再次发送请求
        this.loaded = false
      },
      goDetail (id) {
        console.log(id)
        uni.navigateTo({
          url: '/pages/goods/index?id=' + id
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .filter {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    border-bottom: 1rpx solid #ddd;

    /* #ifdef H5 */
    position: relative;
    z-index: 99;
    /* #endif */

    text {
      flex: 1;
      text-align: center;
      font-size: 30rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }
  
  .goods {
    position: absolute;
    width: 100%;
    top: 97rpx;
    bottom: 0;
  }

  .item {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 20rpx;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .pic {
      width: 200rpx;
      height: 200rpx;
      margin-right: 30rpx;
    }

    .meta {
      flex: 1;
      font-size: 27rpx;
      color: #333;
      position: relative;
    }

    .name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      position: absolute;
      bottom: 0;

      color: #ea4451;
      font-size: 33rpx;

      text {
        font-size: 22rpx;
      }
    }
  }
</style>
