(function (doc, cssText) {
    var styleEl = doc.createElement("style");
    doc.getElementsByTagName("head")[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText;
        } catch (ignore) {
            styleEl.innerText = cssText;
        }
    }
}(document, ".bipbop-loader{background-color:rgba(30,50,58,.8);background-position:center center;background-repeat:no-repeat;height:100%;left:0;overflow:hidden;position:fixed;top:0;width:100%}.bipbop-loader .robo{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABPCAMAAACAlFYvAAACjlBMVEX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2vGPuAAAA2XRSTlMAAQIDBAUGBwkKCwwNDhAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyNDU2Nzg6PEBCQ0RGR0hJSkxNUFFTVFVWV1laW1xdXl9gYWJkZWZnaGlqa2xtbm9wcXJzdXd4eXp+f4CBgoOEhYaHiImKi4yNjo+QkZKUlZaYmZucnZ6goaKkpaaoqaqrrK2ur7CxsrO0tba3uLm8vb/BwsPExcbHyMnLz9DR0tPU1dbY2drb3N3e3+Di4+Tl5ufo6err7O7v8PHy8/T19vf4+fr7/P3+7FTI4gAABR5JREFUWMPtmNlbU1cUxRdoSoJSkaKCKGjAEAiDMgRjS6VaxDpWppCWYMWGUoeaMoRaRerYAs5YtLW0UkCjBRzQUgekgoCBBIEQmvXf9OEmEPDjE96z3s7a+3fPvfvse79zLuDQsm0nb942vlW3b57cGoDJmlf4jDPW34XzXNkVNzkr/RHiwrZylmpd4WQlv5Ekm4/kb9/5Fm3PP9JMkqz1csA7SdKStxAz0sI8C0nuEEb+zSQHNzpiXuFpGs2mlXNc8+es3KTRpIU7J9s4SLLZHwCQaiOpdwTklYMk2Vvssh6Bh3tJcrBS7jD0JG2pAIBTJLtiBTvpKWkyNg2RLXFONq6FHGoymsinSYIT20XyFACglqRRcBUd7Nu9XCaTlY2yYYHgLWjgaJlMJlu+u48dCsEzkqwFAFwh2SiYZ2hJTrze2X1OnkFqBG83mSE/1915PTHZwjOC10jyyhR4VQ/1a/pJsj3kLO+KAOCdNp4NaSfJ/jV69qyaFlZxSHpa6AJdCq2hABBqZYpO8E5Lh6iaFs6hKfiOkHg0xmZXAoDSbos5Knh3gk3MmRZO5UBgnZCoj6MtGgASxhinF7y6wAGmTgvHkxuySZJWZQH7JQAwb4AFSitJMnsD7aunhb3r2BpYNEKOZsb08rhQ2ePsjckcJUeKAltZ5z0Frp1YqtQx3giPzsqMULbzlaNvYl+xXRmRmRUdfsPZVmgcX+fzJB8tFtzvSVNFenqVhdZdzg7bZaWlKj29wkQaBGfxI5LnAQD5JOlM/fKFUJwnWyZ6e8sTwevKc16OJPMBAFFmkg+DHIFQ3dUH9y5lBbu+VcFZl+49uKoLdQyDHpI0RwEAROUkWS8bz/X0fPMtdvFk9SRZLhJG0g6S7Dm0NlKhUCgiI+TyCMUURcjlEUJ07aEekuyQOq+VNkySNHfMQGaS5HDaxE2pLbP7/lnUro+0rsk+c9TetG5yQXx31AzODB2s2eH7Rj1FfvEp6yek2jMgJA/sUbnYKfF+ohl8YhN6Bbg3AbNXYp8A9yW6YTfsht2wG3bDbtgNz25b4TlJUDpnVk6NvCHp3p9qLrvqQr2wvae1/sKkQM2Pe6WTUA9d32w2gH06Dxe4guysLtHrD5YYDAZDqX5/UanBYCj79uABfZnBYCgt2q8vMRgMhpKD3+iLa/4lKybYTPKaDFjkGyYBAPjEiuYCwHvSsAAAEIkS/bwAQBK2ZBEgu0b7p+Mn4lus9wE++PPxQLUc8P2qxdpwQAxE1XZbjEnA3JxfR+9+txQIOvbySUsa4FPPW87TdjztKmBZCx9382c/ZPWx5b/OLPhc57NO3gjAR0/5z/BIKbzK+eohn0cBKjvjHfBmmiTAdnuDv7zneTCuMA9f8zCiTW0rlhuZBAN/EO3kL95hHeZk8SVmABITNzvgbTSLgUJWwbuNm9HMtUhjq+eHbJyPShbiMr9A5OvXS5XDXVIcYRUgNnObA1bSthoIfsDqehrfxS6+PNnGAsyt4+/VbA9B8kjn8TYeA07xduWwKQlYbaPSAS9p5UXAo+A5+deHHpBW2dh/IRBY/8jGZ1s8sOjwC5qvxgAJzeRrjQi4yNYlznLryGIxJGs+zggAgPnrc5MWAEDk+1vDAcBL8VmcPwAEpX2iAsTFpG58nSXV5P19arU6W52r1ebmqHPUOVqtNledrVZ/rtVqNdnqbI0QUWdr9t0nqyUTXSI+MTab9hw7IZ50RlCVz+CXlOPHVLnKcVL4HxuvKKnLINUCAAAAAElFTkSuQmCC);height:79px;left:50%;margin-left:-30px;margin-top:-40px;position:relative;top:50%;width:60px;z-index:2}.bipbop-loader .robo .body{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAYCAMAAACoeN87AAACUlBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AFh8CGSEEGiMLISoMIisOJCwPJS0RJy8VKjIWKzMXKzMXKzQXLDQaLzcdMTkdMTomOUEoPEQpPEMqPEQqPkUsPkYsP0YtP0YtQEcuQUgwQkkwQkowQ0oyRUwzRUwzRk00Rk00R041R042SU83SE84SlI8TVQ8TlQ8TlU+T1Y/UFdAUVhAUlhBUllCU1pDVFpEVFtEVVtEVVxFVVxGVlxHV15IWF9IWV9JWmBKWWBLW2JNXWNOXWRPX2VPYGZQX2VQYGZRYGZRYGdRYWZRYWdSYGZSYWdTYmhUY2lVZGpWZWtYZ21aaW9ca3Fda3FdbHJjcXdpdntue4BwfYFyf4R1gYZ2god2g4d3god3g4h5hYp6hYp6hot8h4t8iIx8iI2Nl5uPmZ2SnJ+SnKCVnqKYoKSapKebpaidpqmgqKuhqa2jq66mrrGzuby3vsC5v8K6wMK7wMO8wsS8wsXAxcjAxsjBx8nCx8rFy8zGy83Kz9HL0NLM0dLN0dPP09XV2NrW2tzk5ufk5+jl5+jl6Onm6Onn6erp6+zq7O3s7e7t7u/u8PHv8fHx8vPy8/Pz8/T29/f39/j39/n4+Pj4+Pn4+fn5+fr5+vr7+/z9/f3+/v7////rBV8kAAAAKnRSTlMAAS40OUBDREVOT1VdYmNmZ2hwc3V6lJiZnJ6fxsfJys7R3OHk8vT1+P0NA4BXAAABQklEQVQoz2NgZWeDARZRVQ11INBU5GSFC3IwM6gdJQAUCCtRIqxEDabkyGEQeRiJRFGysczeITjCxcPTMTbOxcPdOSTAycvb2s/VzqoLqEQFpGR9pH7VwpUNZsa1cxe0mlg2LJxTYWRe2t8Xrd0JVCIDUrIhImzXquU7c1NXz5y9PSXtyNGjawPdlh09OssGpEQWrCS8+mhj5dGa5sU9E2a014EckFV+cPq8/b5tcCWRPmu27dgYG7Vp6ZLNoTFbjx5dYRu06Oju+RYdMCXrgnWSpkyKN9BLnjotQc8wdWJvgK6pf3dTkFYLTMmW+vS8vLys4uKMoqLM4uLsvOz8kuKCnOzCxMkwJUcO7Nu3d+++fWjkvn17DsGU4AcjUokcYSXyDLwC/DDAIwEVVRbigwsKcjEgAyZxaUkpMWERbkZkUQDAc9tw5EWVVQAAAABJRU5ErkJggg==);height:24px;left:13px;position:absolute;top:40px;width:34px;z-index:3;-webkit-animation:slide 1.5s infinite linear;animation:slide 1.5s infinite linear}.bipbop-loader .robo .left-arm,.bipbop-loader .robo .right-arm{height:7px;top:46px;width:40px;z-index:2;background-repeat:no-repeat;position:absolute}.bipbop-loader .robo .left-arm{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAHCAMAAABN2v+8AAAAllBMVEX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MC6PrAAAAMXRSTlMABggMFxgjJCUmKzEzOUNES0xNT1FiZHFyd4GaoqqtsbK0ydLb3OLp6+zu7/P3+Pr7wHcdKAAAAGhJREFUGBmNwUcCgjAUBcCHIAFEA0gROx0Tiv/+l3NBFtGNzGD/bFIDK5REVOTZSZNFgS7kjDkW/IR39GP+NgkhLzDtTUX/3fCQNQ2t0kuhk+OsvK84v+juQ9m6TGM7hyhYHHeAF2OND2KEGhdctdN2AAAAAElFTkSuQmCC);background-position:60px center;left:-26px;-webkit-animation:slide-left-arm 1.5s infinite linear;animation:slide-left-arm 1.5s infinite linear}.bipbop-loader .robo .right-arm{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAHCAMAAABN2v+8AAAAk1BMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+AVyv3AAAAMHRSTlMAAgsQEhoeISMkJSs1OEdKS01WWVpeaXByc3V/gJG0zdbY4uPn6Ozt7vDz9PX6/P7u6ENqAAAAZUlEQVQYGY3B2xZCQBgG0C9yGDkl5CwRk8L//k/XBa1lXM3ekKCXfWHAZObFF3i3NNm55w0RZXhx/p5ECx1UdqyCJJQnBozT32fggu65ape5+Ubw/M3VMdiepWATPqh2IUMLzvgBBPcZedCGReQAAAAASUVORK5CYII=);background-position:-15px center;left:47px;-webkit-animation:slide-right-arm 1.5s infinite linear;animation:slide-right-arm 1.5s infinite linear}@-webkit-keyframes slide{0%,100%{top:40px}50%{top:36px}}@keyframes slide{0%,100%{top:40px}50%{top:36px}}@-webkit-keyframes slide-left-arm{0%,100%,25%{background-position:40px}50%{background-position:15px}}@keyframes slide-left-arm{0%,100%,25%{background-position:40px}50%{background-position:15px}}@-webkit-keyframes slide-right-arm{0%,100%,75%{background-position:-15px}50%{background-position:-60px}}@keyframes slide-right-arm{0%,100%,75%{background-position:-15px}50%{background-position:-60px}}.bipbop-loader .itens{background-position:center center;background-repeat:no-repeat;height:20px;position:absolute;opacity:0;width:20px;z-index:1}.bipbop-loader .item1{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAABWElEQVQoz3XSTUuUURQA4BtNDv2HrEVmLqJf4B9w4SZctJs+dCgqaJGgCxmhNCLHjQq1kDESBHMvlC0KEiJSUFwIBm3EcNUHpBL2tHgv74eN527ee96Hcw/3niDkVsWmJ86bUSnkg5DfXPcbh97r0tBzHLxpXxJXtHnqQnOYVEti0Vcvmh99I63203b8mlQ+Cq/Ziz9XdWr3Nu4mnMjDin1sW/FHtyCYTpuY0pLBLfzV67QZD5Rd9V0WE0puqwrBKFh30WULPjoAv1L6Tk1dNWgxDr64JJgDB56ZjfC5YMStpIMxsKXDOHZNG3Av0ldmLSsn8JQ62PHDNy/1GzbibqzPoVp2U/WY/KzXqEHDHrljPmYbGTyZ0jf6PDZkyEOfwAetxYcai3RJVU3NRmRni9MTlNKqr923BpadOTpmxV53I2v9fx6LN1BgzWBWNceOgyWDJp3L5/4B2w08XMieSqgAAAAASUVORK5CYII=);left:-30px;top:40px;-webkit-animation:item-1 3s infinite linear;animation:item-1 3s infinite linear}@-webkit-keyframes item-1{0%{opacity:1}25%{left:-30px;opacity:1}50%{left:15px;opacity:1}100%,51%{opacity:0}}@keyframes item-1{0%{opacity:1}25%{left:-30px;opacity:1}50%{left:15px;opacity:1}100%,51%{opacity:0}}.bipbop-loader .item2{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAMAAACejr5sAAAAolBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9MEo+OAAAANXRSTlMAAwQFChIYHz9ARkhKS01PUFRiZnFzdH+Il6Klrbe4wMLGx8jS1NXm5+jq6+3u7/Dx9fj5/jFXMdAAAABrSURBVBgZZcGJFkJAAAXQ16oVraJSiFaRvP//NTTpTOZe1FqLU/qM1l3ILH7YqPVmg2lOQYfQP/B95ZcDYUWJ10ZFO1JyGaI0P/NPsulglLFpiS0VIQIqEuyo8DF+sSEzgYl7ix8/8X1voADnFiXsVZ8FLQAAAABJRU5ErkJggg==);left:67px;opacity:1;top:36px;-webkit-animation:item-2 3s infinite linear;animation:item-2 3s infinite linear}@-webkit-keyframes item-2{0%{left:67px;opacity:1}25%{left:24px;opacity:1}26%{left:24px;opacity:0}75%{left:67px;opacity:0}100%{opacity:1}}@keyframes item-2{0%{left:67px;opacity:1}25%{left:24px;opacity:1}26%{left:24px;opacity:0}75%{left:67px;opacity:0}100%{opacity:1}}.bipbop-loader .item3{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAABdklEQVQoz33STUuUURjG8SNFWg6BRBAEqVAQfQCJclNEtgglcSEFvdmqZbRoFaGVqAw4TmNqU77UZhYpRZ+gleTOqIRatIhq1aIilLJfC585Oo9D1706N/9zznXOfQVhU3UouqGuspuGMtp8c9wVQ2r/B7br8d0rjXpkZaqDex3T55kVLGpy3rD6amCrC+aVtajZWTk7K8GM0/osWLauJft1u7eGBkGN7VpcVkqAXxF954AuBQ3lEztd9dFvLHlkXN6bBP3goDNG7Q72aHFTMfF114wxT/V7HdFDOl0KjjiX7F+RN6rXS4NKRvxN0E9aNQRTZhNXP+TcNuetbk8M+xO9XhOCh3G5qui5nBPmFc3F/qD7Lgb1ZmLriztKBmTNJhev6nXYgpNBsMN0RD97YMT7uL4lr2RX+Xtqk1ev6Wd0V3DKYx0bJ1NnQlpDrvtqX3rWWxUqsDHBUW3VQrFNPmJTlWlM57FGFkymsc3B3WLai42BLdc/OORAItahRRkAAAAASUVORK5CYII=);left:-30px;top:40px;-webkit-animation:item-3 3s infinite linear;animation:item-3 3s infinite linear}@-webkit-keyframes item-3{0%{left:-30px;opacity:0}100%,50%{opacity:0}75%{left:-30px;opacity:1}99%{left:15px;opacity:1}}@keyframes item-3{0%{left:-30px;opacity:0}100%,50%{opacity:0}75%{left:-30px;opacity:1}99%{left:15px;opacity:1}}.bipbop-loader .item4{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAUCAQAAADBqR7CAAABkklEQVQoz3XST0wOABjH8cdoVpTohEmbLQ6FiYMJbxfWEYtEY2MpB5PN3wNFtL1jvb152drcW7yVLbzv2+biYmZzcOmCdUI5NXP9OHgPtWnP7bvv4Xl+zy/Egqn01AfPVC2ksUgZ8MBGPYYt/7+y15hSocRzTYuVasccsVW/00V8Qso2R7WoEaFdXkpG1qy0emV2yZiT9diAnLbw1m4h7DGqw7SPvjhrRKMQGkyFFyqE0OiNpFdumtRvorjNGqMhrU0I3b67rkxY5YafrgqhXSrskLfZefNuCQeN6xS6zTunRl59CCfNSOvVpdQn/FGnRUrGN8f/HX3KjCf6XFSigB+2aDVo2FetIuyUt0mnebeFGj0SwjW/XVCtYHtIFQO7bNYdFUK5XnOuCOGMwZC1thj/S32m3Fdwz7iEEKqMhZxDxejGXPLZe9O6TNgvhGavQ7O8jCEj5jxUa4U6j/wyYlBGzuEQ1klost5dHcU3tknaIOGAysVlaDBptbDShH1LVSoprVbSkGVLKeUGvJNRuZD+BX6cvD1xplJhAAAAAElFTkSuQmCC);left:67px;top:38px;-webkit-animation:item-4 3s infinite linear;animation:item-4 3s infinite linear}@-webkit-keyframes item-4{0%,100%,25%,76%{opacity:0}37%{opacity:1}50%{left:67px;opacity:1}75%{left:25px;opacity:1}}@keyframes item-4{0%,100%,25%,76%{opacity:0}37%{opacity:1}50%{left:67px;opacity:1}75%{left:25px;opacity:1}}.bipbop-loader .floatingCirclesG{position:absolute;width:375px;height:375px;top:50%;left:50%;margin-top:-187px;margin-left:-187px;opacity:.8;z-index:5;-webkit-transform:scale(.6);transform:scale(.6)}.bipbop-loader .f_circleG{position:absolute;background-color:transparent;height:52px;width:52px;border-radius:34px;-webkit-animation-name:f_fadeG;animation-name:f_fadeG;-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-direction:linear;animation-direction:linear}.bipbop-loader .frotateG_01{left:0;top:153px;-webkit-animation-delay:.45s;animation-delay:.45s}.bipbop-loader .frotateG_02{left:44px;top:44px;-webkit-animation-delay:.6s;animation-delay:.6s}.bipbop-loader .frotateG_03{left:153px;top:0;-webkit-animation-delay:.75s;animation-delay:.75s}.bipbop-loader .frotateG_04{right:44px;top:44px;-webkit-animation-delay:.9s;animation-delay:.9s}.bipbop-loader .frotateG_05{right:0;top:153px;-webkit-animation-delay:1.05s;animation-delay:1.05s}.bipbop-loader .frotateG_06{right:44px;bottom:44px;-webkit-animation-delay:1.2s;animation-delay:1.2s}.bipbop-loader .frotateG_07{left:153px;bottom:0;-webkit-animation-delay:1.35s;animation-delay:1.35s}.bipbop-loader .frotateG_08{left:44px;bottom:44px;-webkit-animation-delay:1.5s;animation-delay:1.5s}@-webkit-keyframes f_fadeG{0%{background-color:#f3742b}100%{background-color:transparent}}@keyframes f_fadeG{0%{background-color:#f3742b}100%{background-color:transparent}}"));

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
                    url: window.bipbop.webserviceAddress +
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