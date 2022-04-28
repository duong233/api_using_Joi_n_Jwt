const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../index");
const db = require("../../../config/db");
let should = chai.should();

const example = require("./data");
const { StatusCodes } = require("http-status-codes");
chai.use(chaiHttp);

let token;

describe("User", () => {
  describe("register success", () => {
    it("It should be saved into database", (done) => {
      chai
        .request(app)
        .post("/register")
        .send(example.userSchema)
        .end((err, res) => {
          res.should.have.status(StatusCodes.OK);
          done();
        });
    });
  });
  describe("register invalid", () => {
    it("invalid register", (done) => {
      chai
        .request(app)
        .post("/register")
        .send(example.userPassInvalid)
        .end((err, res) => {
          res.should.have.status(StatusCodes.BAD_REQUEST);
          done();
        });
    });
  });
  describe("Login success /login", () => {
    it("It should return a token", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(example.user)
        .end((err, res) => {
          res.should.have.status(StatusCodes.OK);
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
          res.should.have.status(StatusCodes.BAD_REQUEST);
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
          res.should.have.status(StatusCodes.OK);
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
          res.should.have.status(StatusCodes.BAD_REQUEST);
          done();
        });
    });
  });
});
