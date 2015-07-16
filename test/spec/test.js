(function() {
    'use strict';

    describe('jquery.bipbop', function() {
        describe('bipbop', function() {
            this.timeout(3000);
            it('deprecated call', function(done) {
                $().bipbop("SELECT FROM 'INFO'.'INFO'", BIPBOP_FREE, {
                    success: function(doc) {
                        var jdoc = $(doc);
                        if (jdoc.find('BPQL > header > query').text() != "SELECT FROM 'INFO'.'INFO'")
                            throw 'unexpected content';
                        done();
                    }   
                });
            });
            it('simple call', function(done) {
                $.bipbop("SELECT FROM 'INFO'.'INFO'", BIPBOP_FREE, {
                    success: function(doc) {
                        var jdoc = $(doc);
                        if (jdoc.find('BPQL > header > query').text() != "SELECT FROM 'INFO'.'INFO'")
                            throw 'unexpected content';
                        done();
                    }
                });
            });
        });
    });
})();
