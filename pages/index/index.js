// index.js
// 获取应用实例
const app = getApp()

const normalCallout = {
  id: 1,
  latitude: 23.098994,
  longitude: 113.322520,
  iconPath: '/image/location.png',
  callout: {
    content: '文本内容',
    color: '#ff0000',
    fontSize: 14,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#000000',
    bgColor: '#fff',
    padding: 5,
    display: 'ALWAYS',
    textAlign: 'center'
  },
  // label: {
  //   content: 'label 文本',
  //   fontSize: 24,
  //   textAlign: 'center',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   bgColor: '#fff',
  //   padding: 5
  // }
}

const customCallout1 = {
  id: 2,
  latitude: 23.097994,
  longitude: 113.323520,
  iconPath: '/image/location.png',
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS'
  },
}

const customCallout2 = {
  id: 3,
  latitude: 23.096994,
  longitude: 113.324520,
  iconPath: '/image/location.png',
  customCallout: {
    anchorY: 10,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customCallout3 = {
  id: 4,
  latitude: 23.095994,
  longitude: 113.325520,
  iconPath: '/image/location.png',
  customCallout: {
    anchorY: 0,
    anchorX: 20,
    display: 'ALWAYS',
  },
}

const allMarkers = [normalCallout, customCallout1, customCallout2, customCallout3]
const windowHeight = '400px';
Page({
  data: {
    windowHeight: app.globalData.systemInfo.windowHeight + 'px',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    latitude: 23.096994,
    longitude: 113.324520,
    markers: [],
    customCalloutMarkerIds: [],
    num: 1
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function (e) {
    

    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad() {

    //用户登录信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
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
    }
    if (!app.globalData.location) {
      app.userLocationReadyCallback = res => {
      console.info("Set user's latitude: " + res.latitude)
      console.info("Set user's longitude: " + res.longitude)
        this.setData({
          latitude: app.globalData.location.latitude,
          longitude: app.globalData.location.longitude
        })
      }
    } else {
      this.setData({
        latitude: app.globalData.location.latitude,
        longitude: app.globalData.location.longitude
      })
    }


  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})