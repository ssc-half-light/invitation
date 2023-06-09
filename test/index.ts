import { test } from 'tapzero'
import * as odd from '@oddjs/odd'
import { Program } from '@oddjs/odd'
import { create } from '../dist/index.js'
import { components } from '@ssc-hermes/node-components'

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
    const inv = await create(crypto, 'alice')
    t.ok(inv.signature, 'should sign the new invitation')
    t.ok(inv.author.includes('did:key'), 'should include the signing DID')
    t.equal(inv.from, 'alice', 'should include the username')
})
