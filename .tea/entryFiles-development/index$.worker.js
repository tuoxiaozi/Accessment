if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;


function success() {
require('../../app');
require('../../pages/colorBlindTest/colorBlindTest');
require('../../pages/astigmiaTest/astigmiaTest');
require('../../pages/index/index');
require('../../pages/mine/mine');
require('../../pages/visionTest/visionTest');
require('../../pages/visionStart/visionStart');
require('../../pages/wikipedia/wikipedia');
require('../../pages/visonRecord/visonRecord');
require('../../pages/health/health');
require('../../pages/visionTest/visionTest');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}