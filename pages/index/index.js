// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lng:'',//经度
    lat:'',//维度
    data:'',//天气数据
    update:'',//更新时间
    aqi:'', //空气质量
    skycon:'',//天气概况
    wind:'',//风力
    direction:'',//风向
    precipitation:'',//降雨量
    pres:'',//大气压
    hidd_loading:true,//隐藏加载中动画
  },
  //获取位置
  getLocation:function(){
    this.setData({
      hidd_loading:false
    })
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'wgs84',
        success : res => resolve(res)
      })
    })
  },
  //空气质量
  setAqi: function (n) {
    var that = this
    this.setData({
      aqi:n
    },function(){
      // console.log(that.data.aqi)
    })
  },
  aqi:function(i){
    if (i <= 50){
      this.setAqi('优')
    } else if (i <= 100){
      this.setAqi('良')
    } else if (i <= 150){
      this.setAqi('轻度污染')
    } else if (i <= 200) {
      this.setAqi('中度污染')
    } else if (i <= 300) {
      this.setAqi('重度污染')
    } else {
      this.setAqi('严重污染')
    }
  },
  //天气概况
  setSkycon:function(n){
    var that = this
    that.setData({
      skycon:n
    },function(){
      // console.log(that.data.skycon)
    })
  },
  skycon: function (n) {
    switch (n){
      case 'CLEAR_DAY':
        this.setSkycon('晴天')
        break;
      case 'CLEAR_NIGHT':
        this.setSkycon('晴夜')
        break;
      case 'PARTLY_CLOUDY_DAY':
        this.setSkycon('多云')
        break;
      case 'PARTLY_CLOUDY_NIGHT':
        this.setSkycon('多云')
        break;
      case 'CLOUDY':
        this.setSkycon('阴')
        break;
      case 'RAIN':
        this.setSkycon('雨')
        break;
      case 'SNOW':
        this.setSkycon('雪')
        break;
      case 'WIND':
        this.setSkycon('风')
        break;
      case 'HAZE':
        this.setSkycon('雾霾沙尘')
        break;
    }
  },
  //风力
  setWind:function(n){
    var that = this
    that.setData({
      wind:n
    },function(){
      // console.log(that.data.wind)
    })
  },
  wind:function(n){
    if (n < 1){
      this.setWind('0级')
    } else if (n < 6) {
      this.setWind('1级')
    } else if(n < 12){
      this.setWind('2级')
    } else if (n < 20) {
      this.setWind('3级')
    } else if (n < 28) {
      this.setWind('4级')
    } else if (n < 38) {
      this.setWind('5级')
    } else if (n < 49) {
      this.setWind('6级')
    } else if (n < 61) {
      this.setWind('7级')
    } else if (n < 74) {
      this.setWind('8级')
    } else if (n < 88) {
      this.setWind('9级')
    } else if (n < 102) {
      this.setWind('10级')
    } else if (n < 117) {
      this.setWind('11级')
    } else if (n < 134) {
      this.setWind('12级')
    } else if (n < 149) {
      this.setWind('13级')
    } else if (n < 166) {
      this.setWind('14级')
    } else if (n < 183) {
      this.setWind('15级')
    } else if (n < 201) {
      this.setWind('16级')
    } else if (n < 220) {
      this.setWind('17级')
    } else if (n < 221) {
      this.setWind('17级以上')
    }else{
      this.setWind('超级台风(五级飓风)')
    }
  },
  //降雨量
  setPrecipitation(e){
    var that = this;
    that.setData({
      precipitation:e
    },function(){
      // console.log(that.data.precipitation)
    })
  },
  precipitation:function(e){
    if(e==0){
      this.setPrecipitation(null)
    }else if(e<10){
      this.setPrecipitation('小雨')
    }else if(e<=25){
      this.setPrecipitation('中雨')
    } else if (e <= 50) {
      this.setPrecipitation('大雨')
    } else if (e <= 100) {
      this.setPrecipitation('暴雨')
    } else if (e <= 250) {
      this.setPrecipitation('大暴雨')
    } else if (e > 250) {
      this.setPrecipitation('特大暴雨')
    }
  },
  //风向
  setDirection:function(e){
    var that = this
    that.setData({
      direction:e
    },function(){
      // console.log(that.data.direction)
    })
  },
  direction:function(e){
    if(0 < e && e < 5){
      this.setDirection('北')
    } else if (6 < e && e < 45){
      this.setDirection('东北偏北')
    } else if (46 < e && e<85){
      this.setDirection('东北偏东')
    } else if (86 < e && e<95){
      this.setDirection('东')
    } else if (96 < e && e<135) {
      this.setDirection('东南偏东')
    } else if (136 < e && e < 175) {
      this.setDirection('东南偏南')
    } else if (176 < e && e< 185) {
      this.setDirection('南')
    } else if (186 < e && e < 225) {
      this.setDirection('西南偏南')
    } else if (226 < e && e < 275) {
      this.setDirection('西南偏西')
    } else if (276 < e && e< 315) {
      this.setDirection('西北偏西')
    } else if (316 < e && e < 355) {
      this.setDirection('西北偏北')
    } else if (356 < e && e<360) {
      this.setDirection('北风')
    }
  },
  //获取天气
  getWeather: function (lng, lat){
    var that = this
    wx: wx.request({
      url: 'https://api.caiyunapp.com/v2/YGfdS8qarxLFj2Sw/'+lng+','+lat+'/realtime.json',
      data:{
        unit:'metric:v2'
      },
      method: 'GET',
      success: function (res) {
        // console.log(res)
        if (res.data.status == 'ok'){
          var date = new Date(res.data.server_time*1000)
          if (date.getSeconds()<10){
            var s = '0' + date.getSeconds()
          }else{
            var s = date.getSeconds()
          }
          if (date.getHours()<10){
            var h = '0' + date.getHours()
          }else{
            var h = date.getHours()
          }
          if (date.getMinutes()<10){
            var m = '0' + date.getMinutes()
          }else{
            var m = date.getMinutes()
          }
          var update = h + ':' + h + ':' + s
          that.aqi(res.data.result.aqi) //空气质量
          that.skycon(res.data.result.skycon) //天气概况
          that.wind(res.data.result.wind.speed) //风力等级
          that.precipitation(res.data.result.precipitation.local.intensity)//降雨等级
          that.direction(res.data.result.wind.direction)//风向
          var pres = Math.round((res.data.result.pres * 100)/100) / 100
          // console.log(pres)
          that.setData({
            hidd_loading:true,
            update: update,//更新时间
            pres: pres,//大气压/百帕
            data: res.data.result
          }, function () {
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getDate(){
    var that = this
    that.getLocation().then((res) => {
      // console.log(res)
      that.getWeather(res.longitude, res.latitude)
    })
  },
  onLoad: function (options) {
    this.getDate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})