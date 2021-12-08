# jquery-bipbop@1.1.2
 [![npm version](https://badge.fury.io/js/bipbop.svg)](https://npmjs.org/package/bipbop)

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
