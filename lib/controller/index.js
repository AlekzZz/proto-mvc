const extend = require('extend');
const Helpers = require('../helpers');
const { Identifier, Setuper } = Helpers;

/**
 * Controller
 * @author Aleksandr Strutynskyy
 */
module.exports = function(proto) {
  return function(options) {
    // allow overridable setup
    let setup = (typeof proto.setup === 'function' ? proto.setup : Setuper);
    const instance = Object.assign({}, Identifier(), proto, setup({ options, proto }));

    // cleanup
    delete instance.defaults;
    delete instance.setup;

    // invoke "init" if set
    if (typeof instance.init === 'function') {
      instance.init();
    }

    return instance;
  };
}
