var limit = 20;
var gamesUrl = 'https://api.twitch.tv/kraken/games/top/?client_id=q59nqumqh8gtkm7hmsdl5jt3ghgpmu&limit=' + limit;
var lolUrl =
    'https://api.twitch.tv/kraken/streams/?client_id=q59nqumqh8gtkm7hmsdl5jt3ghgpmu&game=League%20of%20Legends&limit=' + limit;
var loltwUrl = 'https://api.twitch.tv/kraken/streams/?client_id=q59nqumqh8gtkm7hmsdl5jt3ghgpmu&game=League%20of%20Legends&limit='+limit+'&broadcaster_language=zh';
var lolenUrl = 'https://api.twitch.tv/kraken/streams/?client_id=q59nqumqh8gtkm7hmsdl5jt3ghgpmu&game=League%20of%20Legends&limit='+limit+'&broadcaster_language=en';
var language = {en:'英文',pt:'葡萄牙文',es:'西班牙文',fr:'法文',de:'德文',pl:'波蘭文',ko:'韓文',it:'義大利文',zh:'中文',el:'希臘文',ja:'日文',tr:'土耳其文',ru:'俄文',cs:'捷克文',sv:'瑞典文',hu:'匈牙利文',da:'丹麥'};
var totalViewers;
var viewers;
var streamStatus;
var offsetValue = limit;
var i18n = {
    en: require('./lang_en.js'),
    zh: require('./lang_zh.js')
}
var $ = require('jquery'); 

function changeLang(lang){
    $('.nav-all-browse').text(i18n[lang].nav_title1);
    $('.nav-all-channel').text(i18n[lang].nav_title2);
    $('.header-text-all-title').text(i18n[lang].gameName);
    if(totalViewers.indexOf("萬")!==-1 && lang==='en'){totalViewers = parseInt(totalViewers)*10+"k "}
    if(totalViewers.indexOf("k")!==-1 && lang==='zh'){totalViewers = parseInt(totalViewers)/10+"萬 "};
    $('.header-text-all-subtitle').text( totalViewers+i18n[lang].viewers);
    $('.option-all').text(i18n[lang].allChannels);
    $('.option-zh').text(i18n[lang].zhChannels);
    $('.option-en').text(i18n[lang].enChannels);
    $('.main-every-pic-live').text(i18n[lang].live);
}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: gamesUrl,
        dataType: "jsonp",
        success: function (response) {
            for(var i=0;i<response.top.length;i++){
                if(response.top[i].game.name == "League of Legends"){
                    totalViewers = response.top[i].viewers;
                }
            }
            totalViewers = Math.round(totalViewers/10000)+"萬 ";
                $.ajax({
                    type: 'GET',
                    url: lolUrl,
                    dataType: 'jsonp',
                    success: function(response) {
                        var top =
                        `<div class="top">
                            <div class="top-filter"></div>
                            <div class="header">
                                <div class="header-pic"><img src="media/League_of_Legends-130x173.jpg" alt=""></div>
                                <div class="header-text">
                                    <div class="header-text-all">
                                        <div class="header-text-all-title">英雄聯盟</div>
                                        <div class="header-text-all-subtitle"><span class="count">${totalViewers}</span>名觀眾</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="option">
                            <div class="option-all chosen">全部頻道</div>
                            <div class="option-zh">中文頻道</div>
                            <div class="option-en">英文頻道</div>
                        </div>
                        <div class="main"></div>`
                        $('.all').append(top);
                        streamStatus = lolUrl;
                        for (var i = 0; i < limit; i++) {
                            viewers = response.streams[i].viewers;
                            if(viewers>10000){
                                viewers = Math.floor(viewers/1000)/10+"萬 ";
                            }
                            else
                                viewers = viewers+" ";
                            var allContent = 
                            `<div class="main-every">
                                <a href="${response.streams[i].channel.url}">
                                    <div class="main-every-pic">
                                        <img src="${response.streams[i].preview.medium}" alt="">
                                        <div class="main-every-pic-live">實況</div>
                                        <div class="main-every-pic-viewers"><span>${viewers}</span>位觀眾</div>
                                    </div>
                                </a>
                                <div class="main-every-info">
                                    <div class="main-every-info-pic"><img src="${response.streams[i].channel.logo}" alt=""></div>
                                    <div class="main-every-info-text">
                                        <div class="main-every-info-text-title">${response.streams[i].channel.status}</div>
                                        <div class="main-every-info-text-name">${response.streams[i].channel.display_name}</div>
                                        <div class="main-every-info-text-language"><div><button>${language[response.streams[i].channel.broadcaster_language]}</button></div></div>
                                    </div>
                                </div>
                            </div>`
                            $('.main').append(allContent);
                        }
                        $('.option-all').on('click',function(){
                            $('.option-all').addClass('chosen');
                            $('.option-zh').removeClass('chosen');
                            $('.option-en').removeClass('chosen');
                            $('.main').empty();
                            streamStatus = lolUrl;
                            offsetValue = limit;
                            $.ajax({
                                type: "GET",
                                url: lolUrl,
                                dataType: "jsonp",
                                success: function (response) {
                                    $('.main').empty();
                                    for(var i=0;i<limit;i++){
                                        viewers = response.streams[i].viewers;
                                        if(viewers>10000){
                                            viewers = Math.floor(viewers/1000)/10+"萬 ";
                                        }
                                        else
                                        viewers = viewers+" ";
                                        allContent = 
                                        `<div class="main-every">
                                            <a href="${response.streams[i].channel.url}">
                                                <div class="main-every-pic">
                                                    <img src="${response.streams[i].preview.medium}" alt="">
                                                    <div class="main-every-pic-live">實況</div>
                                                    <div class="main-every-pic-viewers"><span>${viewers}</span>位觀眾</div>
                                                </div>
                                            </a>
                                            <div class="main-every-info">
                                                <div class="main-every-info-pic"><img src="${response.streams[i].channel.logo}" alt=""></div>
                                                <div class="main-every-info-text">
                                                    <div class="main-every-info-text-title">${response.streams[i].channel.status}</div>
                                                    <div class="main-every-info-text-name">${response.streams[i].channel.display_name}</div>
                                                    <div class="main-every-info-text-language"><div><button>${language[response.streams[i].channel.broadcaster_language]}</button></div></div>
                                                </div>
                                            </div>
                                        </div>`
                                        $('.main').append(allContent);
                                    }
                                },
                                error: function(response){
                                    console.log(response);
                                }
                            });
                        })
                        $('.option-zh').on('click',function(){
                            $('.option-all').removeClass('chosen');
                            $('.option-zh').addClass('chosen');
                            $('.option-en').removeClass('chosen');
                            $('.main').empty();
                            streamStatus = loltwUrl;
                            offsetValue = limit;
                            $.ajax({
                                type: "GET",
                                url: loltwUrl,
                                dataType: "jsonp",
                                success: function (response) {
                                    $('.main').empty();
                                    for(var i=0;i<limit;i++){
                                        viewers = response.streams[i].viewers;
                                        if(viewers>10000){
                                            viewers = Math.floor(viewers/1000)/10+"萬 ";
                                        }
                                        else
                                        viewers = viewers+" ";
                                        allContent = 
                                        `<div class="main-every">
                                            <a href="${response.streams[i].channel.url}">
                                                <div class="main-every-pic">
                                                    <img src="${response.streams[i].preview.medium}" alt="">
                                                    <div class="main-every-pic-live">實況</div>
                                                    <div class="main-every-pic-viewers"><span>${viewers}</span>位觀眾</div>
                                                </div>
                                            </a>
                                            <div class="main-every-info">
                                                <div class="main-every-info-pic"><img src="${response.streams[i].channel.logo}" alt=""></div>
                                                <div class="main-every-info-text">
                                                    <div class="main-every-info-text-title">${response.streams[i].channel.status}</div>
                                                    <div class="main-every-info-text-name">${response.streams[i].channel.display_name}</div>
                                                    <div class="main-every-info-text-language"><div><button>${language[response.streams[i].channel.broadcaster_language]}</button></div></div>
                                                </div>
                                            </div>
                                        </div>`
                                        $('.main').append(allContent);
                                    }
                                },
                                error: function(response){
                                    console.log(response);
                                }
                            });
                        })
                        $('.option-en').on('click',function(){
                            $('.option-all').removeClass('chosen');
                            $('.option-zh').removeClass('chosen');
                            $('.option-en').addClass('chosen');
                            $('.main').empty();
                            streamStatus = lolenUrl;
                            offsetValue = limit;
                            $.ajax({
                                type: "GET",
                                url: lolenUrl,
                                dataType: "jsonp",
                                success: function (response) {
                                    $('.main').empty();
                                    for(var i=0;i<limit;i++){
                                        viewers = response.streams[i].viewers;
                                        if(viewers>10000){
                                            viewers = Math.floor(viewers/1000)/10+"萬 ";
                                        }
                                        else
                                        viewers = viewers+" ";
                                        allContent = 
                                        `<div class="main-every">
                                            <a href="${response.streams[i].channel.url}">
                                                <div class="main-every-pic">
                                                    <img src="${response.streams[i].preview.medium}" alt="">
                                                    <div class="main-every-pic-live">實況</div>
                                                    <div class="main-every-pic-viewers"><span>${viewers}</span>位觀眾</div>
                                                </div>
                                            </a>
                                            <div class="main-every-info">
                                                <div class="main-every-info-pic"><img src="${response.streams[i].channel.logo}" alt=""></div>
                                                <div class="main-every-info-text">
                                                    <div class="main-every-info-text-title">${response.streams[i].channel.status}</div>
                                                    <div class="main-every-info-text-name">${response.streams[i].channel.display_name}</div>
                                                    <div class="main-every-info-text-language"><div><button>${language[response.streams[i].channel.broadcaster_language]}</button></div></div>
                                                </div>
                                            </div>
                                        </div>`
                                        $('.main').append(allContent);
                                    }
                                },
                                error: function(response){
                                    console.log(response);
                                }
                            });
                        })
                        
                    },
                    error: function(response) {
                        console.log(response);
                    },
                });
            
            //捲到底部新增資料
            setTimeout(function(){
                var winH = $(window).height();
                $(window).scroll(function(){
                    var pageH = $(document).height();
                    var nowH = $(window).scrollTop();
                    
                    if((pageH-winH-nowH)<0.05 ){
                        $.ajax({
                            type: "GET",
                            url: streamStatus+"&offset="+offsetValue,
                            dataType: "jsonp",
                            success: function (response) {
                                for(var i=0;i<response.streams.length;i++){
                                    var viewers = response.streams[i].viewers;
                                    if(viewers>10000){
                                        viewers = Math.floor(viewers/1000)/10+"萬 ";
                                    }
                                    else
                                        viewers = viewers+" ";
                                    allContent = 
                                    `<div class="main-every">
                                        <a href="${response.streams[i].channel.url}">
                                            <div class="main-every-pic">
                                                <img src="${response.streams[i].preview.medium}" alt="">
                                                <div class="main-every-pic-live">實況</div>
                                                <div class="main-every-pic-viewers"><span>${viewers}</span>位觀眾</div>
                                            </div>
                                        </a>
                                        <div class="main-every-info">
                                            <div class="main-every-info-pic"><img src="${response.streams[i].channel.logo}" alt=""></div>
                                            <div class="main-every-info-text">
                                                <div class="main-every-info-text-title">${response.streams[i].channel.status}</div>
                                                <div class="main-every-info-text-name">${response.streams[i].channel.display_name}</div>
                                                <div class="main-every-info-text-language"><div><button>${language[response.streams[i].channel.broadcaster_language]}</button></div></div>
                                            </div>
                                        </div>
                                    </div>`
                                    $('.main').append(allContent);  
                                }
                                pageH = $(document).height();
                                offsetValue = offsetValue + limit;                 
                            },
                            error: function(response){
                                console.log(response);
                            }
                        });
                    }
                    
                })
            },1000)
            $('.changeToEn').on('click',function(){
                changeLang('en');
            })
            $('.changeToZh').on('click',function(){
                changeLang('zh');
            })         
        },
        error: function(response){
            console.log(response);
        }
    });
});


