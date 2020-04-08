# ![BIPBOP](https://bipbop.com.br/static/images/favicon.png) jquery-bipbop@1.1.2
 [![npm version](https://badge.fury.io/js/bipbop.svg)](https://npmjs.org/package/bipbop) [![dependency status](https://david-dm.org/bipbop/jquery-bipbop.svg?theme=shields.io)](https://david-dm.org/bipbop/jquery-bipbop) [![devDependency status](https://david-dm.org/bipbop/jquery-bipbop/dev-status.svg)](https://david-dm.org/bipbop/jquery-bipbop#info=devDependencies) 

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
