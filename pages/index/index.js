//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    deg: 50,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  onClick: function (e) {
    // console.log(e)
    // const id = e.currentTarget.dataset.post.id
    wx.navigateTo({
      url: `/pages/browse/browse`,
    })
  },

  onClick2: function (e) {
    // console.log(e)
    // const id = e.currentTarget.dataset.post.id
    wx.navigateTo({
      url: `/pages/finance/finance`,
    })
  },

  onLoad: function (options) {




    this.setData({
      deg: 26,
    })
    // .css({ "transform": 'rotate(' + 75 + 'deg)' });
    
    // change color with javascript 
    // https://jsfiddle.net/ep87rdm1/3/
    // https://codepen.io/unkingbk/pen/zdZVPp

    // Save reference to page
    let page = this;
    // Get api data
    wx.request({
      url: "http://localhost:3000/api/v1/customers",
      method: 'GET',
      success(res) {
        const customers = res.data.customers;






      
        
        var i;
        var pros = [];
        var init = [];
        var nego = [];
        var orde = [];
        for (i = 0; i < customers.length; i++) {
          console.log(customers[i].stage);
          if (customers[i].stage == "Prospect") {
            pros.push(customers[i]);
          };
          if (customers[i].stage == "Initial Offer") {
            init.push(customers[i]);
          };
          if (customers[i].stage == "Negotiation") {
            nego.push(customers[i]);
          };
          if (customers[i].stage == "Order") {
            orde.push(customers[i]);
          };
        };


        // Update local data
        page.setData({
          customers: customers,
          pros: pros,
          init: init,
          nego: nego,
          orde: orde,
        });

        function compare_score(a, b) {
          if (a.score > b.score)
            return -1;
          if (a.score < b.score)
            return 1;
          return 0;
        };

        getApp().globalData.customers.sort(compare_score);
        page.setData({
          customers: customers.sort(compare_score),
        });
        wx.hideToast();
        console.log(1234, customers[0]);

        var topcustomers = [];
        topcustomers.push(customers[0]);
        topcustomers.push(customers[1]);
        topcustomers.push(customers[2]);
        topcustomers.push(customers[3]);

        page.setData({
          topcustomers: topcustomers,
        });

          



        wx.hideToast();
      }
    });





    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };


  },



  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }


})
