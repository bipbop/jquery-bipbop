# jquery-bipbop@1.1.2
 [![npm version](https://badge.fury.io/js/bipbop.svg)](https://npmjs.org/package/bipbop)  [![build status](https://travis-ci.org/bipbop/jquery-bipbop.svg)](https://travis-ci.org/bipbop/jquery-bipbop)  [![coverage status](https://coveralls.io/repos/bipbop/jquery-bipbop/badge.svg)](https://coveralls.io/github/bipbop/jquery-bipbop)  [![dependency status](https://david-dm.org/bipbop/jquery-bipbop.svg?theme=shields.io)](https://david-dm.org/bipbop/jquery-bipbop)  [![devDependency status](https://david-dm.org/bipbop/jquery-bipbop/dev-status.svg)](https://david-dm.org/bipbop/jquery-bipbop#info=devDependencies)  [![Gitter](https://badges.gitter.im/bipbop/jquery-bipbop.svg)](https://gitter.im/bipbop/jquery-bipbop) 

Library to make requests to BIPBOP simple again.


## TL-DR ##

```js
$.bipbop("SELECT FROM 'INFO'.'INFO'", undefined, {
  success: function (doc) {
    var jdoc = $(doc);
    if (jdoc.find('BPQL > header > query').text() != "SELECT FROM 'INFO'.'INFO'") {
      console.error('unexpected content');
    }
  }
});
```

## License
[MIT](https://opensource.org/licenses/MIT)
