'use strict';

(function () {

    /**
     * Chave de API do plano gratuito, pode ser modificado no servidor.
     * @constant
     * @type {string}
     * @default
     */
    window.BIPBOP_FREE = '6057b71263c21e4ada266c9d4d4da613';

    /**
     * BIPBOP console.log
     */
    var logMessage = function (title, message, background, color) {
        if (window.console) {
            if (typeof message === "string") {
                console.log('%c BIPBOP-API-' + title + ' :: ' + message + ' ', 'background: ' + background + '; color: ' + color);
            } else {
                console.log('%c BIPBOP-API-' + title + ' ', 'background: ' + background + '; color: ' + color, message);

            }
        }
    };

    /**
     * Erro Ocorrido na BIPBOP
     */
    var errorMessage = function (title, message) {
        return logMessage(title, message, '#ff0000', '#00ffff');
    };


    /**
     * Alerta de função BIPBOP deprecada
     */
    var deprecated = function (message) {
        return logMessage('Deprecated', message, '#222', '#bada55');
    };


    /**
     * WebSocket Connection
     */
    var BipbopWebSocket = function (apiKey, onMessage, onOpen) {

        var queue = [];
        var ws = null;

        /**
         * Encaminha dados pelo WebSocket
         * @param {mixed} data
         * @returns {Boolean}
         */
        var send = function (data, onSend) {
            if (typeof data === "string")
                apiKey = data;

            if (ws && ws.readyState === 1) {
                try {
                    ws.send(JSON.stringify(data));
                    if (onSend)
                        onSend();
                    return true;
                } catch (e) {
                    errorMessage('WebSocketFailure', e);
                }
            }
            queue.push(Array.from(arguments));
            return false;
        };

        /**
         * Conecta no socket
         * @returns {undefined}
         */
        var start = function () {
            try {
                ws = new WebSocket(window.bipbop.websocketAddress);
            } catch (e) {
                console.log("ERROR: " + e);
                errorMessage('WebSocketFailure', e);
                setTimeout(start, window.bipbop.reconnectAfter);
                return; /* voids */
            }

            ws.onmessage = function (event) {
                if (onMessage && event.data)
                    onMessage(JSON.parse(event.data), event);
            };

            ws.onopen = function () {
                /* Hou! Hou! Hou! */
                ws.send(JSON.stringify(apiKey));
                while (queue.length) {
                    send.apply(this, queue.shift());
                }

                if (onOpen) {
                    onOpen(ws);
                }
            };

            ws.onerror = function () {
                errorMessage('WebSocketError', Array.from(arguments));
                ws.close();
            };
            ws.onclose = function () {
                errorMessage('WebSocketDisconection', Array.from(arguments));
                setTimeout(start, window.bipbop.reconnectAfter);
            };
        };

        start();

        return send;
    };

    /**
     * BIPBOP Goodies
     * @type Dictionary
     */
    window.bipbop = {
        /**
         * BIPBOP WebSocket Address
         * @type {string}
         */
        websocketAddress: "wss://irql.bipbop.com.br/ws",
        /**
         * BIPBOP WebSocket Address
         * @type {string}
         */
        webserviceAddress: "https://irql.bipbop.com.br/",
        /**
         * Tempo de Reconexão
         * @type Number
         */
        reconnectAfter: 3000,
        /**
         * Conecta na BIPBOP ;)
         * @param {string} apiKey
         * @param {function} onReceive
         * @returns {WebSocket}
         */
        webSocket: function (apiKey, onSend, onConnect) {
            return new BipbopWebSocket(apiKey, onSend, onConnect);
        }
    };


    /**
     * O Plugin jQuery da BIPBOP
     *
     * @external 'jQuery.fn'
     * @see {@link http://docs.jquery.com/Plugins/Authoring The jQuery Plugin Guide}
     */
    if (typeof jQuery === "function") {
        (function ($) {
            /**
             * Loader da BIPBOP
             */
            var loader = function () {
                var container = $('<div />').addClass('bipbop-loader'),
                        floatingCirclesG = $('<div />').addClass('floatingCirclesG'),
                        robot = $('<div />').addClass('robo');
                container.append(floatingCirclesG);
                container.append(robot);
                robot.append($('<div />').addClass('body'));
                robot.append($('<div />').addClass('left-arm'));
                robot.append($('<div />').addClass('right-arm'));
                var i = null;
                for (i = 1; i <= 4; i++) {
                    robot.append($('<div />').addClass('itens item' + i.toString()));
                }

                for (i = 1; i <= 8; i++) {
                    floatingCirclesG.append($('<div />').addClass('f_circleG frotateG_0' + i.toString()));
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
                    $('body').append(lastLoader);
                    return unregister();
                };
                return this;
            }();

            var setAutomaticLoader = function (parameters) {

                var beforeSend = parameters.beforeSend;
                var complete = parameters.complete;
                var loaderUnregister = null;

                parameters.complete = function () {
                    if (complete) {
                        complete.apply(this, Array.from(arguments));
                    }
                    if (loaderUnregister) {
                        loaderUnregister();
                    }
                };

                parameters.beforeSend = function () {
                    loaderUnregister = $.bipbopLoader.register();
                    if (beforeSend) {
                        beforeSend.apply(Array.from(arguments));
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
             * @function external:'jQuery.bipbop'
             */
            $.bipbop = function (query, apiKey, parameters) {
                apiKey = apiKey || window.BIPBOP_FREE;
                parameters = $.extend({}, $.bipbopDefaults, parameters);
                var adapter = '';
                if (parameters.dataType !== undefined && parameters.dataType.match(/(\s|^)jsonp(\s|$)/gi)) {
                    adapter = "USING 'JSONP' ";
                }

                parameters = $.extend({
                    type: 'GET',
                    url: window.bipbop.webserviceAddress + '?' +
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
             * @function external:'jQuery.bipbopAssert'
             */
            $.bipbopAssert = function (ret, callback) {
                var headerException = $(ret).find('BPQL > header > exception');
                if (headerException.length) {
                    callback(headerException.attr('source'), headerException.text(), parseInt(headerException.attr('code'), 10), headerException.attr('push') === "true");
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
    }
}());
