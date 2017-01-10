var sdkVersion = require('../package').version,
    clientId,
    clientSecret,
    accessToken,
    refreshToken,
    schema = 'https',
    host = 'api.mercadopago.com',
    userAgent = 'MercadoPago Node.js SDK v' + sdkVersion + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + ')';

var configurationsModule = module.exports = {
    'sandbox': false
};

/**
 * Set up configurations globally.
 * Do not allow override the client_id and the client_secret
 * @param {object} configurations
 */
configurationsModule.configure = function(configurations){
    if( configurations === undefined || typeof configurations != 'object' ){
        throw new Error('You must provide an Object with the configurations');
    }

    if( configurations.client_id === undefined && configurations.client_secret === undefined && configurations.access_token === undefined ){
        throw new Error('You must provide a method of authentication (client_id & client_secret or access_token)');
    }

    if( configurations.client_id !== undefined && configurations.client_secret === undefined
        || configurations.client_id === undefined && configurations.client_secret !== undefined ){
        throw new Error('You must provide client_id and client_secret');
    }

    if(configurations.client_id !== undefined && configurations.client_secret !== undefined
        && (clientId !== undefined || clientSecret !== undefined) ){
        throw new Error('Cant change client_id or client_secret because is already set');
    }

    clientId = clientId || configurations.client_id;
    clientSecret = clientSecret || configurations.client_secret;

    //Set accessToken
    accessToken =  configurations.access_token || accessToken;
    //Use if to prevent false value
    this.sandbox = (configurations.sandbox !== undefined) ? configurations.sandbox : this.sandbox;
};

/**
 * Get clientId
 * @returns {string}
 */
configurationsModule.getClientId = function(){
    return clientId;
};

/**
 * Get clientSecret
 * @returns {string}
 */
configurationsModule.getClientSecret = function(){
    return clientSecret;
};

/**
 * Set accessToken
 * @param {string} token
 */
configurationsModule.setAccessToken = function(token){
    accessToken = token;
    return this;
};

/**
 * Get accessToken
 * @returns {string}
 */
configurationsModule.getAccessToken = function(){
    return accessToken;
};

/**
 * Set refreshToken
 * @param token
 */
configurationsModule.setRefreshToken = function(token){
    refreshToken = token;
    return this;
};

/**
 * Get refreshToken
 * @returns {*}
 */
configurationsModule.getRefreshToken = function(){
    return refreshToken;
};

/**
 * Get base URL to execute rest operations
 * @returns {string}
 */
configurationsModule.getBaseUrl = function(){
    return schema + '://' + host;
};

/**
 * Get userAgent
 * @returns {string}
 */
configurationsModule.getUserAgent = function(){
    return userAgent;
};