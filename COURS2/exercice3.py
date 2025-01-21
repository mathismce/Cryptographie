from random import *

import math


def RSA_encrypt(pk, m):
    """
    Encrypts a message using RSA.

    Arguments:
    - pk (tuple) : The public key.
    - m (int) : The message to encrypt.

    Returns:
    - int : The encrypted message.
    """
    e = pk[0]
    n = pk[1]

    return pow(m, e, n)

RSA_encrypt((3, 33), 7)  # 7