# Invitation ![tests](https://github.com/nichoth/template-ts/actions/workflows/nodejs.yml/badge.svg)

Create Invitations

## example
Create a new invitation document. The document includes a signature of the person who created it, and also a unique code.

```js
test('create an invitation', async t => {
    // program is odd.Program
    const { crypto } = program.components
    const inv = await create(crypto, 'alice')
    //  => {
    //     from: string;  // alice
    //     code: string;  // uuid
    //     signature: string;
    //     author: string;  // DID that matches the signature
    //  }

    t.ok(inv.signature, 'should sign the new invitation')
    t.ok(inv.author.includes('did:key'), 'should include the signing DID')
    t.equal(inv.from, 'alice', 'should include the username')
})
```
