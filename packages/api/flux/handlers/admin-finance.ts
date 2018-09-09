'use strict';
const handlerUtils = require('./handlerUtils')

import { DB, Qs } from '../db';
import { DBV1, ThenArg } from 'flux-lib/types';
import { SortMethod, DonationsResp } from 'flux-lib/types/db'
import { GetArbitraryPartial } from 'flux-lib/types/db';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import { DonationRT, Donation } from 'flux-lib/types/db/index';
import { EitherResp, ER } from 'flux-lib/types/index';
import { randomBytes } from 'crypto';

const R = require('ramda')

const utils = require('../utils')

const { Roles } = require('../roles')

module.exports.getDonations = (db, ...args) => {
    return require('./auth')(db).role(Roles.FINANCE, async (event, context, {user}): Promise<DonationsResp> => {
        const data = event.body as GetArbitraryPartial<Donation>;
        const pageN = data.pageN || 0;
        const limit = data.limit || 10;
        const sm = data.sortMethod || SortMethod.TS
        const query = data.query || {}
        const totalDonations = await db.getDonationsN()
        const toReturn: DonationsResp = {
            donations: await db.getDonations(pageN, limit, sm, query),
            sortMethod: sm,
            ...utils.genPagination(totalDonations, limit, pageN)
        }
        return toReturn
    })(...args)
}


module.exports.addNewDonation = (db, ...args) => {
    return require('./auth')(db).role(Roles.FINANCE, async (event, context, {user}): Promise<ER<boolean>> => {
        const {doc} = event.body
        doc.id = randomBytes(6).toString('hex')
        ThrowReporter.report(DonationRT.decode(doc))
        await db.addToQueue(Qs.Q_RECEIPTS, doc)
        return { right: true }
    })(...args)
}


// Last part of file - wrap all handlers to automatically JSON.stringify responses
module.exports = R.mapObjIndexed(handlerUtils.wrapHandler, module.exports);