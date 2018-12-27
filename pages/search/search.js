// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pois:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getAddress:function(e){
    // console.log(e.detail.value)
    var val = e.detail.value
    var that = this
    wx.request({
      url: 'https://restapi.amap.com/v3/place/text',
      data:{
        keywords:val,
        key:'e4bafd250b7db094f1d57bc5151925a3',
        citylimit:true,
        offset:20
      },
      success:function(res){
        // console.log(res)
        that.setData({
          pois:res.data.pois
        })
      }
    })
  },
  change:function(e){
    // console.log(e)
    var location = e.currentTarget.dataset.location
    var lng = location.split(',')[0]
    var lat = location.split(',')[1]
    wx.redirectTo({
      url: '../index/index?lng=' + lng + '&lat=' + lat
    })
  },
  onLoad: function (options) {

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