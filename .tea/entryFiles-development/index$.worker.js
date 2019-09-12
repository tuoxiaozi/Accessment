if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        


function success() {
require('../../app');
require('../../pages/index/index');
require('../../pages/wikipedia/wikipedia');
require('../../pages/visonRecord/visonRecord');
require('../../pages/testResult/testResult');
require('../../pages/colorBlindTest/colorBlindTest');
require('../../pages/astigmiaTest/astigmiaTest');
require('../../pages/visonTest/visonTest');
require('../../pages/visionStart/visionStart');
require('../../pages/mine/mine');
require('../../pages/health/health');
require('../../pages/auth/auth');
require('../../pages/medical/medical');
require('../../pages/mytest/mytest');
require('../../pages/result/result');
require('../../pages/test/test');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}