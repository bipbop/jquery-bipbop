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
(function($) {

    /**
     * Alerta de função BIPBOP deprecada
     */
    var deprecated = function(message) {
        if (window.console) {
            console.log('BIPBOP-API-Deprecated :: ' + message, 'background: #222; color: #bada55');
        }
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
    $.bipbop = function(query, apiKey, parameters, protocol) {

        var adapter = '';
        if (parameters.dataType !== undefined && parameters.dataType.match(/(\s|^)jsonp(\s|$)/gi)) {
            adapter = "USING 'JSONP' ";
        }

        var protocol = 'http:';
        if (location.protocol === 'https:') {
            protocol = 'https:';
        }

        return $.ajax($.extend({
            type: 'GET',
            url: protocol + '//irql.bipbop.com.br/?q=' +
                    encodeURIComponent(adapter + query) + '&apiKey=' +
                    encodeURIComponent(apiKey),
            dataType: 'xml'
        }, parameters));
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
    $.bipbopAssert = function(ret, callback) {
        var headerException = $(ret).find('BPQL > header > exception');
        if (headerException.length) {
            callback(headerException.attr('source'), headerException.text(), parseInt(headerException.attr('code'), 10));
            return true;
        }
        return false;
    };

    $.fn.bipbop = function(query, apiKey, parameters, protocol) {
        deprecated('Use jQuery directly, calling $.bipbop or jQuery.bipbop.');
        return $.bipbop(query, apiKey, parameters, protocol);
    };

    $.fn.bipbopAssert = function(ret, callback) {
        deprecated('Use jQuery directly, calling $.bipbopAssert or jQuery.bipbopAssert.');
        return $.bipbopAssert(ret, callback);
    };

}(jQuery));
