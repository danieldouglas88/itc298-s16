var expect = require("chai").expect;
var book = require("../lib/book");

describe('book.get', () => {
 it("get returns requested book", function() {
   var result = book.get("dune");
   expect(result).to.deep.equal({title: "dune", author:"frank herbert", pubdate:1969});
 });
 it("get fails w/ invalid book", () => {
   var result = book.get("fake");
   expect(result).to.be.undefined;
 });
 });
     
    describe('book.del', () => {
 it("deletes dune title", function() {
   var result = book.del("dune");
   expect(result).to.not.equal({title: "dune", author:"frank herbert", pubdate:1969});
 });
 it('tries to find dune but fails', () => {
   var result = book.get("dune");
   expect(result).to.not.equal({title: "dune", author:"frank herbert", pubdate:1969});
 });
});

    describe('book.create', () => {
 it("creates and finds Terminator Title and related info", function() {
   var result = book.create("Terminator", "Author 35", 1988);
   expect(result).to.deep.equal({title: "Terminator", author:"Author 35", pubdate:1988});
 });
 it('tries to see if exact object is in array by seeing if it equals its lowercase self', () => {
   var result = book.get("Terminator");
   expect(result).to.not.deep.equal({title: "terminator", author:"author 35", pubdate:1988});
 });
});