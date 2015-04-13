/**
 * Chave de API do plano gratuito, pode ser modificado no servidor.
 * @constant
 * @type {string}
 * @default
 */
var BIPBOP_FREE = "6057b71263c21e4ada266c9d4d4da613";

/**
 * O Plugin jQuery da BIPBOP
 * 
 * @external "jQuery.fn"
 * @see {@link http://docs.jquery.com/Plugins/Authoring The jQuery Plugin Guide}
 */
(function($) {

    /**
     * Permite requisitar a API BIPBOP
     * 
     * @param {string} query Consulta SQL-like da BIPBOP
     * @param {string} apiKey Chave de API da BIPBOP, pode ser a constante BIPBOP_FREE
     * @param {dictionary} parameters Extensão dos parâmetros do jquery.ajax
     * @see {@link http://api.jquery.com/jquery.ajax/}
     * @function external:"jQuery.fn".bipbop
     */
    $.fn.bipbop = function(query, apiKey, parameters) {

        var protocol = document.location.protocol;
        if (protocol != "http:" && protocol != "https:")
            protocol = "http";

        return $.ajax($.extend({
            type: "GET",
            url: protocol + "//irql.bipbop.com.br/?q="
                    + encodeURIComponent("USING 'JSONP' " + query) + "&apiKey="
                    + encodeURIComponent(apiKey),
            dataType: "jsonp xml"
        }, parameters));
    };

    /**
     * Este callback é acionado quando ocorre uma exceção
     * 
     * @callback exceptionCallback
     * @param {string} exceptionType
     * @param {string} exceptionMessage
     */

    /**
     * Verifica se um determinado documento retornou uma exceção
     * @param {object} Documento XML que retornou da BIPBOP
     * @param {exceptionCallback} callback Executa função em caso de erro
     * @function external:"jQuery.fn".bipbopAssert
     */
    $.fn.bipbopAssert = function(ret, callback) {
        headerException = $(ret).find("header exception");
        if (headerException.length) {
            callback(headerException.attr("source"), headerException.text());
            return true;
        }
        return false;

    };

}(jQuery));