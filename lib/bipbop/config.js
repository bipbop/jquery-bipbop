/**
 * Arquivo de Configuração da BIPBOP
 * @var
 * @type {object}
 * @name bipbop
 * @global
 */

/**
 * Endereço do WebSocket
 * @type {string}
 * @name websocketAddress
 * @memberof bipbop
 */

/**
 * Endereço do WebService
 * @type {string}
 * @name webserviceAddress
 * @memberof bipbop
 */

/**
 * Intervalo de Reconexão
 * @type {number}
 * @name reconnectAfter
 * @memberof bipbop
 */

export default {
  websocketAddress: 'wss://irql.bipbop.com.br/ws',
  webserviceAddress: 'https://irql.bipbop.com.br/',
  reconnectAfter: 3000,
};
