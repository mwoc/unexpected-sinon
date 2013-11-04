// Copyright (c) 2013 Sune Simonsen <sune@we-knowhow.dk>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the 'Software'), to deal in the Software without
// restriction, including without limitation the rights to use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
// BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('unexpected'), require('sinon'));
  } else if (typeof define === 'function' && define.amd) {
    define(['unexpected', 'sinon'], factory);
  } else {
    factory(root.weknowhow.expect, root.sinon);
  }
}(this, function (expect, sinon) {
    expect.addAssertion('was [not] called', function () {
        if (this.flags.not) {
            sinon.assert.notCalled(this.obj);
        } else {
            sinon.assert.called(this.obj);
        }
    });

    expect.addAssertion('was called once', function () {
        sinon.assert.calledOnce(this.obj);
    });

    expect.addAssertion('was called twice', function () {
        sinon.assert.calledTwice(this.obj);
    });

    expect.addAssertion('was called thrice', function () {
        sinon.assert.calledThrice(this.obj);
    });

    expect.addAssertion('was called times', function (times) {
        sinon.assert.callCount(this.obj, times);
    });

    expect.addAssertion('given call order', function () {
        sinon.assert.callOrder.apply(null, this.obj);
    });

    expect.addAssertion('was [always] called on', function (target) {
        if (this.flags.always) {
            sinon.assert.alwaysCalledOn(this.obj, target);
        } else {
            sinon.assert.calledOn(this.obj, target);
        }
    });

    expect.addAssertion('was [always] called with [exactly]', function () {
        var args = [this.obj].concat(Array.prototype.slice.call(arguments));
        if (this.flags.always && this.flags.exactly) {
            sinon.assert.alwaysCalledWithExactly.apply(null, args);
        } else if (this.flags.always) {
            sinon.assert.alwaysCalledWith.apply(null, args);
        } else if (this.flags.exactly) {
            sinon.assert.calledWithExactly.apply(null, args);
        } else {
            sinon.assert.calledWith.apply(null, args);
        }
    });

    expect.addAssertion('was never called with', function () {
        var args = [this.obj].concat(Array.prototype.slice.call(arguments));
        sinon.assert.neverCalledWith.apply(null, args);
    });

    expect.addAssertion('[always] threw', function (value) {
        if (this.flags.always) {
            sinon.assert.alwaysThrew(this.obj, value);
        } else {
            sinon.assert.threw(this.obj, value);
        }
    });

    return expect;
}));
