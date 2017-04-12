rootApp.controller("r", [
    '$rootScope',
    '$scope',
    '$window',
    '$timeout',
    'Test',
    'preloader',
    'Rb',
    function (
     $rootScope,
     $scope,
     $window,
     $timeout,
      Test,
      preloader,
      Rb
    ) {

    $scope.Rb = Rb;

    $scope.$on('$viewContentLoaded', function(){

    });

    $scope.$on("$destroy", function() {

    });

    $scope.testEnded      = !false;
    $scope.resultData     = $rootScope.resultData;

    console.log('RESULT $scope.resultData:', $scope.resultData);



    $scope.submitting = false;
    $scope.mediatopicPost = function()
    {

        $scope.submitting = true;
//        var facePromise = submitFace({'type':$scope.v,'face':$scope.face});
//        facePromise.then(function (share_image_with_face) { // resolve alert('Success!');

                    $scope.submitting = false;

                    var media = {
                        "media":[
                            {
                                "type": "text",
                                "text": $scope.resultData.title
                            },
                            {
                                "type": "app",
                                "text": " ",
                                "images": [
                                    {
                                        "url": 'https://family-promo.vtrvl.ru/'+$scope.resultData.share_img,
                                        "mark": '_____MARK_____',
                                        "title": " "
                                    }
                                ],
                                "actions":[
                                    {
                                        "mark": '_____MARK_____',
                                        "text": " "
                                    }
                                ]
                            }
                        ]
                    };
                    FAPI.UI.postMediatopic(media, false);

//                }, function () { // reject alert('Failed!');
//                    alert('Что то пошло не так. Попробуйте отправить еще раз.');
//                    $scope.submitting = false;
//                });

    }



}]);
