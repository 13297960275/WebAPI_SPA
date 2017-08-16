app.factory('userFactory', function ($http, $q) {
    return {
        getUserAuthorizedURI: function (redirectUri, clientId) {
            var str = '?response_type=code';
            str += '&redirect_uri=' + redirectUri;
            str += '&client_id=' + clientId;
            str += '&prompt=login';

            var redirectURI = 'https://login.microsoftonline.com/common/oauth2/authorize' + str;
            return redirectURI;
        }
    }
    return app;
});