"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const R = require('ramda');
const fail = msg => ({ statusCode: 403, body: msg });
const checkAuthOfRole = db => (role, f) => (event, context) => __awaiter(this, void 0, void 0, function* () {
    const data = event.body;
    if (data['s']) {
        //pass
    }
    else {
        if (!data.authToken) {
            return fail('no auth');
        }
        else {
            // implement authToken later
            return fail('authToken not yet implemented');
        }
    }
    if (R.is(String, data.s) && data.s === data.s.toString()) {
        if (data.s.length < 20 || data.s.length > 50) {
            return fail('bad auth');
        }
    }
    else {
        return fail('bad s param');
    }
    const user = yield db.getUserFromS(data.s);
    if (user && user.s !== data.s) {
        return fail('auth failed');
    }
    if (role !== 'user') { // special role
        // check we have the role
        roles = yield db.getUserRoles(user._id);
        if (roles.includes(role)) {
            // then we are okay
        }
        else {
            return fail('insufficient permissions');
        }
    }
    return yield f(event, context, { user });
});
const auth = (db) => ({
    user: (f) => checkAuthOfRole(db)('user', f),
    role: checkAuthOfRole(db)
    // async (event, context) => {
    //     const data = event.body
    //     if (data['s']) {
    //         //pass
    //     } else {
    //         if (!data.authToken) {
    //             return fail('no auth')
    //         } else {
    //             // implement authToken later
    //             return fail('authToken not yet implemented')
    //         }
    //     }
    //     if (R.is(String, data.s) && data.s === data.s.toString()) {
    //         if (data.s.length < 20 || data.s.length > 50) {
    //             return fail('bad auth')
    //         }
    //     } else {
    //         return fail('bad s param')
    //     }
    //     const user = await db.getUserFromS(data.s)
    //     if (user && user.s === data.s) {
    //         return await f(event, context, {user});
    //     }
    //     // default if above fails
    //     return fail('auth failed')
    // },
});
module.exports = auth;
