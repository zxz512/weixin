<template>
  <view>
    <!-- 搜索 -->
    <search />
    <!-- 分类 -->
    <view class="category">
      <!-- 顶级分类 -->
      <view class="sup">
        <scroll-view scroll-y @click='handleChange'>
          <!-- <text class="active">大家电</text> -->
          <text :data-id='item.cat_id' :class='{active: currentId === item.cat_id}' :key='item.cat_id' v-for='item in categories'>{{item.cat_name}}</text>
        </scroll-view>
      </view>
      <!-- 子级分类 -->
      <view class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="http://static.botue.com/ugo/uploads/category.png" class="thumb"></image>
          <view class="children" :key='item.cat_id' v-for='item in rightData'>
            <view class="title">{{item.cat_name}}</view>
            <!-- 品牌 -->
            <view class="brands">
              <navigator url="/pages/list/index" :key='brand.cat_id' v-for='brand in item.children'>
                <image :src="brand.cat_icon"></image>
                <text>{{brand.cat_name}}</text>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
  import search from '@/components/search';

  export default {
    data () {
      return {
        // 分类所有数据
        categories: [],
        // 当前分类
        currentId: 1
      }
    },
    components: {
      search
    },
    onLoad () {
      this.loadData()
    },
    computed: {
      rightData () {
        // 根据当前选中的一级分类计算出二级和三级分类的数据
        // 计算属性会对已有的数据进行缓存
        const data = this.categories.filter(item => {
          return item.cat_id === this.currentId
        })
        // [] 作为条件是true if ([]) {}
        return data[0]? data[0].children: []
      }
    },
    methods: {
      handleChange (e) {
        // 控制一级分类的切换
        // console.log('change' + e.target.dataset.id)
        this.currentId = e.target.dataset.id
      },
      async loadData () {
        // 调用分类接口获取数据
        const { message } = await this.$request({
          path: 'categories'
        })
        this.categories = message
      }
    }
  }
</script>

<style scoped lang="less">
  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      text {
        display: block;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }
        
        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        text {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>
