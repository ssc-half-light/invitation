# Invitation ![tests](https://github.com/nichoth/template-ts/actions/workflows/nodejs.yml/badge.svg)

Create Invitations

This does not handle persistence, only in-memory objects.

## example
Create a new invitation document. The document includes a signature of the person who created it, and also a unique code.

```js
import { test } from 'tapzero'
import { create } from '@ssc-hermes/invitation'
import { verify } from '@ssc-hermes/message'

test('create an invitation', async t => {
    // program is odd.Program
    const { crypto } = program.components
    const inv = await create(crypto, 'alice', 'this is the comment')
    //  => {
    //     from: string;  // alice
    //     code: string;  // uuid
    //     comment: string|null
    //     signature: string;
    //     author: string;  // DID that matches the signature
    //  }

    t.ok(inv.signature, 'should sign the new invitation')
    t.ok(inv.author.includes('did:key'), 'should include the signing DID')
    t.equal(inv.from, 'alice', 'should include the username')
    t.equal(inv.comment, 'this is the comment', "should create the 'comment' field")
    t.ok(await verify(inv), 'invitation should be valid')
})
```
