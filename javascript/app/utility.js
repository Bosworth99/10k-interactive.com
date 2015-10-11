///////////////////////////////////////////////////////////////////////////
//
//  @class      : SMC_Utils
//  @comment    : utility class
//
///////////////////////////////////////////////////////////////////////////

define( function(require){

    // INCLUDES ///////////////////////////////////////////////////////////////
    var $     = require('jquery');
    var _     = require('underscore');

    // Class //////////////////////////////////////////////////////////////////
    return {

        getURLParameter : function(name){
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
        }, 

        stripDomain : function(str){
            if(str){
                var domain = document.domain;
                str = str.replace(domain,"");
                return str;
            }
        }, 

        htmlEscape : function(str) {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        },

        htmlUnescape : function(str){
            return String(str)
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');
        },

        formatURL  : function(str){
            if (str){
                var http = /^https?:\/\//i;            
                //str = str.toLowerCase();
                if (   str.match(/^mailto\:/) 
                    || str.match(/^javascript\:/) 
                    || str.match(/^tel\:/)
                    || str.substring(0,1) == '#'
                    || str.substring(0,1) == '?'
                    || str.substring(0,1) == '/'
                    || str.substring(0,3) == '../'
                    || str.substring(0,2) == '[['
                    ){ 
                    return str 
                }
                if (!http.test(str)){
                    return 'http://' + str;
                } 
                return str;
            }
        },

        formatTitle : function(str){
            var rx1 = /[^\s\w:|]+/gi;
            if (str){
                str = str.replace(rx1, '');
                var arr = str.split("_")
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].substr(0, 1).toUpperCase() + arr[i].substr(1);
                };
                str = arr.join(' ');
                return str;
            }
        },

        formatID : function(str){
            var rx2 = /[^\s\w-]+/gi;
            if (str){
                str = str.replace(rx2, '');
                var arr = str.split(" ")
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].substr(0, 1).toUpperCase() + arr[i].substr(1);
                };
                str = arr.join('_');
                return str;
            }
        },

        formatRouter: function(str){
            var rx3 = /[^\s\w-]+/gi;
            if (str){
                str = str.replace(rx3, '');
                str = str.toLowerCase();
                var arr = str.split(" ")
                str = arr.join('-');
                return str;                
            }
        },

        formatFileSize : function(bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }
            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2) + ' gb';
            }
            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2) + ' mb';
            }
            return (bytes / 1000).toFixed(2) + ' kb';
        },

        formatFileSizeNumeric : function(bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }
            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2);
            }
            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2);
            }
            return (bytes / 1000).toFixed(2);
        },

        getGUID         : function(){
            return Math.floor(Math.random()*9999)+'-'+Math.floor(Math.random()*9999)+'-'+Math.floor(Math.random()*9999)+'-'+Math.floor(Math.random()*9999);
        },

        getRandomNumber : function(){
            return Math.floor(Math.random()*999999);
        },

        getRandomPassword : function(){
            var keylist="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%&*:?".split('');
            var str='';
            for (var i = 0; i < 16; i++) {
                str += keylist[(Math.floor(Math.random()*keylist.length))];
            };
            return str;
        },

        getCenterPosition : function(el){
            var w = $(window);
            return {
                top : Math.max(0, ((w.height() - el.outerHeight()) / 2) ),
                left : Math.max(0, ((w.width() - el.outerWidth()) / 2) )
            }
        }
    };

});