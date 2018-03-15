import objectAssign from 'object-assign';
import oneTime from 'one-time';
import jquery from 'jquery';

import '../../src/jquery.bipbop.scss';
import bipbopFreeKey from './bipbop-free';
import bipbop from './config';

function buildLoader() {
  const container = jquery('<div />').addClass('bipbop-loader');
  const floatingCirclesG = jquery('<div />').addClass('floatingCirclesG');
  const robot = jquery('<div />').addClass('robo');
  container.append(floatingCirclesG);
  container.append(robot);
  robot.append(jquery('<div />').addClass('body'));
  robot.append(jquery('<div />').addClass('left-arm'));
  robot.append(jquery('<div />').addClass('right-arm'));

  for (let i = 1; i <= 4; i += 1) {
    robot.append(jquery('<div />').addClass(`itens item${i.toString()}`));
  }

  for (let i = 1; i <= 8; i += 1) {
    floatingCirclesG.append(jquery('<div />').addClass(`f_circleG frotateG_0${i.toString()}`));
  }

  return container;
}

/**
 * Loader de consulta da BIPBOP
 * @type {Object}
 * @memberof jquery
 * @prop {Object} loader - Loader da BIPBOP ou customizado.
 * @prop {boolean} automaticLoader - Loader automatizado para consulta.
 */
const defaults = {
  loader: buildLoader(),
  automaticLoader: true,
};

let loader = null;
class Loader {
  constructor() {
    this.registerCounter = 0;
    this.lastLoader = null;
  }

  static singleton() {
    if (!loader) {
      loader = new Loader();
    }
    return loader;
  }

  register() {
    this.registerCounter += 1;
    this.lastLoader = defaults.loader;
    jquery('body').append(this.lastLoader);
    return () => oneTime(this.unregister());
  }

  unregister() {
    this.registerCounter -= 1;
    if (this.registerCounter) {
      return false;
    }

    this.lastLoader.remove();
    return true;
  }
}

function loaderRequestWatcher(parameters = {}) {
  const myParameteres = parameters;
  const { beforeSend, complete } = myParameteres;
  let loaderUnregister = null;
  objectAssign(parameters, {
    complete(...args) {
      if (complete) {
        complete.apply(this, ...args);
      }
      if (loaderUnregister) {
        loaderUnregister();
      }
    },
    beforeSend(...args) {
      loaderUnregister = Loader.singleton().register();
      if (beforeSend) {
        beforeSend.apply(this, ...args);
      }
    },
  });
}

/**
 * Realiza uma requisição a BIPBOP
 * @function
 * @name bipbop
 * @param {string} query - Endpoint da consulta.
 * @param {string} apiKey - Chave de API
 * @param {object} parameters - Parâmetros da requisição AJAX
 * @memberof jquery
 * @return {JQuery.jqXHR} http://api.jquery.com/jquery.ajax/
 */
function ajax(query = "SELECT FROM 'INFO'.'INFO'", apiKey = bipbopFreeKey, parameters = {}) {
  let adapter = '';
  if (parameters.dataType && parameters.dataType.match(/(\s|^)jsonp(\s|jquery)/gi)) {
    adapter = "USING 'JSONP' ";
  }

  const requestParameters = objectAssign({
    type: 'GET',
    url: `${bipbop.webserviceAddress}?q=${
      encodeURIComponent(adapter + query)}&apiKey=${
      encodeURIComponent(apiKey)}`,
    dataType: 'xml',
  }, defaults, parameters);

  if (defaults.loader) {
    loaderRequestWatcher(requestParameters);
  }

  return jquery.ajax(requestParameters);
}

/**
 * Realiza uma requisição a BIPBOP
 * @function
 * @name bipbopAssert
 * @param {Object} ret - Retorno do endpoint da consulta.
 * @param {function} apiKey - Chave de API
 * @memberof jquery
 * @return {boolean} true se há exceção e o callback foi chamado
 */
function validateResponse(ret, callback) {
  const headerException = jquery(ret).find('BPQL > header > exception');
  if (headerException.length) {
    callback(headerException.attr('source'), headerException.text(), parseInt(headerException.attr('code'), 10), headerException.attr('push') === 'true', ret);
    return true;
  }
  return false;
}


objectAssign(jquery, { bipbopAssert: validateResponse, bipbopDefaults: defaults, bipbop: ajax });

export default jquery;
