var surah = {
    names: ['الفاتحة ', 'البقرة ', 'آل عمران ', 'النساء ', 'المائدة ', 'الأنعام ', 'الأعراف ', 'الأنفال ', 'التوبة ', 'يونس ', 'هود ', 'يوسف ', 'الرعد ', 'ابراهيم ', 'الحجر ', 'النحل ', 'الإسراء ', 'الكهف ', 'مريم ', 'طه ', 'الأنبياء ', 'الحج ', 'المؤمنون ', 'النور ', 'الفرقان ', 'الشعراء ', 'النمل ', 'القصص ', 'العنكبوت ', 'الروم ', 'لقمان ', 'السجدة ', 'الأحزاب ', 'سبإ ', 'فاطر ', 'يس ', 'الصافات ', 'ص ', 'الزمر ', 'غافر ', 'فصلت ', 'الشورى ', 'الزخرف ', 'الدخان ', 'الجاثية ', 'الأحقاف ', 'محمد ', 'الفتح ', 'الحجرات ', 'ق ', 'الذاريات ', 'الطور ', 'النجم ', 'القمر ', 'الرحمن ', 'الواقعة ', 'الحديد ', 'المجادلة ', 'الحشر ', 'الممتحنة ', 'الصف ', 'الجمعة ', 'المنافقون ', 'التغابن ', 'الطلاق ', 'التحريم ', 'الملك ', 'القلم ', 'الحاقة ', 'المعارج ', 'نوح ', 'الجن ', 'المزمل ', 'المدثر ', 'القيامة ', 'الانسان ', 'المرسلات ', 'النبإ ', 'النازعات ', 'عبس ', 'التكوير ', 'الإنفطار ', 'المطففين ', 'الإنشقاق ', 'البروج ', 'الطارق ', 'الأعلى ', 'الغاشية ', 'الفجر ', 'البلد ', 'الشمس ', 'الليل ', 'الضحى ', 'الشرح ', 'التين ', 'العلق ', 'القدر ', 'البينة ', 'الزلزلة ', 'العاديات ', 'القارعة ', 'التكاثر ', 'العصر ', 'الهمزة ', 'الفيل ', 'قريش ', 'الماعون ', 'الكوثر ', 'الكافرون ', 'النصر ', 'المسد ', 'الإخلاص ', 'الفلق ', 'الناس '],
    ayah_count: [7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6]
};
var selected_surah_num, bot_read, interval, begin_interval, is_first;
var end_sensitive = 30;
var self_recite_ended = 0;
var begin_interval_i = 0;
var bot_delay = 5;
var player = document.getElementById('player');
var surah_menu = $('#surah_menu');
var ayah_from = $('#ayah-from');
var ayah_to = $('#ayah-to');
var start_btn = $('#start');
var i = 0;
$(document).ready(function () {
    for (ii in surah.names) {
        surah_menu.append('<option>' + surah.names[ii] + '</option>');
        selected_surah_num = 1;
    }
    surah_menu.on('change', function () {
        ayah_from.val(1);
        ayah_from.attr('max', surah.ayah_count[this.selectedIndex]);
        ayah_to.val(surah.ayah_count[this.selectedIndex]);
        ayah_to.attr('max', surah.ayah_count[this.selectedIndex]);
        selected_surah_num = this.selectedIndex + 1;
        fix_from_to();
    });

    $('input[name=bot_read]').on('change', function () {
        ayah_from.removeAttr('disabled');
        ayah_to.removeAttr('disabled');
        start_btn.removeAttr('disabled');
        fix_from_to();
    });
    $('#play_rate').on('change', function () {
        player.defaultPlaybackRate = parseFloat(this.value) / 100;
    });
    $('#bot_delay').on('change', function () {
        bot_delay = parseInt(this.value);
    });
    $('#sensitive').on('change', function () {
        end_sensitive = parseInt(this.value);
    });
});

function start() {
    i = 0;
    start_btn.removeClass('btn-primary');
    start_btn.addClass('btn-danger');
    start_btn.text('توقف');
    start_btn.attr('onClick', 'stop( )');
    bot_read = $('input[name=bot_read]:checked').val();
    is_first = true;
    player.src = 'tartil/menshawi_16kbps/1/1.mp3';
    player.load();
    player.play();
}

function self_recite() {
    if (is_first === false) {
        begin_interval = setInterval(function () {
            if ((player.paused === true) && (micLevel > end_sensitive)) {
                begin_interval_i++;
                if (begin_interval_i > 5) {
                    clearInterval(begin_interval);
                    begin_interval_i = 0;
                    interval = setInterval(function () {
                        if ((player.paused === true) && (micLevel < end_sensitive)) {
                            self_recite_ended++;
                            if (self_recite_ended > bot_delay) {
                                i += 2;
                                next();
                                self_recite_ended = 0;
                                clearInterval(interval);
                            }
                        } else {
                            self_recite_ended = 0;
                        }
                    }, 200);
                }
            } else {
                begin_interval_i = 0;
            }
        }, 200);
    } else {
        is_first = false;
        if ((selected_surah_num === 1) && (parseInt(ayah_from.val()) !== 1)) {
            next();
        } else if ((selected_surah_num === 1) && (parseInt(ayah_from.val()) === 1)) {
            self_recite();
        } else {
            next();
        }
    }
}

function next() {
    if (i < (parseInt(ayah_to.val()) - 2)) {
        player.src = 'tartil/menshawi_16kbps/' + selected_surah_num + '/' + (parseInt(ayah_from.val()) + i) + ".mp3";
        player.load();
        player.play();
    } else {
        clearInterval(interval);
    }
}

function stop() {
    clearInterval(begin_interval);
    clearInterval(interval);
    player.pause();
    start_btn.removeClass('btn-danger');
    start_btn.addClass('btn-primary');
    start_btn.text('شروع');
    start_btn.attr('onClick', 'start( )');
}

function fix_from_to() {
    if ($('input[name=bot_read]:checked').val() === "zoj") {
        ayah_from.val(2);
        ayah_from.attr('min', 2);
        ayah_to.attr('min', 2);
    } else if ($('input[name=bot_read]:checked').val() === "fard") {
        ayah_from.val(1);
        ayah_from.attr('min', 1);
        ayah_to.attr('min', 1);
    }
}