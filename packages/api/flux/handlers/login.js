'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const R = require('ramda');
const db = {}; // we will populate this obj later via DB.init(db)
const utils = require('../utils');
const aws = require('aws-sdk');
const cognito = require('../aws/cognito');
const handlerUtils = require('./handlerUtils');
module.exports.checkEmail = (event, context) => __awaiter(this, void 0, void 0, function* () {
    return { error: 503 };
    const { email } = event;
    const p = Object.assign({}, cognito.common, { AttributesToGet: null });
    const r = yield cognito.identity.listUsers(p);
    console.log(r);
    return {};
});
// Last part of file - wrap all handlers to automatically JSON.stringify responses
module.exports = R.mapObjIndexed(handlerUtils.wrapHandler(db), module.exports);
