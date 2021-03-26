import {mapGetters} from 'vuex'

export default{
  computed:{
    ...mapGetters('m_cart',['total'])
  },
  onLoad(){
    this.setBadge()
  },
  methods:{
    setBadge(){
      uni.setTabBarBadge({
        index:2,
        text:String(this.total)
      })
    }
  },
  watch:{
    total(newVal){
      this.setBadge()
    }
  }
}