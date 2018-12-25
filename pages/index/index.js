// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lng:null,//经度
    lat:null,//维度
    data:null,//天气数据
  },
  //获取位置
  getLocation:function(){
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'wgs84',
        success : res => resolve(res)
      })
    })
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
        console.log(res)
        if (res.data.status == 'ok'){
          that.setData({
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
  onLoad: function (options) {
    var that = this
    that.getLocation().then((res)=>{
      // console.log(res)
      that.getWeather(res.longitude, res.latitude)
    })
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