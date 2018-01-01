const expect = require('chai').expect,
    api = require('../api');
describe('api', () => {
    it('should add key `size` and its value as `JSON.stringify(object).length` to all objects in an array', function () {
        let testObj = [{
            name: 'Shivam',
            age: 28
        }, {
            name: 'Bharat',
            age: 27
        }];
        let results = api.addKeyValue(testObj),
            i = 0,
            l = results.length;

        for (; i < l; i++) {
            expect(results[i]).to.have.own.property('size');
        }
        // expect(results).to.be.an('array');
    })
    it('should read json', function (done) {
        api.readFile('./data/test.json', done);
    });
    /* 
        it('should write json', () => {

        })
        it('should write yaml', () => {

        }); */
})