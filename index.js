var FluxDispatcher = require('flux').Dispatcher;


var dispatcher = new FluxDispatcher();


dispatcher.handleAction = function handleAction (source, type, data) {

    if (arguments.length < 2 || arguments.length > 3) {
        var message = 'Expected two or three arguments.';
        throw new Error(message);
    }
    else if (arguments.length === 2) {
        data = type;
        type = source;
        source = undefined;
    }

    var payload = {
        action: {
            type: type,
            data: data
        }
    };

    if (source) {
        payload.source = source;
    }

    dispatcher.dispatch(payload);
};


module.exports = dispatcher;
