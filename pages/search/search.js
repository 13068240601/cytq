// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pois:'',
    val:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getVal:function(e){
    var that = this
    var val = e.detail.value
    that.setData({
      val:val
    })
  },
  getAddress:function(e){
    // console.log(e.detail.value)
    var that = this
    wx.request({
      url: 'https://restapi.amap.com/v3/place/text',
      data:{
        keywords:that.data.val,
        key:'72309cbc0e86ee57c8c63a1247b0ed66',
        citylimit:true,
        offset:20
      },
      success:function(res){
        console.log(res.data.pois)
        that.setData({
          pois:res.data.pois
        })
      }
    })
  },
  jump({lng,lat,name}){
    if(name){
      wx.redirectTo({
        url: '../index/index?lng=' + lng + '&lat=' + lat + '&name=' + name
      })
    }else{
      wx.redirectTo({
        url: '../index/index?lng=' + lng + '&lat=' + lat
      })
    }
  },
  change:function(e){
    var location = e.currentTarget.dataset.location
    var id = e.currentTarget.id
    var lng = location.split(',')[0]
    var lat = location.split(',')[1]
    var that = this
    // if ((that.data.pois[id].name.indexOf('省') != -1 || that.data.pois[id].name.indexOf('市') != -1 || that.data.pois[id].name.indexOf('区') != -1 || that.data.pois[id].name.indexOf('镇') != -1) && that.data.pois[id].name.indexOf('社区') == -1){
    //   // console.log(that.data.pois[id].name)
    //   that.jump({ lng: lng, lat: lat, name: that.data.pois[id].name })
    // } else if (that.data.pois[id].name.indexOf('社区') != -1){
    //   that.jump({ lng: lng, lat: lat})
    // }else{
    if (that.data.pois[id].cityname == that.data.pois[id].name){
      var name = that.data.pois[id].cityname + ',' + that.data.pois[id].adname
    } else if ((that.data.pois[id].cityname + that.data.pois[id].adname) == that.data.pois[id].name){
      var name = that.data.pois[id].name
    }else{
      var name = that.data.pois[id].cityname + ',' + that.data.pois[id].adname + ',' + that.data.pois[id].name
    }
    that.jump({ lng: lng, lat: lat, name: name})
    // }
    
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