// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  getWeather:function(){
    wx: wx.request({
      url: 'https://api.caiyunapp.com/v2/YGfdS8qarxLFj2Sw/121.6544,25.1552/realtime.json',
      method: 'GET',
      success: function (res) {
        // console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getLocation().then((res)=>{
      console.log(res)
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