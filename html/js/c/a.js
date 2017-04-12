rootApp.controller("a", [
    '$rootScope',
    '$scope',
    '$window',
    '$timeout',
    'Test',
    'preloader',
    'Rb',
    '$analytics',
    function (
     $rootScope,
     $scope,
     $window,
     $timeout,
      Test,
      preloader,
      Rb,
      $analytics
    ) {

         $scope.Rb = Rb;

     if ($rootScope.testImages !== true) {

        $scope.testImages = [
            "/i/res-2.jpg",
            "/i/res-3.jpg",
            "/i/res-4.jpg",
            "/i/res-5.jpg",
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

    $scope.bool = false;

    $scope.articles = [];

    $scope.$on('$viewContentLoaded', function(){
        console.log('A:');
        $timeout(function () {
            $scope.articles = Test.getResults();

            if (!$rootScope.resultData) {
                $scope.initialSlide = parseInt(0);
                $analytics.pageTrack('/apl/articles/' + $scope.initialSlide, {title: 'Стиль ' + $scope.articles[$scope.initialSlide].title});
                Rb.forceRbPixel($scope.articles[$scope.initialSlide].title + '_стили');
            } else {
                $scope.initialSlide = parseInt($rootScope.resultData.key) - 1;
            }

        }, 100);
        $rootScope.isArticles = true;
    });


    $scope.$on("$destroy", function() {
        $scope.secondSwiper.destroy(!0,!0);
        $rootScope.isArticles = !true;
    });


    $scope.onTransition = function (swiper) {
        var rbpixel = $(swiper.container).find('.swiper-slide-active .result').attr('rel');
        Rb.forceRbPixel(rbpixel);
        console.log('onTransition:', (swiper.activeIndex+1));
        $analytics.pageTrack('/apl/articles/'+(swiper.activeIndex+1), {title: 'Стиль ' + rbpixel.replace('_стили', '')});
    };

    $scope.firstSwiper = null;
    $scope.secondSwiper = null;
    $scope.swiperInited = false;
    $scope.onInit = function (swiper) {

       if (!$scope.swiperInited) {
           $scope.swiperInited = true;
//           swiper.destroy(true, true);
           $scope.firstSwiper = swiper;
       } else {
           $scope.secondSwiper = swiper;
           $scope.firstSwiper.destroy();
           $scope.secondSwiper.params.preventClicks = !true;
//           $scope.secondSwiper.params.slideToClickedSlide = true;
//           $scope.secondSwiper.params.initialSlide = ($scope.initialSlide);
//           console.log('typeof:', typeof $scope.initialSlide);
//           $scope.secondSwiper.slideTo(($scope.initialSlide-1),0,false);
           console.log('onInit:', $scope.secondSwiper.params);
       }
    };





}]);
