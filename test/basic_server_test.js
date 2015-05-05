"use strict";

var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var assert = require("chai").assert;

chai.use(chaiHttp);
require("../server"); // Starts the server.

describe("our server", function() {
  it("should send the current time of the server", function(done) {
    chai.request("localhost:3000")
      .get("/time")
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.not.eql(null);
        assert.typeOf(res.body.msg, "string");
        var date = new Date(res.body.msg);
        expect(Date.parse(date)).to.not.eql(NaN);
        done();
      });
  });

  it("should greet by name to a get request to /greet/name", function(done) {
    chai.request("localhost:3000")
      .get("/greet/Jenny")
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql("hello Jenny");
        done();
      });
  });

  it("should greet by name for post requests", function(done) {
    chai.request("localhost:3000")
      .post("/greet")
      .send({ name: "Stephanie" })
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql("hello Stephanie");
        done();
      });
  });

  // Page does not exist
  it("should have a 404 page", function(done) {
    chai.request("localhost:3000")
      .get("/somepagethatdoesnotexist")
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        expect(res.body.msg).to.eql("404: Page not found.");
        done();
      });
  });
});
