<script>
export default {
  onLaunch: function () {
    // console.log('App Launch')
    this.$AppReady.then(() => {
      // console.log(this.$Route)
    })

  },
  onShow: function () {
    // console.log('App Show')
    // document.getElementsByTagName('body')[0].style.setProperty('--main-bg-color', 'red');
    this.$AppReady.then(() => {
      // console.log(this.$Route)
    })
  },
  onHide: function () {
    // console.log('App Hide')
  },
  methods: {
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
@import './static/styles/index.scss';
</style>
