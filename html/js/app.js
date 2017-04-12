var rootApp = angular.module('rootApp', [


    'rootApp',
      'ct.ui.router.extras'
    , 'ui.router'
    , 'ui.swiper'
    , 'ngSanitize'
    , 'ngAnimate'
    , 'images_preloader'

    , 'angulartics'
    , 'angulartics.google.analytics'


]);







rootApp.run([
    '$state',
    '$rootScope',
    '$urlRouter',
    '$animate',
    '$timeout',
    '$window',
    '$location',
    '$q',
    'preloader',
    'Share',
    'Rb',
    function(
     $state,
     $rootScope,
     $urlRouter,
     $animate,
     $timeout,
     $window,
     $location,
     $q,
      preloader,
      Share,
      Rb
     ) {



    $rootScope.Rb = Rb;

    $rootScope.overlay_innerHTML = '0%';

    $rootScope.firstImages = [
        "/i/_main-back.jpg",
        "/i/cosiness.png",
        "/i/ribbon.png",
        "/i/_lev2-back.jpg",
        "/i/1-1.jpg",
        "/i/1-2.jpg",
        "/i/1-3.jpg",
        "/i/1-4.jpg",
        "/i/1-5.jpg",
        "/i/2-1.jpg",
        "/i/2-2.jpg",
        "/i/2-3.jpg",
        "/i/2-4.jpg",
        "/i/2-5.jpg",
        "/i/res-1.jpg",
    ];

    var overlay = angular.element(document).find('#overlay');

    preloader.preloadImages($rootScope.firstImages).then(
        function handleResolve(images) {
            // ACTIVATE STYLE VIEW
//            $rootScope.$state.go('style',{},{reload:true, location:true});
            $rootScope.$state.go('home',{},{reload: true, location:false});
            $timeout(function() {
                overlay.addClass('fade_hide');
                // запускаем событие вниз
                $rootScope.$broadcast('styleAppear', {
                    someProp: 'Sending you an Object!' // посылайте что хотите
                });

                $timeout(function() {
//                    overlay.remove();
                    overlay.find('.loader').remove();
                }, 800);
            }, 500);
        },
        function handleReject(imageLocation) {
            // Loading failed on at least one image.
        },
        function handleNotify(percent) {
            $rootScope.overlay_innerHTML = percent + '%';
        }
    );








    $rootScope.___SHARE___URL___ = $window.___SHARE___URL___;

    $rootScope.share = Share;



    $rootScope.location = $location;
    $rootScope.$state = $state;
//    $rootScope.history = [];
    $rootScope.goBack = function () {
        $window.history.back();
//        var prevUrl = $rootScope.history.length > 1 ? $rootScope.history.splice(-1)[0] : "main";
//        console.log('$rootScope.history:', $rootScope.history);
//        console.log('prevUrl:', prevUrl);
//        $rootScope.$state.go(prevUrl);
    };





    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){


        // разрулим ошибку с виьшкой фазера при повторном клике на нее
//        if (toState.name == 'gallery.construct_1' && toState.status == 'active')
        /*
        if (toState.status == 'active')
        {
//            return;
            $rootScope.$state.transitionTo($state.current, {}, {
              reload: false, inherit: false, notify: false
            });
        }
        */

//        $rootScope.history.push(fromState.name);

//        console.log('fromState:', fromState);
//        console.log('toState:', toState);



        if (toState.data && toState.data.pageTitle) $window.document.title = toState.data.pageTitle;


    });







    $animate.enabled(true);


    $rootScope.safeApply = function (fn) {
        var phase = this.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            try {
                fn();
            } catch (exception) {
                console.log('safeApply exception:', exception);
            } finally {
                $digest();
            }
        } else {
            this.$apply(fn);
        }
    };





    $rootScope.decor = function(){
        if(document.getElementsByClassName("main").length)
        {
            console.log('WAS MAIN:', document.getElementsByClassName("main").length);
//            angular.element(document).find('body').removeClass('main');
//            angular.element(document).find('body').removeClass('_in');
//            angular.element(document).find('body').addClass('_out');
//
//            $timeout(function() {
//                angular.element(document).find('body').addClass('_in');
//            }, 50);
        }
    }





    $rootScope.LoopRange = function( min, max, start ){

		$min = min;
		$max = max;
		_current = parseInt(start) || parseInt(min);

		this.next=function()
		{
			_current = (_current+1) <= $max? (_current+1) : $min;
			return _current;
		};

		this.previous=function()
		{
			_current = (_current-1)>= $min? (_current-1) : $max;
			return _current;
		};

		this.setCurrent=function( value )
		{
            value = parseInt(value);
			if( value>= $min && value <= $max ) _current = value;
		};

		this.getCurrent=function ()
		{
			return _current;
		};

		this.getNext=function ()
		{
			return (_current+1) <= $max? (_current+1) : $min;
		};
		this.getPrevious=function ()
		{
			return (_current-1)>= $min? (_current-1) : $max;
		};
	};



}]);












































rootApp.config([
        '$httpProvider',
        '$provide',
        '$stickyStateProvider',
        '$urlRouterProvider',
        '$stateProvider',
        '$locationProvider',
    function (
        $httpProvider,
        $provide,
        $stickyStateProvider,
        $urlRouterProvider,
        $stateProvider,
        $locationProvider
    ) {



    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });



// вернем заголовок что это аджакс запросы
//    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//    $httpProvider.defaults.useXDomain = true;
//    delete $httpProvider.defaults.headers.common['X-Requested-With'];

// Angularjs $http POST request empty array
// http://stackoverflow.com/questions/19213903/angularjs-http-post-request-empty-array#answer-24804792
//    $httpProvider.defaults.transformRequest = function(data) {
//        if (data === undefined) { return data; }
//        return $.param(data);
//    };
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';


    var promiseOk = {
                initOKuser: ['$q', '$rootScope', 'User', 'Rb', function($q, $rootScope, User, Rb) {

                    Rb.forceRbPixel('Главная_страница');

                    $('.header_brands').addClass('hide');

                    var defer = $q.defer();

                    if (!$rootScope.inited) {
                        $rootScope.requestParameters = FAPI.Util.getRequestParameters();
                        try{
                            FAPI.init($rootScope.requestParameters["api_server"], $rootScope.requestParameters["apiconnection"],
                                function() {
                                        $rootScope.inited = true;
                                        FAPI.UI.setWindowSize(0, 735);
                                        FAPI.Client.call({
                                            "fields": "first_name,last_name,location,pic640x480,gender",
                                            "method": "users.getCurrentUser"
                                        }, function (method, data, error) {
                                                defer.resolve(data);
                                        });
                                },
                                function(error) {
                                    console.log( 'FAPI bad init ', error);
                                }
                            );
                        }
                        catch(e){
                             console.log('FAPI bad catch ', e);
                        }
                    } else {
                        defer.resolve(User.getUserOk());
                    }
                    return defer.promise;
                }]
            };









    $stateProvider
            .state('loader', {
                url: '/apl/',
//                sticky: true,
                data : { pageTitle: 'Идет загрузка...' },
                views: {
                    '': {
                        template: ''
                    }
                }
            })

    $stateProvider
            .state('home', {
                url: '/apl/home',
//                sticky: true,
                data : { pageTitle: 'Главная' },
                views: {
                    '': {
                        controller: 'home',
                        templateUrl: 'home.html',
//                                templateUrl: function (stateParams){
//                                                window.document.title = 'Тест, вопрос '+stateParams._q ;
//                                                return 'question'+stateParams._q+'.html';
//                                            },
                        resolve: promiseOk
                    }
                }
            })

            .state('test', {
                    url: '/apl/test',
                    data : { pageTitle: 'Тест какой ваш уют' },
                    views: {
                                '': {
                                    templateUrl: 'test.html',
                                    controller: 'q',
                                    resolve:{
                                        forceRbPixel:  ['Rb', function(Rb){
                                            return Rb.forceRbPixel('Вопрос_1');
//                                            Rb.forceRbPixel('Главная_пройти_тест');
                                         }]
                                    }
                                }
                    }
                })

            .state('result', {
                    url: '/apl/result',
                    data : { pageTitle: 'Результат теста' },
                    views: {
                                '': {
                                    templateUrl: 'result.html',
                                    controller: 'r'
                                }
                    }
                })

            .state('articles', {
                    url: '/apl/articles',
                    data : { pageTitle: 'Уютные стили' },
                    views: {
                                '': {
                                    templateUrl: 'articles.html',
                                    controller: 'a',
//                                    resolve:{
//                                        forceRbPixel:  ['Rb', function(Rb){
//                                            return Rb.forceRbPixel('Минимализм_стили');
//                                         }]
//                                    }
                                }
                    }
                })

    ;

    $urlRouterProvider.otherwise("/");





}]);

