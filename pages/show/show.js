// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
  },



  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },

// confirm之后 一个 Edit function, 把客户的数据更新， stage变成下一个，同时加入新的数据
// 可以有那种升级的效果：恭喜！{{name}}现在的分数为{{score}}!
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    // Get api data
    wx.request({
      url: `http://localhost:3000/api/v1/customers/${options.id}`,
      method: 'GET',
      success(pos) {
        const customer = pos.data
        page.setData(
          customer
        );
        wx.hideToast();
      }
    });


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

  onClicklvlup: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})