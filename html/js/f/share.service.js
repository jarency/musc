
rootApp.factory("Share", ['$rootScope', function ($rootScope) {


    var params = {
        width: 600,
        height: 500
    }

    var openPopup = function(params) {
			var left = Math.round(screen.width/2 - params.width/2);
			var top = 0;
			if (screen.height > params.height) {
				top = Math.round(screen.height/3 - params.height/2);
			}

			var win = window.open(params.url, 'sl_' + params.service, 'left=' + left + ',top=' + top + ',' +
			   'width=' + params.width + ',height=' + params.height + ',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
			if (win) {
				win.focus();
			}
			else {
				location.href = params.url;
			}
		}

    var prepareUrl = function(url){
        return url.replace(/([^:]\/)\/+/g, "$1");
    }

    return {

        buttons: function (){
            var services = ['vk','fb','ok','mail'];
            return services;
        },

        fb: function (url) {
            params.service = 'fb';
            params.url = 'https://www.facebook.com/sharer/sharer.php?u='+prepareUrl(url);
            return openPopup(params);
        },
        vk: function (url) {
            params.service = 'vk';
            params.url = 'https://vk.com/share.php?url='+prepareUrl(url);
            return openPopup(params);
        },
        ok: function (url) {
            params.service = 'ok';
            params.url = 'https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl='+prepareUrl(url);
            return openPopup(params);
        },
        mail: function (url) {
            params.service = 'ok';
            params.url = 'https://connect.mail.ru/share?share_url='+prepareUrl(url);
            return openPopup(params);
        }
    }


}]);
