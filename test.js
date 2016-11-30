var itradeu = require('./server');
var expect = require('chai').expect;

process.env.NODE_ENV='test';
var item = require('./app/models/item');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server=require('./server');
chai.use(chaiHttp);
module.exports= server
if(!module.parent){
    app.listen(8080);
};
describe('Item', () => {
    beforeEach((done) => { //Before each test we empty the database
        Item.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET Item', () => {
      it('it should GET all the item', (done) => {
        chai.request(server)
            .get('/Item')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});

describe('iTradeU-name',function(){
    it('website name is iTradeU!',function(){
    expect(true).to.be.true;
    });
});
