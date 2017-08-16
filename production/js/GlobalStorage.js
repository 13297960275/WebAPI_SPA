//存储对象
var GlobalStorage;

GlobalStorage = function () {
    this.USER = {
        ACCOUNT:'wilive.user.account',
        USERNAME:'wilive.user.name',
        ACCESSTOKEN:'wilive.user.accesstoken',
        TARGET_URL: 'wilive.user.targeturl',
        PRIVILEGE:'wilive.user.privilege',
        LANGUAGE:'wilive.user.language',
        TENANTID:'wilive.user.tenantid',
        TENANTCODE:'wilive.user.tenantcode',
        ROLEID:'wilive.user.roleid',
        ROLECODE:'wilive.user.rolecode',
        DEPTID:'wilive.user.deptid'
    }
}

// GlobalStorage.prototype.getItem = function (key) {
//     return localStorage.getItem(key);
// };

// GlobalStorage.prototype.setItem = function (key, obj) {
//     localStorage.setItem(key, obj);
// };

// GlobalStorage.prototype.removeItem = function (key) {
//     localStorage.removeItem(key);
// };

// GlobalStorage.prototype.clear = function () {
//     localStorage.clear();
// };


GlobalStorage.prototype.getItem = function (key) {
    // return jQuery.cookie(key);
};

GlobalStorage.prototype.setItem = function (key, obj) {
    var exdate = new Date()
    exdate.setMinutes(exdate.getMinutes()+30);
    // jQuery.cookie(key, obj, { expires: new Date(exdate) }); 
};

GlobalStorage.prototype.removeItem = function (key) {
    jQuery.removeCookie(key);
};

GlobalStorage.prototype.clear = function () {
    this.removeItem(this.USER.ACCOUNT);
    this.removeItem(this.USER.USERNAME);
    this.removeItem(this.USER.ACCESSTOKEN);
    this.removeItem(this.USER.TARGET_URL);
    this.removeItem(this.USER.PRIVILEGE);
    this.removeItem(this.USER.LANGUAGE);
    this.removeItem(this.USER.TENANTID);
    this.removeItem(this.USER.TENANTCODE);
    this.removeItem(this.USER.ROLEID);
    this.removeItem(this.USER.ROLECODE);
    this.removeItem(this.USER.DEPTID);
};
