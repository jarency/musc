rootApp.factory('Rb', ['$timeout',function($timeout) {




    // DG GD
    var toLatin = function (str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        str = str.replace(/_+/g, '-');
        str = str.replace(/"+/g, '');


        // remove accents, swap n for n, etc
        var from = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я", "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ы", "Ь", "Э", "Ю", "Я", "_", ",", ":", ";", '"', "'", "«", "»"];

        var to   = ["a", "b", "v", "g", "d", "e", "e", "zh", "z", "i", "y", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "h", "c", "ch", "sh", "sch", "", "y", "", "e", "yu", "ya", "a", "b", "v", "g", "d", "e", "e", "zh", "z", "i", "y", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "h", "c", "ch", "sh", "sch", "", "y", "", "e", "yu", "ya", "-", "-", "-", "-", "", "", "", "" ];

        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from[i], 'g'), to[i]);
        }

        return str;
    }

/*

"Главная страница": "//rs.mail.ru/d25737901.gif",
"Главная кнопка уют ": "//rs.mail.ru/d25737904.gif",
"Главная кнопка стили": "//rs.mail.ru/d25737907.gif",
"Главная пройти тест": "//rs.mail.ru/d25737909.gif",
"Вопрос 1": "//rs.mail.ru/d25737912.gif",
"Вопрос 2": "//rs.mail.ru/d25737915.gif",
"Вопрос 3": "//rs.mail.ru/d25737916.gif",
"Вопрос 4": "//rs.mail.ru/d25737918.gif",
"Вопрос 5": "//rs.mail.ru/d25737924.gif",
"Вопрос 6": "//rs.mail.ru/d25737926.gif",
"Вопрос 7": "//rs.mail.ru/d25737931.gif",
"Минимализм тест": "//rs.mail.ru/d25737944.gif",
"Футуризм тест": "//rs.mail.ru/d25737946.gif",
"Ар-деко тест": "//rs.mail.ru/d25737947.gif",
"Прованс  тест": "//rs.mail.ru/d25737947.gif",
"Классический тест ": "//rs.mail.ru/d25737953.gif",
"Поделиться ": "//rs.mail.ru/d25737956.gif",
"Кнопка правила интерьера": "//rs.mail.ru/d25737957.gif",
"Стили минимализм": "//rs.mail.ru/d25737961.gif",
"Стили футуризм": "//rs.mail.ru/d25737963.gif",
"Стили ар-деко": "//rs.mail.ru/d25737966.gif",
"Стили прованс": "//rs.mail.ru/d25737967.gif",
"Стили классический ": "//rs.mail.ru/d25737969.gif",

Вопрос 1
<img src="//rs.mail.ru/d25737913.gif" style="width:0;height:0;position:absolute;visibility:hidden;" alt="" />

Лого
<img src="//rs.mail.ru/d25737912.gif" style="width:0;height:0;position:absolute;visibility:hidden;" alt="" />

Ар-деко в тесте
<img src="//rs.mail.ru/d25737947.gif" style="width:0;height:0;position:absolute;visibility:hidden;" alt="" />

Прованс в тесте
<img src="//rs.mail.ru/d25737948.gif" style="width:0;height:0;position:absolute;visibility:hidden;" alt="" />


 */
    var pixels = {
        "Главная_страница":"//rs.mail.ru/d25737901.gif",//
        "Главная_кнопка_уют":"//rs.mail.ru/d25737904.gif",//
        "Главная_кнопка_стили":"//rs.mail.ru/d25737907.gif",//
        "Главная_пройти_тест":"//rs.mail.ru/d25737909.gif",//
        "Вопрос_1":"//rs.mail.ru/d25737913.gif",//
        "Вопрос_2":"//rs.mail.ru/d25737915.gif",//
        "Вопрос_3":"//rs.mail.ru/d25737916.gif",//
        "Вопрос_4":"//rs.mail.ru/d25737918.gif",//
        "Вопрос_5":"//rs.mail.ru/d25737924.gif",//
        "Вопрос_6":"//rs.mail.ru/d25737926.gif",//
        "Вопрос_7":"//rs.mail.ru/d25737931.gif",//
        "Минимализм_тест":"//rs.mail.ru/d25737944.gif",//
        "Футуризм_тест":"//rs.mail.ru/d25737946.gif",//
        "Ар-деко_тест":"//rs.mail.ru/d25737947.gif",//
        "Прованс_тест":"//rs.mail.ru/d25737948.gif",//
        "Классический стиль_тест":"//rs.mail.ru/d25737953.gif",//
        "Поделиться":"//rs.mail.ru/d25737956.gif",//
        "Кнопка_правила_интерьера":"//rs.mail.ru/d25737957.gif",//
        "Минимализм_стили":"//rs.mail.ru/d25737961.gif",//
        "Футуризм_стили":"//rs.mail.ru/d25737963.gif",//
        "Ар-деко_стили":"//rs.mail.ru/d25737966.gif",//
        "Прованс_стили":"//rs.mail.ru/d25737967.gif",//
        "Классический стиль_стили":"//rs.mail.ru/d25737969.gif",//
    };

    return {
        forceRbPixel: function(_rb_pixel) {
            console.log('forceRbPixel', _rb_pixel);
            if (typeof pixels[_rb_pixel] == 'undefined') return;
            var e = new Image;

            $timeout(function() {
                e.src = pixels[_rb_pixel]+'?'+ Math.random() + '___' + toLatin(_rb_pixel);
            }, 500);

            return;
        }
    }
}]);
