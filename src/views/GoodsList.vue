<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Goods</span>
      <!-- 此处内容将引入插槽 -->
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd  @click="all" >
                <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}">All</a>
              </dd>
              <dd v-for="(price, index) in priceFilter" @click="setPriceFilter(index)">
                <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked==index}">{{ price.startPrice }} - {{
                  price.endPrice }}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="i in goodsList">
                  <div class="pic">
                    <a href="#">
                      <!-- 如果src写死了 dom渲染速度比较快 可能导致图片加载不出来 -->
                      <img v-bind:src="'/static/'+i.productImage" alt="">

                      <!-- 懒加载前 使用我们设置的 loading -->
                      <!-- 加载完成后 使用我们写好的路径 -->
                      <!-- 会自动检测 滚动条 滚到的才加载 -->
                      <!-- 如果图片比较大 就会有 很长时间的 loading 状态 -->
                      <!-- 避免一开始 大量加载 不必要的静态资源 耗费大量请求吧   -->
                      <!--<img v-lazy="'/static/'+i.productImage" alt="">-->
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{ i.productName }}</div>
                    <div class="price">{{ i.salePrice }}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(i.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="load-more">
                <img src="../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>

    <modal :mdShow="mdShow" @close="closeModal">
      <!--内容会插入到组件留 slot 位置-->
      <p slot="message">
        请先登录 否则无法加入到购物车中！
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click = "mdShow = false">关闭</a>
      </div>
    </modal>

    <modal :mdShow="mdShowCart" @close="closeModal">
      <!--内容会插入到组件留 slot 位置-->
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功！</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click = "mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
      </div>
    </modal>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import './../assets/css/login.css'
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  import NavBread from './../components/NavBread'
  import Modal from './../components/Modal'
  import axios from 'axios'

  // const API_PROXY = 'https://bird.ioliu.cn/v1/?url='

  export default {
    data() {
      return {
        // 因为 我们得到的数据是数组
        //   这样 方便去便利
        goodsList: [],
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '2000.00'
          },
          {
            startPrice: '2000.00',
            endPrice: '4000.00'
          },
        ],
        priceChecked: 'all',
        filterBy: false,
        overLayFlag: false,
        sortFlag: true,
        page: 1,
        pageSize: 8,
        busy: true,
        loading: false,
        mdShow: false,
        mdShowCart: false
      }
    },
    /*
    * 此处不是 元素
    * 在 es6 中 会自动解析 key value 一样的对象
    * */
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    // 生命周期初始化
    mounted: function () {
      this.getGoodsList()
    },
    methods: {
      getGoodsList(flag) {
        var params = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked
        }
        // 请求前将 loading 开启
        this.loading = true
        axios.get('/api/goods/list', {
          params: params
        }).then(res => {
          // 如果 flag 为 true 则证明 不是第一次请求 需要将请求的结果 拼接
          this.loading = false
          // 请求完毕 将 loading 关掉
          if (flag) {
            this.goodsList = this.goodsList.concat(res.data.result.list)
            if (res.data.result.count < 8) {
              this.busy = true
            } else {
              this.busy = false
            }
          } else {
            this.goodsList = res.data.result.list
            this.busy = false
          }
        })
      },
      showFilterPop() {
        this.filterBy = true
        this.overLayFlag = true
      },
      closePop() {
        this.filterBy = false
        this.overLayFlag = false
      },
      setPriceFilter(index) {
        this.page = 1
        this.priceChecked = index
        this.closePop()
        this.getGoodsList()
      },
      sortGoods() {
        this.sortFlag = !this.sortFlag
        this.page = 1
        this.getGoodsList()
      },
      loadMore() {
        this.busy = true
        setTimeout(() => {
          this.page++
          this.getGoodsList(true)
        }, 500)
      },
      all() {
        this.priceChecked='all'
        this.getGoodsList()
      },
      addCart(productId) {
        axios.post("/api/goods/addCart", {
          productId: productId
        }).then((res) => {
          if (res.data.status == 0) {
            // alert('加入成功')
            this.mdShowCart = true
            this.$store.commit('updateCartCount', 1)
          } else {
            // console.log(res)
            // alert(res.data.msg)
            this.mdShow = true
          }
        })
      },
      closeModal() {
        this.mdShow = false
      }
    }
  }
</script>

<style lang="stylus">


</style>
