rootApp.factory("User", ['$http', '$rootScope', '$q', '$filter', function ($http, $rootScope, $q, $filter) {

    var userData = {};
    var friendData = {};
    var userOk = {};
    var selectedFriend = {};
    var friends = {};
    var photos = {};

    var analyzed = 0;

    return {
        fetchUserData: function () {
            return $http({
                    method: 'GET',
                    url: '/user.json'
                })
                .then(function (response) {
                    return response.data;
                });
        },

        fetchFriendData: function (uid) {

            var _this = this;
            var defer = $q.defer();
            FAPI.Client.call({
                "fields": "first_name,last_name,pic640x480,gender",
                "uid": uid,
                "method": "users.getInfoBy"
            }, function (method, data, error) {
                    if (!error) {
                        _this.setFriendData(data.user);
                        defer.resolve(data.user);
                    } else {
                         defer.resolve(null);
                    }
            });
            return defer.promise;

        },



        getAnalyzed: function () {
            return analyzed;
        },


        updateAnalyzed: function (newVal) {
            analyzed = newVal;
        },


        setAnalyzed: function (res) {
            return $http({
                   method: 'POST',
                    url: '/app/a',
                    data: {r:res},
                    params: $rootScope.requestParameters,
                    paramSerializer: '$httpParamSerializerJQLike'
                })
                .then(function (response) {
                    analyzed = response.data.analyzed;
                    return response.data;
                });
        },


        fetchUserFriends: function () {

            if (friends.length > 0)
            {
                var defer = $q.defer();
                    defer.resolve(friends);
                return defer.promise;
            }
            var _this = this;

            return $http({
                    method: 'GET',
                    url: '/app/friends',
                    params: $rootScope.requestParameters,
                    paramSerializer: '$httpParamSerializerJQLike'
                })
                .then(function (response) {
                    console.log('fetchUserFriends:', response);

//                    var _friends= [];
                    if (userData._gifts !== undefined)
                    {
                        angular.forEach(response.data, function (value, key) {

    //                        if (value.uid) {
    //                            $filter("filter")(userData._gifts, {uid: uid}, true)[0];

                                var _Indx = userData._gifts.indexOf(value.uid);
                                if(_Indx != -1)
                                {
                                    console.log('_Indx:', _Indx);
                                    console.log('key:', key);
    //                                _friends[key] = value;
                                    response.data.splice(key, 1);
                                }
    //                        }
                        });
                    }
                    return response.data;
//                    return _friends;
                });

//            FAPI.Client.call({
//                "method": "friends.get"
//            }, callback_friends_get);
        },



        getUserFriends: function () {
            return friends;
        },

        setUserFriends: function (values) {
            friends = values;
        },

        updateUserFriends: function(uid){
            var _Indx = friends.indexOf(selectedFriend);
            console.log('_Indx:', _Indx);
            friends.splice(_Indx, 1);
        },



        fetchUserPhotos: function () {

            var defer = $q.defer();
            if (photos.length > 0)
            {
                defer.resolve(photos);
                return defer.promise;
            }
            FAPI.Client.call({
                "method": "photos.getPhotos",
                "fields": "photo.pic640x480 ,photo.mark_count",
                "count": 100,
                "detectTotalCount": true
            }, function (method, result, error) {
                if (result && result.photos && result.photos.length > 0)
                {
                    photos = result.photos;
                    defer.resolve(photos);
                }
            });

            return defer.promise;
        },

        getUserData: function () {
            return userData;
        },



        setUserData: function (values) {

//            var _userData = [];
//            angular.forEach(values, function (value, key) {
//                value = value.attributes;
//                if (/(stub_)/.test(value)) {
//                    value = "/i/user-empty.png";
//                }
//                _userData[key] = value;
//            });
//            userData = _userData;
            userData = values;
        },


        getUserOk: function () {
            return userOk;
        },

        setUserOk: function (value) {
            userOk = value;
        },

        getFriendData: function (uid) {
            if (friendData.uid === undefined) {
                return this.fetchFriendData(uid);
            } else {
                return friendData;
            }
        },

        setFriendData: function (value) {
            friendData = value;
        },

        updateUserOkPhoto: function (value) {
            userOk.pic640x480 = value;
        },


        setSelectedFriend: function (uid) {
            selectedFriend  = $filter("filter")(friends, {uid: uid}, true)[0];
        },

        getSelectedFriend: function(){
            return selectedFriend;
        }







    }


}]);


/*

var callback_friends_get = function (method, result, error) {

    if (result && result.length > 0) {

        console.log('callback_friends_get result:', result);
        //        var uids = result.slice(0,100).join(',');
        //
        //        FAPI.Client.call(
        //        {
        //            "method":"users.getInfo",
        //            "fields":"gender,first_name,last_name,name,pic_3,pic_1,pic128x128",
        //            "uids":uids
        //        }, callback_users_getInfo);


    } else {
        console.log('callback_friends_get', error);

        bootAng([]);

    }
};


var callback_users_getInfo = function (method, result, error) {




    //  сортирнуть юзеров по гендерному признаку
    var females = [];

    if (result && result.length > 0) {


        //            console.log('callback_users_getInfo result:', result);


        var friends = mApp.shuffle(result);

        $.each(result, function (indx, friend) {

            //  remove stub_128x96.gif

            if (friend.gender != "male" && !/(stub_)/.test(friend.pic_1)) {
                if (/(stub_)/.test(friend.pic_1)) {
                    friend.pic_1 = "/i/user-empty.png";
                }
                if (/(stub_)/.test(friend.pic_3)) {
                    friend.pic_3 = "/i/user-empty.png";
                }
                if (/(stub_)/.test(friend.pic128x128)) {
                    friend.pic128x128 = "/i/user-empty.png";
                }
                females.push(friend);
            }
        });
        //            console.log('females:', females);


    } else {
        console.log('callback_users_getInfo', error);
    }


    bootAng(females);

};


var bootAng = function (females) {

    // собрали друзей и только потом!
    //        angular.element(document).ready(function() {

    //        });


    var elem = angular.element(document.body);
    var injector = elem.injector();
    var $rootScope = injector.get('$rootScope');
    $rootScope.safeApply(function () {
        $rootScope.user = mApp.user;
        $rootScope.get = decodeURIComponent($.param(mApp.get));

        if (females.length > 0) $rootScope.females = females;

    });
};
*/
