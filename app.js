// app.js
App({
  onLaunch() {

    //获取系统信息
    wx.getSystemInfoAsync({
      success: res => {
        this.globalData.systemInfo = res;
      }
    })

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.info("wx.getSetting success. " )
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        
      }
    })

    //用户位置信息
    wx.getLocation({
      type: 'gcj02',
      altitude: false,
      isHighAccuracy: true,
      success: res => {
        console.info("wx.getLocation user's latitude: " + res.latitude)
        console.info("wx.getLocation user's longitude: " + res.longitude)
        this.globalData.location = res;
        if (this.userLocationReadyCallback) {
          this.userLocationReadyCallback(res)
        }
      }
    })

  },
  globalData: {
    userInfo: null,
    systemInfo: null,
    location: null
  }
})