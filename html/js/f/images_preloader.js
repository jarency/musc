// https://github.com/dabit3/angular-easy-image-preloader/blob/master/preloader.js
angular.module('images_preloader',[])
.factory(
    "preloader",['$q', '$rootScope',
        function ($q, $rootScope) {
            function Preloader(imageLocations) {
                this.imageLocations = imageLocations;
                this.imageCount = this.imageLocations.length;
                this.errorCount = 0;
                this.states = {
                    PENDING: 1,
                    LOADING: 2,
                    RESOLVED: 3,
                    REJECTED: 4
                };

                this.sizes = [];

                this.state = this.states.PENDING;
                this.deferred = $q.defer();
                this.promise = this.deferred.promise;
            }


            Preloader.preloadImages = function (imageLocations) {
                var preloader = new Preloader(imageLocations);
                return (preloader.load());
            };


            Preloader.prototype = {

                constructor: Preloader,

                isInitiated: function isInitiated() {
                    return (this.state !== this.states.PENDING);
                },
                isRejected: function isRejected() {
                    return (this.state === this.states.REJECTED);
                },
                isResolved: function isResolved() {
                    return (this.state === this.states.RESOLVED);
                },
                load: function load() {
                    if (this.isInitiated()) {
                        return (this.promise);
                    }
                    this.state = this.states.LOADING;
                    for (var i = 0; i < this.imageCount; i++) {
                        this.loadImageLocation(this.imageLocations[i], i);
                    }
                    return (this.promise);
                },

                handleImageError: function handleImageError(imageLocation) {
                    this.errorCount++;
                    if (this.isRejected()) {
                        return;
                    }
                    this.state = this.states.REJECTED;
                    this.deferred.reject(imageLocation);
                },


                handleImageLoad: function handleImageLoad(percent) {
                    if (this.isRejected()) {
                        return;
                    }
                   this.deferred.notify(percent);
                },

                loadImageLocation: function loadImageLocation(imageLocation, i) {
                    var preloader = this;
                    // view-source:http://home.jejaju.com/play/preCache/
                    $.ajax({
                        url:imageLocation,
                        type: 'HEAD',
                        success:function(data,textStatus,jqXHR){
                            preloader.sizes[i]=[+jqXHR.getResponseHeader('Content-Length'),0]
                            $.ajax({
                                url:imageLocation,
                                type: 'GET',
                                cache:true,
                                xhr: function () {
                                    var xhr = $.ajaxSettings.xhr(); // new window.XMLHttpRequest();
                                    xhr.addEventListener("progress", function (evt) {
                                        if(evt.lengthComputable) {
                                            preloader.sizes[i]=[evt.total,evt.loaded]
                                            preloader.show(preloader.sizes)
                                        }
                                    }, false);
                                    return xhr;
                                },
                                success:function(data,textStatus,jqXHR){
                                //	console.log(textStatus)
                                },
                                error:function(jqXHR,textStatus,errorThrown){
                                    $rootScope.$apply(
                                        function () {
                                            preloader.handleImageError(imageLocation);
                                            preloader = null;
                                        }
                                    );
                                }
                            })
                        }
                    })


                },
                show: function (sizes){
                    var preloader = this;
                    var total=0,loaded=0
                    $.each(sizes,function(i,size){
                        if (size){
                            total+=size[0]
                            loaded+=size[1]
                        }
                    });
                    preloader.handleImageLoad( ((loaded/total)*100).toFixed(2) );

                    $rootScope.$apply(
                                        function () {
                                            preloader.handleImageLoad(((loaded/total)*100).toFixed(0));
                                        }
                                    );

//                    console.log('loaded/total:', loaded/total);
//                    console.log('total:', total);
//                    console.log('loaded:', loaded);
//                    console.log('toFixed:', ((loaded/total)*100).toFixed());

                    if (loaded==total) {
                        $rootScope.$apply(
                                        function () {
                                            preloader.state = preloader.states.RESOLVED;
                                            preloader.deferred.resolve(preloader.imageLocations);
                                        }
                                    );
                    }
                }
            };




            // Return the factory instance.
            return (Preloader);
        }
    ]
);
