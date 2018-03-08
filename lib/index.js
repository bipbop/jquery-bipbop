/**
* Abre uma chamada com o WebSocket da BIPBOP
* @function
* @name WebSocket
* @memberof bipbop
* @param {string} apiKey - Chave de API.
* @param {callback} onMessage - Callback realizado ao receber uma chamada.
* @param {callback} onConnect - Callback realizado ao se conectar.
* @return {Function} Função para disparar mensagens no WebSocket.
*/
import objectAssign from 'object-assign';
import BipbopWebSocket from './bipbop/websocket-controller';
import ajax from './bipbop/jquery';
import Config from './bipbop/config';

objectAssign(Config, {
    WebSocket: (...args) => BipbopWebSocket.open(...args),
    ajax
});

export default Config;