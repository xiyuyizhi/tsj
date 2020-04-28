import chai = require('chai');
const { sum } = require("../src/index");
chai.should();


describe('#Test', function () {
    it('test sum', function () {
        sum(1, 2).should.be.equal(3);
    });
});
