function test(){
  "use strict";
  let a = 1;
}

process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let item = require('../app/models/item');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST item',()=> {
  it('It should post an item', (done)=>{
  let item = {
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
  let item = {
    title: "food",
    description: "food",
    keyword1: "chicken",
    keyword2: "meat",
    keyword3: "food",
  }
  chai.request(sever)
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
