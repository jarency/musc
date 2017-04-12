rootApp.controller("home", [
    '$rootScope',
    '$scope',
    '$timeout',
    'preloader',
    'initOKuser',
    'User',
    function (
     $rootScope,
     $scope,
     $timeout,
     preloader,
     initOKuser,
     User
    ) {

    User.setUserOk(initOKuser);




    $rootScope.user = User.getUserOk();

    if ($rootScope.user == null) {
        return window.location.href = __app_url;
    }


    if ($rootScope.testImages !== true) {

        $scope.testImages = [
            "/i/3-1.jpg",
            "/i/3-2.jpg",
            "/i/3-3.jpg",
            "/i/3-4.jpg",
            "/i/3-5.jpg",
            "/i/4-1.jpg",
            "/i/4-2.jpg",
            "/i/4-3.jpg",
            "/i/4-4.jpg",
            "/i/4-5.jpg",
            "/i/5-1.jpg",
            "/i/5-2.jpg",
            "/i/5-3.jpg",
            "/i/5-4.jpg",
            "/i/5-5.jpg",
            "/i/6-1.jpg",
            "/i/6-2.jpg",
            "/i/6-3.jpg",
            "/i/6-4.jpg",
            "/i/6-5.jpg",
            "/i/7-1.jpg",
            "/i/7-2.jpg",
            "/i/7-3.jpg",
            "/i/7-4.jpg",
            "/i/7-5.jpg",
        ];

        preloader.preloadImages($scope.testImages).then(
            function handleResolve(images) {
                $rootScope.testImages = true;
            },
            function handleReject(imageLocation) {
                // Loading failed on at least one image.
                console.log('Loading failed on at least one image:', imageLocation);
            },
            function handleNotify(percent) {
//                console.log('testImages:', percent);
            }
        );

    }


//    angular.element(document.getElementsByClassName("grey_female")).removeClass('quest');
    $scope.$on('$viewContentLoaded', function(){

        // https://makeomatic.ru/blog/2014/10/07/Angular_scope_rootScope/

        $scope.$on('styleAppear', function (event, data) {
            new TimelineMax().add([
                                    TweenMax.fromTo(".content h1", .25, {opacity:0, marginTop: "-10%"}, {opacity:1, marginTop: 0, delay:0.55}),
                                    TweenMax.fromTo(".cosiness", .25, {opacity:0, marginTop: "-10%"}, {opacity:1, marginTop: 0, delay:0.6}),
                                    TweenMax.fromTo(".ribbon", .5, {opacity:0, marginTop: "-5%"}, {opacity:1, marginTop: 0, delay:0.75}),
                                    TweenMax.fromTo(".content h2", .5, {opacity:0, marginTop: "-5%"}, {opacity:1, marginTop: 0,  delay:0.85}),
                                    TweenMax.fromTo(".brands .logo-muscle", 1.5, {opacity:0}, {opacity:1, delay:1.25}),
                                    TweenMax.fromTo(".brands .logo-pronto", 1.5, {opacity:0}, {opacity:1, delay:1.35}),
                                    TweenMax.fromTo(".brands .logo-utya", 1.5, {opacity:0}, {opacity:1, delay:1.45}),
                                ]);
        });
    });
    $scope.$on("$destroy", function() {
//        angular.element(document).find('body').removeClass('fontLoaded');
        $('.header_brands').removeClass('hide');

            new TimelineMax().add([
                                    TweenMax.fromTo(".header_brands .logo-muscle", 1.5, {opacity:0}, {opacity:1, delay:1.25}),
                                    TweenMax.fromTo(".header_brands .logo-pronto", 1.5, {opacity:0}, {opacity:1, delay:1.35}),
                                    TweenMax.fromTo(".header_brands .logo-utya", 1.5, {opacity:0}, {opacity:1, delay:1.45}),
                                ]);


    });


//    FAPI.UI.setWindowSize(0, 655);

    $timeout(function() {
//        angular.element(document.querySelector('#overlay')).addClass('fade_hide');
//
//        $timeout(function() {
//            angular.element(document.querySelector('#overlay')).addClass('hide');
//        }, 750);

//        if ($rootScope.user.gender=='male') $rootScope.$state.go('male');
    }, 50);

}]);
