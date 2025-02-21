$(document).ready(function() {

    $('.landoven-welcome-link a').click(function(e) {
        var curOffset = 0;
        if ($('header').length == 1) {
            curOffset = $('header').outerHeight();
        }
        $('html, body').animate({'scrollTop': $('.landoven-select-logo').offset().top - curOffset});
        e.preventDefault();
    });

    $('.landoven-functions-slider').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0],
            },
            pagination: {
                el: curSlider.find('.swiper-pagination')[0],
                clickable: true
            }
        });
    });

    $('.landoven-techs-item-icon').click(function() {
        var curItem = $(this).parent();
        $('.landoven-techs-item.open').removeClass('open');
        curItem.addClass('open');
    });

    $('.landoven-techs-item-icon').eq(0).trigger('click');

    $('.landoven-select-filter-group-section-title a').click(function(e) {
        $(this).parent().parent().toggleClass('open');
        $('.landoven-select-container').css({'min-height': 0});
        var curMax = $('.landoven-select-container').outerHeight();
        var heightLeft = $('.landoven-select-filter-left').outerHeight();
        if (heightLeft > curMax) {
            curMax = heightLeft;
        }
        var heightRight = $('.landoven-select-filter-right').outerHeight();
        if (heightRight > curMax) {
            curMax = heightRight;
        }
        $('.landoven-select-container').css({'min-height': curMax});
        e.preventDefault();
    });

    $('.landoven-select-slider-views-item-value').attr('autocomplete', 'off');
    $('.landoven-select-slider-views-item-value').keydown(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });
    $('.landoven-select-slider-views-item-value').keypress(function(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 43 || charCode > 57)) {
            return false;
        }
        return true;
    });

    $('.landoven-select-filter-slider .landoven-select-slider').each(function() {
        var curSlider = $(this);
        var curRange = curSlider.find('.landoven-select-slider-range-inner')[0];
        var curStartFrom = Number(curSlider.find('.landoven-select-slider-min').html());
        if (Number(curSlider.find('.landoven-select-slider-from').val()) !== 0) {
            curStartFrom = Number(curSlider.find('.landoven-select-slider-from').val());
        }
        var curStartTo = Number(curSlider.find('.landoven-select-slider-max').html());
        if (Number(curSlider.find('.landoven-select-slider-to').val()) !== 0) {
            curStartTo = Number(curSlider.find('.landoven-select-slider-to').val());
        }
        noUiSlider.create(curRange, {
            start: [curStartFrom, curStartTo],
            connect: true,
            range: {
                'min': Number(curSlider.find('.landoven-select-slider-min').html()),
                'max': Number(curSlider.find('.landoven-select-slider-max').html())
            },
            step: Number(curSlider.find('.landoven-select-slider-step').html()),
            format: wNumb({
                decimals: 0
            })
        });
        curRange.noUiSlider.on('update', function(values, handle) {
            if (handle == 0) {
                curSlider.find('.landoven-select-slider-from').val(values[handle]);
                curSlider.find('.landoven-select-slider-from-views').val(values[handle]);
            } else {
                curSlider.find('.landoven-select-slider-to').val(values[handle]);
                curSlider.find('.landoven-select-slider-to-views').val(values[handle]);
            }
        });
        curRange.noUiSlider.on('end', function(values, handle) {
            landovenUpdateConfig();
        });

        curSlider.find('.landoven-select-slider-from-views').on('change', function() {
            var curInput = $(this);
            var curValue = Number(curInput.val());
            if (!curValue || (curValue < Number(curSlider.find('.landoven-select-slider-min').html()))) {
                curValue = Number(curSlider.find('.landoven-select-slider-min').html());
            }
            if (curValue > Number(curSlider.find('.landoven-select-slider-to-views').val())) {
                curValue = Number(curSlider.find('.landoven-select-slider-to-views').val());
            }
            curInput.val(curValue);
            curRange.noUiSlider.set([Number(curSlider.find('.landoven-select-slider-from-views').val()), Number(curSlider.find('.landoven-select-slider-to-views').val())], true, true);
            landovenUpdateConfig();
        });

        curSlider.find('.landoven-select-slider-to-views').on('change', function() {
            var curInput = $(this);
            var curValue = Number(curInput.val());
            if (!curValue || (curValue > Number(curSlider.find('.landoven-select-slider-max').html()))) {
                curValue = Number(curSlider.find('.landoven-select-slider-max').html());
            }
            if (curValue < Number(curSlider.find('.landoven-select-slider-from-views').val())) {
                curValue = Number(curSlider.find('.landoven-select-slider-from-views').val());
            }
            curInput.val(curValue);
            curRange.noUiSlider.set([Number(curSlider.find('.landoven-select-slider-from-views').val()), Number(curSlider.find('.landoven-select-slider-to-views').val())], true, true);
            landovenUpdateConfig();
        });
    });

    $('.landoven-select-filter-block-checkboxes input').change(function() {
        landovenUpdateConfig();
    });

    var landovenConfigListSwiper = null;

    function landovenUpdateConfig() {
        $('.landoven-select-results .swiper').each(function() {
            var curSlider = $(this);
            if (curSlider.hasClass('swiper-initialized')) {
                landovenConfigListSwiper.destroy();
            }

            var configTelescopic = [];
            $('.landoven-select-filter-block-checkboxes-telescopic input:checked').each(function() {
                configTelescopic.push($(this).val());
            });
            var configDoor = [];
            $('.landoven-select-filter-block-checkboxes-door input:checked').each(function() {
                configDoor.push($(this).val());
            });
            var configGlass = [Number($('.landoven-select-slider-from-glass').val()), Number($('.landoven-select-slider-to-glass').val())];
            var configProgram = [Number($('.landoven-select-slider-from-program').val()), Number($('.landoven-select-slider-to-program').val())];
            var configCtrl = [];
            $('.landoven-select-filter-block-checkboxes-ctrl input:checked').each(function() {
                configCtrl.push($(this).val());
            });
            var configPyrolytic = [];
            $('.landoven-select-filter-block-checkboxes-pyrolytic input:checked').each(function() {
                configPyrolytic.push($(this).val());
            });
            var configCatalytic = [];
            $('.landoven-select-filter-block-checkboxes-catalytic input:checked').each(function() {
                configCatalytic.push($(this).val());
            });
            var configFlexicrisp = [];
            $('.landoven-select-filter-block-checkboxes-flexicrisp input:checked').each(function() {
                configFlexicrisp.push($(this).val());
            });
            var configSteam = [];
            $('.landoven-select-filter-block-checkboxes-steam input:checked').each(function() {
                configSteam.push($(this).val());
            });
            var configBoost = [];
            $('.landoven-select-filter-block-checkboxes-boost input:checked').each(function() {
                configBoost.push($(this).val());
            });
            var configPizza = [];
            $('.landoven-select-filter-block-checkboxes-pizza input:checked').each(function() {
                configPizza.push($(this).val());
            });
            var configBread = [];
            $('.landoven-select-filter-block-checkboxes-bread input:checked').each(function() {
                configBread.push($(this).val());
            });
            var configAerochef = [];
            $('.landoven-select-filter-block-checkboxes-aerochef input:checked').each(function() {
                configAerochef.push($(this).val());
            });
            var configAirfry = [];
            $('.landoven-select-filter-block-checkboxes-airfry input:checked').each(function() {
                configAirfry.push($(this).val());
            });

            var newHTML = '';
            for (var i = 0; i < landovenSelectData.length; i++) {
                var curItem = landovenSelectData[i];
                if (
                    (configTelescopic.length == 0 || configTelescopic.indexOf(curItem.telescopic) != -1) &&
                    (configDoor.length == 0 || configDoor.indexOf(curItem.door) != -1) &&
                    ((configGlass[0] <= Number(curItem.glass)) && (Number(curItem.glass) <= configGlass[1])) &&
                    ((configProgram[0] <= Number(curItem.program)) && (Number(curItem.program) <= configProgram[1])) &&
                    (configCtrl.length == 0 || configCtrl.indexOf(curItem.ctrl) != -1) &&
                    (configPyrolytic.length == 0 || configPyrolytic.indexOf(curItem.pyrolytic) != -1) &&
                    (configCatalytic.length == 0 || configCatalytic.indexOf(curItem.catalytic) != -1) &&
                    (configFlexicrisp.length == 0 || configFlexicrisp.indexOf(curItem.flexicrisp) != -1) &&
                    (configSteam.length == 0 || configSteam.indexOf(curItem.steam) != -1) &&
                    (configBoost.length == 0 || configBoost.indexOf(curItem.boost) != -1) &&
                    (configPizza.length == 0 || configPizza.indexOf(curItem.pizza) != -1) &&
                    (configBread.length == 0 || configBread.indexOf(curItem.bread) != -1) &&
                    (configAerochef.length == 0 || configAerochef.indexOf(curItem.aerochef) != -1) &&
                    (configAirfry.length == 0 || configAirfry.indexOf(curItem.airfry) != -1)
                    ) {
                        newHTML +=  '<div class="swiper-slide">' +
                                        '<a href="' + curItem.url + '" class="landoven-select-results-item" target="_blank">' +
                                            '<div class="landoven-select-results-item-photo"><img src="' + curItem.preview + '" alt="' + curItem.title + '"></div>' +
                                            '<div class="landoven-select-results-item-photo-mobile"><img src="' + curItem.mobile + '" alt="' + curItem.title + '"></div>' +
                                            '<div class="landoven-select-results-item-ctrl">' +
                                                '<div class="landoven-select-results-item-title">' + curItem.title + '</div>' +
                                                '<div class="landoven-select-results-item-detail">Подробнее</div>' +
                                            '</div>' +
                                        '</a>' +
                                    '</div>';
                }
            }
            if (newHTML == '') {
                newHTML +=  '<div class="swiper-slide">' +
                                '<div class="landoven-select-results-item">' +
                                    '<div class="landoven-select-results-item-photo"><img src="' + landovenSelectPlaceholder.img + '" alt=""></div>' +
                                    '<div class="landoven-select-results-item-photo-mobile landoven-select-results-item-photo-mobile-placeholder"><img src="' + landovenSelectPlaceholder.img + '" alt=""></div>' +
                                    '<div class="landoven-select-results-item-title-placeholder">' + landovenSelectPlaceholder.title + '</div>' +
                                    '<div class="landoven-select-results-item-text-placeholder">' + landovenSelectPlaceholder.text + '</div>' +
                                '</div>' +
                            '</div>';
            }
            $('.landoven-select-results .swiper-wrapper').html(newHTML);

            landovenConfigListSwiper = new Swiper(curSlider[0], {
                touchAngle: 30,
                slidesPerView: 1,
                navigation: {
                    nextEl: $('.landoven-select-results .swiper-button-next')[0],
                    prevEl: $('.landoven-select-results .swiper-button-prev')[0],
                },
                pagination: {
                    el: $('.landoven-select-results .swiper-pagination')[0],
                    clickable: true,
                    dynamicBullets: true
                }
            });
        });
    }

    landovenUpdateConfig();

    $('.landoven-select-filter-title').click(function() {
        $('.landoven-select-filter').toggleClass('open');
    });

});

$(window).on('load resize', function() {
    $('.landoven-select-container').each(function() {
        $('.landoven-select-container').css({'min-height': 0});
        var curMax = $('.landoven-select-container').outerHeight();
        var heightLeft = $('.landoven-select-filter-left').outerHeight();
        if (heightLeft > curMax) {
            curMax = heightLeft;
        }
        var heightRight = $('.landoven-select-filter-right').outerHeight();
        if (heightRight > curMax) {
            curMax = heightRight;
        }
        $('.landoven-select-container').css({'min-height': curMax});
    });
});