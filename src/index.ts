import type { Crypto } from '@oddjs/odd'
import { create as createMsg, SignedRequest } from '@ssc-hermes/message'
import { v4 as uuid } from 'uuid'

export { verify } from '@ssc-hermes/message'

export interface Invitation {
    from:string  // username
    comment:string|null
    code:string
}

export type SignedInvitation = SignedRequest<Invitation>

export type SignedDeleteRequest = SignedRequest<{ invitation: { code:string }}>

/**
 * Create an invitation. This will create and sign a message with the given crypto
 * keys and username passed in.
 * @param {Crypto.Implementation} crypto Fission crypto object
 * @param {string} username The username that created the invitation
 * @param {string} comment You can leave a note on the invitation
 * @returns {Promise<SignedInvitation>}
 */
export function create (
    crypto:Crypto.Implementation,
    username:string,
    comment?:string,
):Promise<SignedInvitation> {
    const code:string = uuid()

    return createMsg(crypto, {
        code,
        comment: comment ?? null,
        from: username
    })
}
