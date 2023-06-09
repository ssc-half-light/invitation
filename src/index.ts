import type { Crypto } from '@oddjs/odd'
import { create as createMsg, SignedRequest } from '@ssc-hermes/message'
import { v4 as uuid } from 'uuid'

export interface Invitation {
    from:string  // username
    code:string
}

export type SignedInvitation = SignedRequest<Invitation>

/**
 * Create an invitation. This will create and sign a message with the given crypto
 * keys and username passed in.
 * @param {Crypto.Implementation} crypto Fission crypto object
 * @param {string} username The username that created the invitation
 * @returns {Promise<SignedInvitation>}
 */
export function create (
    crypto:Crypto.Implementation,
    username:string
):Promise<SignedInvitation> {
    const code = uuid()
    return createMsg(crypto, { code, from: username })
}
