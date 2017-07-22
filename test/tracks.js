//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Track = require('../app/models/track');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Tracks', () => {
    beforeEach((done) => { //Before each test we empty the database
        Track.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Test the /GET route
  */
  describe('/GET track', () => {
      it('it should GET all the tracks', (done) => {
        chai.request(server)
            .get('/track')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('json');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});