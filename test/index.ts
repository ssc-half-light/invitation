import { test } from 'tapzero'
import * as odd from '@oddjs/odd'
import { Program } from '@oddjs/odd'
import { components } from '@ssc-hermes/node-components'
import { create, verify, redeem, SignedInvitation } from '../dist/index.js'

let program:Program
test('setup', async t => {
    program = await odd.assemble({
        namespace: { creator: 'test', name: 'testing' },
        debug: false
    }, components)

    t.ok(program, 'create a program')
})

let invitation:SignedInvitation
test('create an invitation', async t => {
    const { crypto } = program.components
    const inv = await create(crypto, 'alice', 'this is the comment')
    invitation = inv
    t.ok(inv.signature, 'should sign the new invitation')
    t.ok(inv.author.includes('did:key'), 'should include the signing DID')
    t.equal(inv.from, 'alice', 'should include the username')
    t.equal(inv.comment, 'this is the comment', "should create the 'comment' field")

    t.ok(await verify(inv), 'invitation should be valid')
})

test('redeem an invitation', async t => {
    const program2 = await odd.assemble({
        namespace: { creator: 'test2', name: 'testing2' },
        debug: false
    }, components)

    t.ok(program2, 'create a program')

    const { crypto } = program2.components
    const redemption = await redeem(crypto, 'bob', invitation)
    t.ok(redemption, 'should return a "redemption" message')
    t.ok(redemption.invitation, 'should include the original invitation')
    t.ok(redemption.invitation.from, 'should include the username of the inviter')
})
