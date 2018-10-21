// 加显示方式：不同stage在前，按score排序，按date排序（默认）
// 加分数：计算每个客户的score



// pages/browse/browse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    // Get api data
    wx.request({
      url: "http://localhost:3000/api/v1/customers",
      method: 'GET',
      success(res) {
        const customers = res.data.customers;


        var i;
        var score;
        for (i = 0; i < customers.length; i++) {
          score = customers[i].rating * 50000 + customers[i].potential_value * 0.7
          if (customers[i].stage == "Prospect") {
            score += 10000
            console.log(customers[i].name,score);
          };
          if (customers[i].stage == "Initial Offer") {
            score += 30000
            console.log(customers[i].name,score);
          };
          if (customers[i].stage == "Negotiation") {
            score += 80000
            console.log(customers[i].name,score);
          };
          if (customers[i].stage == "Order") {
            score = 400000
            console.log(customers[i].name,score);
          };



          if (score < 100000) {
            score = (score - 100000) / 100000 * 10 + 70
          };
          if (score >= 100000 && score < 200000) {
            score = (score - 100000) / 100000 * 10 + 70
          };
          if (score >= 200000 && score < 300000) {
            score = (score - 200000) / 100000 * 10 + 80
          };
          if (score >= 300000 && score < 400000) {
            score = (score - 300000) / 100000 * 10 + 90
          };
          if (score >= 400000) {
            score = 100
          };



          let id = customers[i].id;
          let name = customers[i].name;
          let rating = customers[i].rating;
          let intended_product = customers[i].intended_product;
          let potential_value = customers[i].potential_value;
          let wechat = customers[i].wechat;
          let stage = customers[i].stage;
          let user = customers[i].user;
          let score = score



          let customer = {
            id: id,
            name: name,
            rating: rating,
            intended_product: intended_product,
            potential_value: potential_value,
            wechat: wechat,
            stage: stage,
            user: user,
            score: score
          }


          // Update api data
          wx.request({
            url: `http://localhost:3000/api/v1/customers/${customers[i].id}`,
            method: 'put',
            data: { customer },
            success: function (pos) {
              console.log(1234, score)
              // set data on index page and show

            }
          })



          

        };



          
      page.setData({
        customers: customers,
      });
      wx.hideToast();
    }
    });



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  onClickscore: function () {

    function compare_score(a, b) {
      if (a.score > b.score)
        return -1;
      if (a.score < b.score)
        return 1;
      return 0;
    }

    getApp().globalData.customers.sort(compare_score);
        this.setData({
          customers: getApp().globalData.customers.sort(compare_score),
        });
        wx.hideToast();

  },

  onClickstage: function () {

    // function stage_number (a) {
    //   if (a.stage = "Prospect")
    //   a.stage = 1;
    //   if (a.stage = "Initial Offer")
    //   a.stage = 2;
    //   if (a.stage = "Negotiation")
    //   a.stage = 3;
    //   if (a.stage = "Order")
    //   a.stage = 4
    // }

    function compare_score(a, b) {
      var aIndex
      var bIndex
      if (a.stage == "Prospect")
      aIndex = 1;
      if (a.stage == "Initial Offer")
      aIndex = 2;
      if (a.stage == "Negotiation")
      aIndex = 3;
      if (a.stage == "Order")
      aIndex = 4;
      if (b.stage == "Prospect")
      bIndex = 1;
      if (b.stage == "Initial Offer")
      bIndex = 2;
      if (b.stage == "Negotiation")
      bIndex = 3;
      if (b.stage == "Order")
      bIndex = 4;

      if (aIndex < bIndex)
        return -1;
      if (aIndex > bIndex)
        return 1;
      return 0;
    }

    getApp().globalData.customers.sort(compare_score);
    this.setData({
      customers: getApp().globalData.customers.sort(compare_score),
    });
    wx.hideToast();

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  onClick: function (e) {
    console.log(e)
    const id = e.currentTarget.dataset.customer.id
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
    })
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