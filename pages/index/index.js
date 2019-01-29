// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    load:false,//数据加载完
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
    forecast_keypoint: '',//预测关键点
    forecast:'',//预报数据
    hourly:'',//小时级天气预报
    hourlypres: [],//小时级气压
    daypres:[],//天级级气压
    address:'',
    greetings:''//问候语
  },
  //搜索地址
  search:function(){
    wx.redirectTo({
      url:'../search/search'
    })
  },
  //获取位置
  getLocation:function(){
    this.setData({
      hidd_loading:false
    })
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success() {
                wx.getLocation({
                  type: 'wgs84',
                  success : res => resolve(res),
                  fail:res => reject(res)
                })
              },
              fail(){
                wx.showModal({
                  title: '',
                  content: '不授权将获取不到数据,是否打开用户位置授权',
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success(res) {
                        }
                      })
                    } else if (res.cancel) {
                      
                    }
                  }
                })
              }
            })
          }
        }
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
    if(0 < e && e <= 5){
      this.setDirection('北')
    } else if (6 < e && e <= 45){
      this.setDirection('东北偏北')
    } else if (46 < e && e<=85){
      this.setDirection('东北偏东')
    } else if (86 < e && e<=95){
      this.setDirection('东')
    } else if (96 < e && e<=135) {
      this.setDirection('东南偏东')
    } else if (136 < e && e <= 175) {
      this.setDirection('东南偏南')
    } else if (176 < e && e<= 185) {
      this.setDirection('南')
    } else if (186 < e && e <= 225) {
      this.setDirection('西南偏南')
    } else if (226 < e && e <= 275) {
      this.setDirection('西南偏西')
    } else if (276 < e && e<= 315) {
      this.setDirection('西北偏西')
    } else if (316 < e && e <= 355) {
      this.setDirection('西北偏北')
    } else if (356 < e && e<=360) {
      this.setDirection('北风')
    }
  },
  //获取天气
  getWeather: function (lng, lat){
    var that = this
    this.setData({
      hidd_loading:false,
      load:false,
    },function(){
      wx: wx.request({
        url: 'https://api.caiyunapp.com/v2/YGfdS8qarxLFj2Sw/' + lng + ',' + lat + '/realtime.json',  
        data: {
          unit: 'metric:v2'
        },
        method: 'GET',
        success: function (res) {
          // console.log(res.data.server_time * 1000)
          if (res.data.status == 'ok') {
            var date = new Date(res.data.server_time * 1000)
            if (date.getSeconds() < 10) {
              var s = '0' + date.getSeconds()
            } else {
              var s = date.getSeconds()
            }
            if (date.getHours() < 10) {
              var h = '0' + date.getHours()
            } else {
              var h = date.getHours()
            }
            if (date.getMinutes() < 10) {
              var m = '0' + date.getMinutes()
            } else {
              var m = date.getMinutes()
            }
            // console.log(new Date(res.data.server_time * 1000))
            var update = h + ':' + m + ':' + s
            that.aqi(res.data.result.aqi) //空气质量
            that.skycon(res.data.result.skycon) //天气概况
            that.wind(res.data.result.wind.speed) //风力等级
            that.precipitation(res.data.result.precipitation.local.intensity)//降雨等级
            that.direction(res.data.result.wind.direction)//风向
            var pres = Math.round((res.data.result.pres * 100) / 100)
            // console.log(pres)
            that.setData({
              hidd_loading: true,
              load:true,
              update: update,//更新时间
              pres: pres,//大气压/百帕
              data: res.data.result
            }, function () {
            })
          }
        }
      })
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取地名
  getAddress:function(){
    var that = this
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      data: {
        location: that.data.lng + ',' + that.data.lat,
        key: 'e4bafd250b7db094f1d57bc5151925a3',
      },
      success: function (res) {
        // console.log(res)
        if (res.data.status == 1) {
          that.setData({
            address: res.data.regeocode
          })
        }
      }
    })
  },
  getData(){
    var that = this
    if ((that.data.lng == '' || that.data.lat=='')&&that.data.address==''){
      
      that.getLocation().then((res) => {
        that.setData({
          lng: res.longitude,
          lat: res.latitude
        }, function () {
          that.getWeather(that.data.lng, that.data.lat)
          that.getforecast(that.data.lng, that.data.lat)
          that.gethourly(that.data.lng, that.data.lat)
          that.getAddress()
        })
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      that.getWeather(that.data.lng, that.data.lat)
      that.getforecast(that.data.lng, that.data.lat)
      that.gethourly(that.data.lng, that.data.lat)      
      // that.getAddress()
      // console.log(that.data.address)
    }
    
  },
  //获取天级天气预报
  getforecast(lng,lat){
    var that = this
    that.setData({
      hidd_loading: false,
      load: false,
    },function(){
      wx.request({
        url: 'https://api.caiyunapp.com/v2/YGfdS8qarxLFj2Sw/' + lng + ',' + lat + '/daily.json',
        data: {
          unit: 'metric:v2'
        },
        method: 'GET',
        success: function (res) {
          var daypres = res.data.result.daily.pres
          var dpres = [];
          for (let i = 0; i < daypres.length; i++) {
            dpres[i] = {}
            dpres[i].max = Math.round((daypres[i].max * 100) / 100)
            dpres[i].min = Math.round((daypres[i].min * 100) / 100)
          }
          that.setData({
            forecast: res.data.result,
            daypres: dpres,
            hidd_loading:true,
            load:true
          })
          // console.log(res.data)
        }
      })
    })
   
  },
  // 获取小时级天气预报
  gethourly(lng,lat){
    var that = this
    that.setData({
      hidd_loading: false,
      load: false,
    }, function () {
      wx.request({
        url: 'https://api.caiyunapp.com/v2/YGfdS8qarxLFj2Sw/' + lng + ',' + lat + '/hourly.json',
        data: {
          unit: 'metric:v2'
        },
        method: 'GET',
        success: function (res) {
          var hourlypres = res.data.result.hourly.pres
          var hpres = [];
          for (let i = 0; i < hourlypres.length;i++){
            hpres.push(Math.round((hourlypres[i].value * 100) / 100))
          }
          that.setData({
            forecast_keypoint: res.data.result.forecast_keypoint,
            hourly: res.data.result,
            hourlypres: hpres,
            hidd_loading: true,
            load: true
          })
          // console.log(res.data)
        }
      })
    })
  },
  onLoad: function (options) {
    var that = this
    var d = new Date()
    var h = d.getHours()
    var greetings = ''
    if(h>=6&&h<=8){
      greetings = '早上好'
    }else if(h>=9&&h<=11){
      greetings = '上午好'
    }else if(h>=12&&h<=13){
      greetings = '中午好'
    }else if(h>=14&&h<=17){
      greetings = '下午好'
    }else if(h==18){
      greetings = '傍晚好'
    }else{
      greetings = '晚上好'
    }
    this.setData({
      greetings:greetings
    })
    if(options.lng){
      that.setData({
        lng: options.lng,
        lat: options.lat,
        address: options.name
      }, function () {
        that.getData()
      })
    }else{
      that.getData()
    }
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