const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../index");
const db = require("../../../config/db");
let should = chai.should();

const example = require("./data");
chai.use(chaiHttp);

let token;

describe("User", () => {
  describe("Login success /login", () => {
    it("It should return a token", (done) => {
      chai
        .request(app)
        .post('/login') 
        .send(example.user)
        .end((err, res) => {
          res.should.have.status(200);
          token = res.text;
          done();
        });
    });
  });
  describe("Login fail /login", () => {
    it("It should be return an error", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(example.invalidUser)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe("Get all users /user", () => {
    it("It should return list of users", (done) => {
      chai
        .request(app)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  describe("get all users fail /user", () => {
    it("It should return user not found", (done) => {
      chai
        .request(app)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
