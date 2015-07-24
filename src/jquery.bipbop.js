'use strict';

/**
 * Chave de API do plano gratuito, pode ser modificado no servidor.
 * @constant
 * @type {string}
 * @default
 */
window.BIPBOP_FREE = '6057b71263c21e4ada266c9d4d4da613';

/**
 * O Plugin jQuery da BIPBOP
 *
 * @external "jQuery.fn"
 * @see {@link http://docs.jquery.com/Plugins/Authoring The jQuery Plugin Guide}
 */
(function ($) {

    /**
     * Loader da BIPBOP
     */
    var loader = function () {
        var container = $("<div />").addClass("bipbop-loader");

        var floatingCirclesG = $("<div />").addClass("floatingCirclesG");
        container.append(floatingCirclesG);

        var robot = $("<div />").addClass("robo");
        container.append(robot);

        robot.append($("<div />").addClass("body"));
        robot.append($("<div />").addClass("left-arm"));
        robot.append($("<div />").addClass("right-arm"));
        for (var i = 1; i <= 4; i++) {
            robot.append($("<div />").addClass("itens item" + i.toString()));
        }

        for (var i = 1; i <= 8; i++) {
            floatingCirclesG.append($("<div />").addClass("f_circleG frotateG_0" + i.toString()));
        }

        return container;
    }();

    $.bipbopLoader = new function () {
        var registerCounter = 0;
        var lastLoader = null;

        var unregister = function () {
            var used = false;
            return function () {
                if (used) {
                    return false;
                }
                
                used = true;
                registerCounter += -1;
                if (registerCounter) {
                    return false;
                }
                lastLoader.remove();
                lastLoader = null;
                return true;
            };
        };

        this.register = function () {
            registerCounter += 1;
            lastLoader = $.bipbopDefaults.loader;
            $("body").append(lastLoader);
            return unregister();
        };

        return this;
    }();

    /**
     * Alerta de função BIPBOP deprecada
     */
    var deprecated = function (message) {
        if (window.console) {
            console.log('%c BIPBOP-API-Deprecated :: ' + message, 'background: #222; color: #bada55');
        }
    };
    
    var setAutomaticLoader = function (parameters) {
       var beforeSend = parameters.beforeSend;
       var complete = parameters.complete;
       var loaderUnregister = null;
       
       parameters.complete = function (jqXHR, textStatus) {
           if (complete) {
               complete(jqXHR, textStatus);
           }
           if (loaderUnregister) {
               loaderUnregister();
           }
       };
       
        parameters.beforeSend = function (jqXHR, settings) {
           loaderUnregister = $.bipbopLoader.register();
           if (beforeSend) {
               beforeSend(jqXHR, settings);
           }
       };
    };

    /**
     * Configurações da BIPBOP
     */
    $.bipbopDefaults = {
        loader: loader,
        automaticLoader: true
    };

    /**
     * Permite requisitar a API BIPBOP
     *
     * @param {string} query Consulta SQL-like da BIPBOP
     * @param {string} apiKey Chave de API da BIPBOP, pode ser a constante BIPBOP_FREE
     * @param {dictionary} parameters Extensão dos parâmetros do jquery.ajax
     * @see {@link http://api.jquery.com/jquery.ajax/}
     * @function external:"jQuery.bipbop"
     */
    $.bipbop = function (query, apiKey, parameters) {

        parameters = $.extend($.bipbopDefaults, parameters);

        var adapter = '';
        if (parameters.dataType !== undefined && parameters.dataType.match(/(\s|^)jsonp(\s|$)/gi)) {
            adapter = "USING 'JSONP' ";
        }

        var protocol = 'http:';
        if (location.protocol === 'https:') {
            protocol = 'https:';
        }

        parameters = $.extend({
            type: 'GET',
            url: protocol + '//irql.bipbop.com.br/?q=' +
                    encodeURIComponent(adapter + query) + '&apiKey=' +
                    encodeURIComponent(apiKey),
            dataType: 'xml'
        }, parameters);
        
        if (parameters.automaticLoader) {
            setAutomaticLoader(parameters);
        }

        return $.ajax(parameters);
    };

    /**
     * Este callback é acionado quando ocorre uma exceção
     *
     * @callback exceptionCallback
     * @param {string} exceptionType
     * @param {string} exceptionMessage
     * @param {int} exceptionCode
     */

    /**
     * Verifica se um determinado documento retornou uma exceção
     * @param {object} Documento XML que retornou da BIPBOP
     * @param {exceptionCallback} callback Executa função em caso de erro
     * @function external:"jQuery.bipbopAssert"
     */
    $.bipbopAssert = function (ret, callback) {
        var headerException = $(ret).find('BPQL > header > exception');
        if (headerException.length) {
            callback(headerException.attr('source'), headerException.text(), parseInt(headerException.attr('code'), 10));
            return true;
        }
        return false;
    };

    $.fn.bipbop = function (query, apiKey, parameters, protocol) {
        deprecated('Use jQuery directly, calling $.bipbop or jQuery.bipbop.');
        return $.bipbop(query, apiKey, parameters);
    };

    $.fn.bipbopAssert = function (ret, callback) {
        deprecated('Use jQuery directly, calling $.bipbopAssert or jQuery.bipbopAssert.');
        return $.bipbopAssert(ret, callback);
    };
    
}(jQuery));
