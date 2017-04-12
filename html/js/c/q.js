rootApp.controller("q", [
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


    if ($rootScope.testImages !== true) {

        $scope.testImages = [
            "/i/res-1.jpg",
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


    $scope.$on('$viewContentLoaded', function(){

        $timeout(function() {
            $scope.questions = Test.getQuestions();
        }, 400);

        $rootScope.isTest = true;
    });

    $scope.$on("$destroy", function() {
        $rootScope.isTest = !true;
    });



		$scope.testEnded      = false;
		$scope.imgChosen      = false;
		$scope.results        = Test.getResults();
        $scope.total          = Test.getQuestionsLength();
		$scope.count          = 0;
        $scope.hideSoci       = true;
        $scope.newScores      = [{key:1,count:0},{key:2,count:0},{key:3,count:0},{key:4,count:0},{key:5,count:0}];

		$scope.next           = _next;
		$scope.checkScore     = _checkScore;
		$scope.onceMore       = _onceMore;
		$scope.chooseImage    = _chooseImage;
		$scope.showSoci       = _showSoci;

		$scope.scores         = 0;
		$rootScope.resultData     = null;

		$scope.user = {
			selectedAnswer: null
		};

        $analytics.pageTrack('/apl/test/'+($scope.count+1), {title: 'Вопрос '+($scope.count+1)});

        $scope.visuals = Test.getVisuals();

        function _showSoci(){
//            $scope.hideSoci = !$scope.hideSoci;
        }

        function _chooseImage(){
//            $scope.imgChosen = !$scope.imgChosen;
//            // дернем событие для директивы пересчета маркеров
//            $timeout(function() {
//                angular.element($window).resize();
//            }, 1);
        }


		function _next(score) {
            $timeout(function() {
                console.log('_next:', score);
                $scope.newScores[(score-1)]['count'] += 1;

                if ($scope.count < ($scope.total - 1) && score != undefined) {
                    $scope.scores += parseInt(score);
                    $scope.count++;
                    $scope.user.selectedAnswer = null;
                    Rb.forceRbPixel('Вопрос_'+($scope.count+1));
//                    $rootScope.$analyticsProvider = $analyticsProvider;
//                    $analyticsProvider.registerPageTrack(function ('/apl/test/'+($scope.count+1), 'Вопрос '+($scope.count+1)) {
                        // your implementation here
//                    }
                    $analytics.pageTrack('/apl/test/'+($scope.count+1), {title: 'Вопрос '+($scope.count+1)});
                } else {
                    $scope.checkScore(score);
                }
            }, 0);

		}

		function _checkScore(score) {

                console.log('_checkScore:', score);
			if (score != undefined) {

                var o = shuffle($scope.newScores)
                var max = o.reduce(function(prev, current) {
                    return (prev.count > current.count) ? prev : current
                })

				$scope.scores += parseInt(score);

				$scope.testEnded = true;

                $scope.results.forEach(function(item, index) {
					if (max.key == item.key) {
						$rootScope.resultData = item;
                        console.log('$rootScope.resultData:', $rootScope.resultData);
                        Rb.forceRbPixel(item.title+'_тест');
                        $analytics.pageTrack('/apl/result/'+item.key, {title: 'Результат '+item.title});
//                        Test.put(item.key);
                        $rootScope.$state.go('result',{},{reload: true, location:false});
					}
				});

			}
		}

         var randomProperty = function (obj) {
            var keys = Object.keys(obj)
            return obj[keys[ keys.length * Math.random() << 0]];
        };

        function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };


		function _onceMore() {
			$scope.scores = 0;
			$scope.count = 0;
			$scope.testEnded = false;
		}




}]);

// {{ timer | pluralFilter:'секунда':'секунды':'секунд' }}
rootApp.filter('pluralFilter', [function() {
        return function(number, one, two, five) {
            number = Math.abs(number);
            number %= 100;
            if (number >= 5 && number <= 20) {
                return five;
            }
            number %= 10;
            if (number == 1) {
                return one;
            }
            if (number >= 2 && number <= 4) {
                return two;
            }
            return five;
        }
    }]);


rootApp.filter('leadingZeroTen', [function () {
    return function (input) {
        var zero = '';
        if (input < 10) {
            zero = '0';
        }
        return zero + input;
    }
}]);
