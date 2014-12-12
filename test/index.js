var Lab = require('lab');
var Code = require('code');
var Path = require('path');
var Dispatcher = require('../index');


var lab = exports.lab = Lab.script();


lab.experiment('Dispatcher', function () {

    lab.test('it is an object with a handleAction method', function (done) {

        Code.expect(Dispatcher).to.be.an.object();
        Code.expect(Dispatcher.handleAction).to.be.a.function();
        done();
    });


    lab.test('it throws when passing an incorrect number of arguments to handleAction', function (done) {

        var none = Dispatcher.handleAction.bind(Dispatcher);
        var one = Dispatcher.handleAction.bind(Dispatcher, null);
        var many = Dispatcher.handleAction.bind(Dispatcher, null, null, null, null);
        Code.expect(none).to.throw();
        Code.expect(one).to.throw();
        Code.expect(many).to.throw();
        done();
    });


    lab.test('it successfully dispatches with two arguments', function (done) {

        var id;
        var callback = function (payload) {

            if (payload.action.type === 'TWO_ARGS') {
                Code.expect(payload).to.be.an.object();
                Code.expect(payload.action).to.be.an.object();
                Code.expect(payload.action.data).to.equal('DATA2A');
                Dispatcher.unregister(id);
                done();
            }
        };
        id = Dispatcher.register(callback);

        var action = Dispatcher.handleAction.bind(Dispatcher, 'TWO_ARGS', 'DATA2A');
        Code.expect(action).to.not.throw();
    });


    lab.test('it successfully dispatches with three arguments', function (done) {

        var id;
        var callback = function (payload) {

            if (payload.action.type === 'THREE_ARGS') {
                Code.expect(payload).to.be.an.object();
                Code.expect(payload.source).to.equal('SOURCE');
                Code.expect(payload.action).to.be.an.object();
                Code.expect(payload.action.data).to.equal('DATA3A');
                Dispatcher.unregister(id);
                done();
            }
        };
        id = Dispatcher.register(callback);

        var action = Dispatcher.handleAction.bind(Dispatcher, 'SOURCE', 'THREE_ARGS', 'DATA3A');
        Code.expect(action).to.not.throw();
    });
});
