'use strict';

const Lab = require('lab');
const Code = require('code');
const Dispatcher = require('../index');


const lab = exports.lab = Lab.script();


lab.experiment('Dispatcher', () => {

    lab.test('it is an object with a handleAction method', (done) => {

        Code.expect(Dispatcher).to.be.an.object();
        Code.expect(Dispatcher.handleAction).to.be.a.function();
        done();
    });


    lab.test('it throws when passing an incorrect number of arguments to handleAction', (done) => {

        const none = Dispatcher.handleAction.bind(Dispatcher);
        const one = Dispatcher.handleAction.bind(Dispatcher, null);
        const many = Dispatcher.handleAction.bind(Dispatcher, null, null, null, null);
        Code.expect(none).to.throw();
        Code.expect(one).to.throw();
        Code.expect(many).to.throw();
        done();
    });


    lab.test('it successfully dispatches with two arguments', (done) => {

        const callback = (payload) => {

            if (payload.action.type === 'TWO_ARGS') {
                Code.expect(payload).to.be.an.object();
                Code.expect(payload.action).to.be.an.object();
                Code.expect(payload.action.data).to.equal('DATA2A');
                Dispatcher.unregister(id);
                done();
            }
        };
        const id = Dispatcher.register(callback);

        const action = Dispatcher.handleAction.bind(Dispatcher, 'TWO_ARGS', 'DATA2A');
        Code.expect(action).to.not.throw();
    });


    lab.test('it successfully dispatches with three arguments', (done) => {

        const callback = function (payload) {

            if (payload.action.type === 'THREE_ARGS') {
                Code.expect(payload).to.be.an.object();
                Code.expect(payload.source).to.equal('SOURCE');
                Code.expect(payload.action).to.be.an.object();
                Code.expect(payload.action.data).to.equal('DATA3A');
                Dispatcher.unregister(id);
                done();
            }
        };
        const id = Dispatcher.register(callback);

        const action = Dispatcher.handleAction.bind(Dispatcher, 'SOURCE', 'THREE_ARGS', 'DATA3A');
        Code.expect(action).to.not.throw();
    });
});
