import { test } from 'tapzero'
import * as odd from '@oddjs/odd'
import { Program } from '@oddjs/odd'
import { components } from '@ssc-hermes/node-components'
import { create } from '../dist/index.js'
import { verify } from '@ssc-hermes/message'

let program:Program
test('setup', async t => {
    program = await odd.assemble({
        namespace: { creator: 'test', name: 'testing' },
        debug: false
    }, components)

    t.ok(program, 'create a program')
})

test('create an invitation', async t => {
    const { crypto } = program.components
    const inv = await create(crypto, 'alice', 'this is the comment')
    t.ok(inv.signature, 'should sign the new invitation')
    t.ok(inv.author.includes('did:key'), 'should include the signing DID')
    t.equal(inv.from, 'alice', 'should include the username')
    t.equal(inv.comment, 'this is the comment', "should create the 'comment' field")

    t.ok(await verify(inv), 'invitation should be valid')
})
