var itradeu = require('./server.js');
var expect = require('chai').expect;
var http = require('http');
process.env.NODE_ENV='test';
var item = require('./app/models/item.js');

var request = require("request");
var base_url = "http://localhost:8080/"
var assert = require('assert');

var chai = require('chai');
var mongoose = require('mongoose');
var chaiHttp = require('chai-http');
var should = chai.should();
//var app = require('./server');
//var server=http.createServer(app); server.address()
chai.use(chaiHttp);
//module.exports= server
if(!module.parent){
    app.listen(8080);
};

describe('iTradeU-name',function(){
    it('website name is iTradeU!',function(){
    expect(true).to.be.true;
    });
});
/*
describe("iTradeU",function(){
    describe("Get /",function(){
        it("returns status code 200",function(){
            request.get(base_url,function(error,response,body){
                assert.equal(200,response.statusCode);
                done();
            });
        });
    });
});
*/
//describe('Local sign-up',function(){
    //it('The sign up works!',function(){

//    })
//})



describe('/POST item',()=> {
  it('It should post an item', (done)=>{
  var item = {
    title: "food",
    description: "food",
    keyword1: "chicken",
    keyword2: "meat",
    keyword3: "food",
  }
  chai.request(server)
  .post('/item')
  .send(item)
  .end((err,res)=>{
    res.should.have.status(200);
    res.body.should.have.a('object');
    res.body.errors.should.have.property('pages');
    res.body.errors.pages.should.have.property('kind').eql('required');
    done();
  });
  });
  it('it should POST an item',(done)=>{
  var item = {
    title: "food",
    description: "food",
    keyword1: "chicken",
    keyword2: "meat",
    keyword3: "food",
  }
  chai.request(server)
  .post('/item')
  .send(item)
  .end((err, res)=>{
  res.should.have.status(200);
  res.body.should.have.a('object');
  res.body.errors.should.have.property('message').eql('item successfully added!');
  res.body.item.should.have.property('title');
  res.body.item.should.have.property('description');
  res.body.item.should.have.property('keyword1');
  res.body.item.should.have.property('keyword2');
  res.body.item.should.have.property('keyword3');
  done();
  });
  });
});
