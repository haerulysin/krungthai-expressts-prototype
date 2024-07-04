/* eslint-disable */
// @ts-nocheck
//******************************************************************
// AM E2EEA js
// depends on am crypto js
// By i-Sprint
// Updated on 20130614
//******************************************************************

// ******************************************************************
// Functions used for AccessMatrix end-to-end encryption for authentication
// ******************************************************************

// Encrypt password for verification and reset password
// ame2eea.encryptPinForAM(e2eeSid, publicKey, randomNumber, pin, oaepHashAlgo);
//   - e2eeSid is E2EE session id returned by AccessMatrix pre-authentication
//   - publicKey is public key "<modulus>,<exponent>" returned by AccessMatrix pre-authentication
//   - randomNumber is server random returned by AccessMatrix pre-authentication
//   - pin is the user password
//   - oaepHashAlgo is hashing/digest algorithm used as part of the OAEP encoding
//     (must follow login module's hash algorithm configuration)
//     -- SHA-1 (default), SHA-224, SHA-256, SHA-384, SHA-512
// Return: (used as password of authenticate/login/reset password method)

// Encrypt password for change password
// ame2eea.encryptChangePinForAM(e2eeSid, publicKey, randomNumber, oldPin, newPin, oaepHashAlgo);
//   - e2eeSid is E2EE session id returned by AccessMatrix pre-authentication
//   - publicKey is public key (<modulus>,<exponent>) returned by AccessMatrix pre-authentication
//   - randomNumber is server random returned by AccessMatrix pre-authentication
//   - oldPin is the user current password
//   - newPin is the user new password
//   - oaepHashAlgo is hashing/digest algorithm used as part of the OAEP encoding
//     (must follow login module's hash algorithm configuration)
//     -- SHA-1 (default), SHA-224, SHA-256, SHA-384, SHA-512
// Return: (used as new password of change password method. Leave old password empty)

// ******************************************************************
// Functions used for Safenet PHEFT E2EE (without AccessMatrix)
// ******************************************************************

// Encrypt password for verification and reset password
// ame2eea.encryptPin(publicKey, randomNumber, pin, oaepHashAlgo);
//   - publicKey is public key "<modulus>,<exponent>"
//   - randomNumber is server random
//   - pin is the user password
//   - oaepHashAlgo is hashing/digest algorithm used as part of the OAEP encoding
//     (must follow HSM's AlgoId)
//     -- SHA-1 (default), SHA-224, SHA-256, SHA-384, SHA-512

// Encrypt password for change password
// ame2eea.encryptChangePin(publicKey, randomNumber, oldPin, newPin, oaepHashAlgo);
//   - publicKey is public key "<modulus>,<exponent>"
//   - randomNumber is server random
//   - oldPin is the user current password
//   - newPin is the user new password
//   - oaepHashAlgo is hashing/digest algorithm used as part of the OAEP encoding
//     (must follow login module's hash algorithm configuration)
//     -- SHA-1 (default), SHA-224, SHA-256, SHA-384, SHA-512

//******************************************************************
// AM crypto js
// By i-Sprint
// Updated on 20141030
//******************************************************************

//******************************************************************
// RSA, BigInteger, and RNG
//******************************************************************
/*
 * Copyright (c) 2003-2005  Tom Wu
 * All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
 *
 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * In addition, the following condition applies:
 *
 * All redistributions must retain an intact copy of this copyright notice
 * and disclaimer.
 */

//******************************************************************
// AES
//******************************************************************
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES implementation in JavaScript (c) Chris Veness 2005-2011                                   */
/*   - http://www.movable-type.co.uk/scripts/aes.html                                             */
/*   - License under Creative Commons 3.0 (CC By 3.0) http://creativecommons.org/licenses/by/3.0/ */
/*   - see http://csrc.nist.gov/publications/PubsFIPS.html#197                                    */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

//******************************************************************
// SHA and HMAC
//******************************************************************
/**
 * @preserve A JavaScript implementation of the SHA family of hashes, as defined in FIPS
 * PUB 180-2 as well as the corresponding HMAC implementation as defined in
 * FIPS PUB 198a
 *
 * Copyright Brian Turek 2008-2012
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Several functions taken from Paul Johnson
 */

//******************************************************************
// Base64 encoder
//******************************************************************
// The code is part of Closure Library API
// http://stackoverflow.com/questions/15149997/read-and-base64-encode-a-binary-file
// http://docs.closure-library.googlecode.com/git/closure_goog_crypt_base64.js.html

// Copyright 2007 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// @ts-nocheck
var window = {"jsSHA": null};
var navigator = {appName:""};
export let ame2eea = {
    encryptPinForAM : function (_14, _15, _16, pin, _17) {
        var _18 = ame2eea.encryptPin(_15, _16, pin, _17);
        return ame2eea.formatEncryptionResult(_14, _18, '');
      }
};
ame2eea.encryptPin = function (_1, _2, _3, _4) {
  _4 = ame2eea._hashStandard(_4);
  var _5 = _1.split(',', 2);
  var _6 = ame2eea._formatPINMessage(_3, _2);
  var _7 = _6;
  var _8;
  try {
    _8 = amRsa.oaep.encryptAndGenLabel(_5[0], _5[1], _7, _4);
    var _9 = _8.split(':', 2);
    return _8;
  } catch (err) {
    ame2eea.log('Exception when encrypting using RSA-OAEP, msg=' + err);
    throw err;
  }
};
ame2eea.encryptChangePin = function (_a, _b, _c, _d, _e) {
  _e = ame2eea._hashStandard(_e);
  var _f = _a.split(',', 2);
  var _10 = ame2eea._formatResetPINMessage(_c, _d, _b);
  var _11 = _10;
  var _12;
  try {
    _12 = amRsa.oaep.encryptAndGenLabel(_f[0], _f[1], _11, _e);
    var _13 = _12.split(':', 2);
    return _12;
  } catch (err) {
    ame2eea.log('Exception when encrypting using RSA-OAEP, msg=' + err);
    throw err;
  }
};
ame2eea.encryptChangePinForAM = function (_19, _1a, _1b, _1c, _1d, _1e) {
  var _1f = ame2eea.encryptPin(_1a, _1b, _1d, _1e);
  var _20 = ame2eea.encryptChangePin(_1a, _1b, _1c, _1d, _1e);
  return ame2eea.formatEncryptionResult(_19, _1f, _20);
};
ame2eea._hashStandard = function (_21) {
  if (typeof _21 == 'undefined' || _21 == '' || _21 == null) {
    return 'SHA-1';
  } else {
    if (_21 == 'SHA1') {
      return 'SHA-1';
    } else {
      if (_21 == 'SHA2-224' || _21 == 'SHA224') {
        return 'SHA-224';
      } else {
        if (_21 == 'SHA2-256' || _21 == 'SHA256') {
          return 'SHA-256';
        } else {
          if (_21 == 'SHA2-384' || _21 == 'SHA384') {
            return 'SHA-384';
          } else {
            if (_21 == 'SHA2-512' || _21 == 'SHA512') {
              return 'SHA-512';
            }
          }
        }
      }
    }
  }
  return _21;
};
ame2eea._formatPINMessage = function (pin, _22) {
  var _23 = [];
  var _24 = 0;
  _23[0] = 1 & 255;
  _24++;
  var _25 = amUtil.str2bin(pin);
  var _26 = ame2eea._createPINBlock(_25);
  var _27 = amUtil.hexDecode(_22);
  return _23.concat(_26, _27);
};
ame2eea._formatResetPINMessage = function (_28, _29, _2a) {
  var _2b = [];
  var _2c = 0;
  _2b[0] = 2 & 255;
  _2c++;
  var _2d = amUtil.str2bin(_28);
  var _2e = amUtil.str2bin(_29);
  var _2f = ame2eea._createPINBlock(_2d);
  var _30 = ame2eea._createPINBlock(_2e);
  var _31 = amUtil.hexDecode(_2a);
  return _2b.concat(_2f, _30, _31);
};
ame2eea._createPINBlock = function (pin) {
  var _32 = [];
  var _33 = 0;
  _32[0] = 193 & 255;
  _33++;
  _32[1] = pin.length & 255;
  _33++;
  for (var i = 0; i < pin.length; i++, _33++) {
    _32[_33] = pin[i];
  }
  while (_33 % 8) {
    _32[_33] = 255;
    _33++;
  }
  return _32;
};
ame2eea.formatEncryptionResult = function (_34, _35, _36) {
  var _37 = _34 + ',' + _35;
  if (_36.length > 0) {
    _37 = _37 + ',' + _36;
  }
  return _37;
};
ame2eea.log = function (log) {
  try {
    document.testform.debug.value = document.testform.debug.value + log + '\n';
  } catch (err) {}
};
var amHash = {};
amHash.encodeSHA1 = function (_38) {
  return amHash.sha1(_38);
};
amHash.sha1 = function (_39) {
  return amUtil.hexDecode(new jsSHA(amUtil.hexEncode(_39), 'HEX').getHash('SHA-1', 'HEX'));
};
amHash.sha224 = function (_3a) {
  return amUtil.hexDecode(new jsSHA(amUtil.hexEncode(_3a), 'HEX').getHash('SHA-224', 'HEX'));
};
amHash.sha256 = function (_3b) {
    return amUtil.hexDecode(new window["jsSHA"](amUtil.hexEncode(_3b), 'HEX').getHash('SHA-256', 'HEX'));
};
amHash.sha384 = function (_3c) {
  return amUtil.hexDecode(new jsSHA(amUtil.hexEncode(_3c), 'HEX').getHash('SHA-384', 'HEX'));
};
amHash.sha512 = function (_3d) {
  return amUtil.hexDecode(new jsSHA(amUtil.hexEncode(_3d), 'HEX').getHash('SHA-512', 'HEX'));
};
var amRsa = {};
amRsa.RSAKey = function () {
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
};
amRsa.RSASetPublic = function (N, E) {
  if (N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = amUtil.parseBigInt(N, 16);
    this.e = parseInt(E, 16);
  } else {
    throw 'Invalid RSA public key';
  }
};
amRsa.RSADoPublic = function (x) {
  var y = x.modPowInt(this.e, this.n);
  return y;
};
amRsa.RSAEncrypt = function (m) {
  if (m == null) {
    return null;
  }
  var c = this.doPublic(m);
  if (c == null) {
    return null;
  }
  var h = c.toString(16);
  if ((h.length & 1) == 0) {
    return h;
  } else {
    return '0' + h;
  }
};
amRsa.RSAKey.prototype.doPublic = amRsa.RSADoPublic;
amRsa.RSAKey.prototype.setPublic = amRsa.RSASetPublic;
amRsa.RSAKey.prototype.encrypt = amRsa.RSAEncrypt;
amRsa.oaepEncode = function (_3e, _3f, _40, _41) {
  var _42;
  var _43;
  if (_41 == 'SHA-1') {
    _42 = 20;
    _43 = amHash.sha1;
  } else {
    if (_41 == 'SHA-224') {
      _42 = 28;
      _43 = amHash.sha224;
    } else {
      if (_41 == 'SHA-256') {
        _42 = 32;
        _43 = amHash.sha256;
      } else {
        if (_41 == 'SHA-384') {
          _42 = 48;
          _43 = amHash.sha384;
        } else {
          if (_41 == 'SHA-512') {
            _42 = 64;
            _43 = amHash.sha512;
          } else {
            throw 'OAEP: HASH algorithm is not recognized, hashAlgo=' + _41;
          }
        }
      }
    }
  }
  var _44 = _40.length;
  if (_44 > _3e - 2 * _42 - 2) {
    throw 'The message to be encrypted is too long';
  }
  var _45 = [];
  var _46 = _3e - _44 - 2 * _42 - 2;
  for (var i = 0; i < _46; i++) {
    _45[i] = 0;
  }
  var _47 = _43(_3f);
  var _48 = [];
  _48 = _48.concat(_47, _45, 1, _40);
  var _49 = amUtil.generateRandom(_42);
  var _4a = amRsa._MGF1(_49, _3e - _42 - 1, _41);
  var _4b = amUtil.xor(_48, _4a);
  var _4c = amRsa._MGF1(_4b, _42, _41);
  var _4d = amUtil.xor(_49, _4c);
  var _4e = [0].concat(_4d, _4b);
  return _4e;
};
amRsa._MGF1 = function (Z, l, _4f) {
  var cnt = [];
  var _50 = [];
  var _51 = [];
  var _52 = 0;
  var _53;
  if (_4f == 'SHA-1') {
    _53 = amHash.sha1;
  } else {
    if (_4f == 'SHA-224') {
      _53 = amHash.sha224;
    } else {
      if (_4f == 'SHA-256') {
        _53 = amHash.sha256;
      } else {
        if (_4f == 'SHA-384') {
          _53 = amHash.sha384;
        } else {
          if (_4f == 'SHA-512') {
            _53 = amHash.sha512;
          } else {
            throw 'MGF: HASH algorithm is not recognized, hashAlgo=' + _4f;
          }
        }
      }
    }
  }
  for (var i = 0; _52 < l; i++) {
    cnt[0] = (i >> 24) & 255;
    cnt[1] = (i >> 16) & 255;
    cnt[2] = (i >> 8) & 255;
    cnt[3] = i & 255;
    var _54 = Z.concat(cnt);
    _51 = _53(_54);
    for (var j = 0; j < _51.length && _52 < l; j++, _52++) {
      _50[_52] = _51[j];
    }
  }
  return _50;
};
amRsa.oaep = {};
amRsa.oaep.encryptAndGenLabel = function (_55, _56, _57, _58) {
  var _59 = 16;
  var _5a = new Array(_59);
  var rnd = new amUtil.SecureRandom();
  rnd.nextBytes(_5a);
  var sLabel;
  sLabel = amUtil.hexEncode(_5a);
  sLabel = amUtil.zeroPad(sLabel, _59 * 2);
  var _5b = amRsa.oaep.encrypt(_55, _56, _5a, _57, _58);
  return sLabel + ':' + _5b;
};
amRsa.oaep.encrypt = function (_5c, _5d, _5e, _5f, _60) {
  var _61 = new amRsa.RSAKey();
  _61.setPublic(_5c, _5d);
  var _62 = amRsa.oaepEncode(_5c.length / 2, _5e, _5f, _60);
  var _63 = _61.encrypt(new BigInteger(_62));
  _63 = amUtil.zeroPad(_63, _5c.length);
  return _63.toUpperCase();
};
amRsa.pkcs1 = {};
amRsa.pkcs1.encrypt = function (_64, _65, _66) {
  var _67 = new amRsa.RSAKey();
  _67.setPublic(_64, _65);
  var _68 = amRsa.pkcs1pad2(_66, _64.length / 2);
  var _69 = _67.encrypt(new BigInteger(_68));
  _69 = amUtil.zeroPad(_69, _64.length);
  return _69.toUpperCase();
};
amRsa.pkcs1pad2 = function (_6a, _6b) {
  if (_6b < _6a.length + 11) {
    throw 'Message too long for RSA';
  }
  var _6c = new Array(2);
  _6c[0] = 0 & 255;
  _6c[1] = 2 & 255;
  var _6d = _6b - _6a.length - 2;
  var _6e = new Array(_6d);
  var rng = new amUtil.SecureRandom();
  var x = new Array();
  for (var i = 0; i < _6d - 1; i++) {
    x[0] = 0;
    while (x[0] == 0) {
      rng.nextBytes(x);
    }
    _6e[i] = x[0];
  }
  _6e[_6d - 1] = 0 & 255;
  _6c = _6c.concat(_6e, _6a);
  return _6c;
};
var amAes = {};
amAes.cipher = function (_6f, w) {
  var Nb = 4;
  var Nr = w.length / Nb - 1;
  var _70 = [[], [], [], []];
  for (var i = 0; i < 4 * Nb; i++) {
    _70[i % 4][Math.floor(i / 4)] = _6f[i];
  }
  _70 = amAes.addRoundKey(_70, w, 0, Nb);
  for (var _71 = 1; _71 < Nr; _71++) {
    _70 = amAes.subBytes(_70, Nb);
    _70 = amAes.shiftRows(_70, Nb);
    _70 = amAes.mixColumns(_70, Nb);
    _70 = amAes.addRoundKey(_70, w, _71, Nb);
  }
  _70 = amAes.subBytes(_70, Nb);
  _70 = amAes.shiftRows(_70, Nb);
  _70 = amAes.addRoundKey(_70, w, Nr, Nb);
  var _72 = new Array(4 * Nb);
  for (var i = 0; i < 4 * Nb; i++) {
    _72[i] = _70[i % 4][Math.floor(i / 4)];
  }
  return _72;
};
amAes.keyExpansion = function (key) {
  var Nb = 4;
  var Nk = key.length / 4;
  var Nr = Nk + 6;
  var w = new Array(Nb * (Nr + 1));
  var _73 = new Array(4);
  for (var i = 0; i < Nk; i++) {
    var r = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
    w[i] = r;
  }
  for (var i = Nk; i < Nb * (Nr + 1); i++) {
    w[i] = new Array(4);
    for (var t = 0; t < 4; t++) {
      _73[t] = w[i - 1][t];
    }
    if (i % Nk == 0) {
      _73 = amAes.subWord(amAes.rotWord(_73));
      for (var t = 0; t < 4; t++) {
        _73[t] ^= amAes.rCon[i / Nk][t];
      }
    } else {
      if (Nk > 6 && i % Nk == 4) {
        _73 = amAes.subWord(_73);
      }
    }
    for (var t = 0; t < 4; t++) {
      w[i][t] = w[i - Nk][t] ^ _73[t];
    }
  }
  return w;
};
amAes.subBytes = function (s, Nb) {
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < Nb; c++) {
      s[r][c] = amAes.sBox[s[r][c]];
    }
  }
  return s;
};
amAes.shiftRows = function (s, Nb) {
  var t = new Array(4);
  for (var r = 1; r < 4; r++) {
    for (var c = 0; c < 4; c++) {
      t[c] = s[r][(c + r) % Nb];
    }
    for (var c = 0; c < 4; c++) {
      s[r][c] = t[c];
    }
  }
  return s;
};
amAes.mixColumns = function (s, Nb) {
  for (var c = 0; c < 4; c++) {
    var a = new Array(4);
    var b = new Array(4);
    for (var i = 0; i < 4; i++) {
      a[i] = s[i][c];
      b[i] = s[i][c] & 128 ? (s[i][c] << 1) ^ 283 : s[i][c] << 1;
    }
    s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3];
    s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3];
    s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3];
    s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3];
  }
  return s;
};
amAes.addRoundKey = function (_74, w, rnd, Nb) {
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < Nb; c++) {
      _74[r][c] ^= w[rnd * 4 + c][r];
    }
  }
  return _74;
};
amAes.subWord = function (w) {
  for (var i = 0; i < 4; i++) {
    w[i] = amAes.sBox[w[i]];
  }
  return w;
};
amAes.rotWord = function (w) {
  var tmp = w[0];
  for (var i = 0; i < 3; i++) {
    w[i] = w[i + 1];
  }
  w[3] = tmp;
  return w;
};
amAes.sBox = [
  99,
  124,
  119,
  123,
  242,
  107,
  111,
  197,
  48,
  1,
  103,
  43,
  254,
  215,
  171,
  118,
  202,
  130,
  201,
  125,
  250,
  89,
  71,
  240,
  173,
  212,
  162,
  175,
  156,
  164,
  114,
  192,
  183,
  253,
  147,
  38,
  54,
  63,
  247,
  204,
  52,
  165,
  229,
  241,
  113,
  216,
  49,
  21,
  4,
  199,
  35,
  195,
  24,
  150,
  5,
  154,
  7,
  18,
  128,
  226,
  235,
  39,
  178,
  117,
  9,
  131,
  44,
  26,
  27,
  110,
  90,
  160,
  82,
  59,
  214,
  179,
  41,
  227,
  47,
  132,
  83,
  209,
  0,
  237,
  32,
  252,
  177,
  91,
  106,
  203,
  190,
  57,
  74,
  76,
  88,
  207,
  208,
  239,
  170,
  251,
  67,
  77,
  51,
  133,
  69,
  249,
  2,
  127,
  80,
  60,
  159,
  168,
  81,
  163,
  64,
  143,
  146,
  157,
  56,
  245,
  188,
  182,
  218,
  33,
  16,
  255,
  243,
  210,
  205,
  12,
  19,
  236,
  95,
  151,
  68,
  23,
  196,
  167,
  126,
  61,
  100,
  93,
  25,
  115,
  96,
  129,
  79,
  220,
  34,
  42,
  144,
  136,
  70,
  238,
  184,
  20,
  222,
  94,
  11,
  219,
  224,
  50,
  58,
  10,
  73,
  6,
  36,
  92,
  194,
  211,
  172,
  98,
  145,
  149,
  228,
  121,
  231,
  200,
  55,
  109,
  141,
  213,
  78,
  169,
  108,
  86,
  244,
  234,
  101,
  122,
  174,
  8,
  186,
  120,
  37,
  46,
  28,
  166,
  180,
  198,
  232,
  221,
  116,
  31,
  75,
  189,
  139,
  138,
  112,
  62,
  181,
  102,
  72,
  3,
  246,
  14,
  97,
  53,
  87,
  185,
  134,
  193,
  29,
  158,
  225,
  248,
  152,
  17,
  105,
  217,
  142,
  148,
  155,
  30,
  135,
  233,
  206,
  85,
  40,
  223,
  140,
  161,
  137,
  13,
  191,
  230,
  66,
  104,
  65,
  153,
  45,
  15,
  176,
  84,
  187,
  22,
];
amAes.rCon = [
  [0, 0, 0, 0],
  [1, 0, 0, 0],
  [2, 0, 0, 0],
  [4, 0, 0, 0],
  [8, 0, 0, 0],
  [16, 0, 0, 0],
  [32, 0, 0, 0],
  [64, 0, 0, 0],
  [128, 0, 0, 0],
  [27, 0, 0, 0],
  [54, 0, 0, 0],
];
amAes.CbcPkcs7 = {};
amAes.CbcPkcs7.encrypt = function (_75, key, iv) {
  var _76 = 16;
  var _77 = key.length;
  var _78 = key.length * 8;
  if (!(_78 == 128 || _78 == 192 || _78 == 256)) {
    return '';
  }
  var _79 = amAes.keyExpansion(key);
  var _7a = amUtil.pkcs7Type1(_75, _76);
  var _7b = Math.ceil(_7a.length / _76);
  var _7c = new Array(_7b * _76);
  var _7d = iv.slice(0);
  for (var b = 0; b < _7b; b++) {
    var _7e = new Array(_76);
    for (var i = 0; i < _76; i++) {
      _7e[i] = _7d[i] ^ _7a[b * 16 + i];
    }
    var _7f = amAes.cipher(_7e, _79);
    _7d = _7f;
    for (var i = 0; i < _76; i++) {
      _7c[b * 16 + i] = _7f[i];
    }
  }
  return _7c;
};
var amUtf8 = {};
amUtf8.encode = function (_80) {
  var _81 = _80.replace(/[\u0080-\u07ff]/g, function (c) {
    var cc = c.charCodeAt(0);
    return String.fromCharCode(192 | (cc >> 6), 128 | (cc & 63));
  });
  _81 = _81.replace(/[\u0800-\uffff]/g, function (c) {
    var cc = c.charCodeAt(0);
    return String.fromCharCode(224 | (cc >> 12), 128 | ((cc >> 6) & 63), 128 | (cc & 63));
  });
  return _81;
};
amUtf8.decode = function (_82) {
  var _83 = _82.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (c) {
    var cc = ((c.charCodeAt(0) & 15) << 12) | ((c.charCodeAt(1) & 63) << 6) | (c.charCodeAt(2) & 63);
    return String.fromCharCode(cc);
  });
  _83 = _83.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) {
    var cc = ((c.charCodeAt(0) & 31) << 6) | (c.charCodeAt(1) & 63);
    return String.fromCharCode(cc);
  });
  return _83;
};
var dbits;
var canary = 244837814094590;
var j_lm = (canary & 16777215) == 15715070;
function BigInteger(a, b, c) {
  if (a != null) {
    if ('number' == typeof a) {
      this.fromNumber(a, b, c);
    } else {
      if (b == null && 'string' != typeof a) {
        this.fromString(a, 256);
      } else {
        this.fromString(a, b);
      }
    }
  }
}
function nbi() {
  return new BigInteger(null);
}
function am1(i, x, w, j, c, n) {
  while (--n >= 0) {
    var v = x * this[i++] + w[j] + c;
    c = Math.floor(v / 67108864);
    w[j++] = v & 67108863;
  }
  return c;
}
function am2(i, x, w, j, c, n) {
  var xl = x & 32767,
    xh = x >> 15;
  while (--n >= 0) {
    var l = this[i] & 32767;
    var h = this[i++] >> 15;
    var m = xh * l + h * xl;
    l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);
    c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
    w[j++] = l & 1073741823;
  }
  return c;
}
function am3(i, x, w, j, c, n) {
  var xl = x & 16383,
    xh = x >> 14;
  while (--n >= 0) {
    var l = this[i] & 16383;
    var h = this[i++] >> 14;
    var m = xh * l + h * xl;
    l = xl * l + ((m & 16383) << 14) + w[j] + c;
    c = (l >> 28) + (m >> 14) + xh * h;
    w[j++] = l & 268435455;
  }
  return c;
}
if (j_lm && navigator.appName == 'Microsoft Internet Explorer') {
  BigInteger.prototype.am = am2;
  dbits = 30;
} else {
  if (j_lm && navigator.appName != 'Netscape') {
    BigInteger.prototype.am = am1;
    dbits = 26;
  } else {
    BigInteger.prototype.am = am3;
    dbits = 28;
  }
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz';
var BI_RC = new Array();
var rr, vv;
rr = '0'.charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
  BI_RC[rr++] = vv;
}
rr = 'a'.charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
rr = 'A'.charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
function int2char(n) {
  return BI_RM.charAt(n);
}
function intAt(s, i) {
  var c = BI_RC[s.charCodeAt(i)];
  return c == null ? -1 : c;
}
function bnpCopyTo(r) {
  for (var i = this.t - 1; i >= 0; --i) {
    r[i] = this[i];
  }
  r.t = this.t;
  r.s = this.s;
}
function bnpFromInt(x) {
  this.t = 1;
  this.s = x < 0 ? -1 : 0;
  if (x > 0) {
    this[0] = x;
  } else {
    if (x < -1) {
      this[0] = x + DV;
    } else {
      this.t = 0;
    }
  }
}
function nbv(i) {
  var r = nbi();
  r.fromInt(i);
  return r;
}
function bnpFromString(s, b) {
  var k;
  if (b == 16) {
    k = 4;
  } else {
    if (b == 8) {
      k = 3;
    } else {
      if (b == 256) {
        k = 8;
      } else {
        if (b == 2) {
          k = 1;
        } else {
          if (b == 32) {
            k = 5;
          } else {
            if (b == 4) {
              k = 2;
            } else {
              this.fromRadix(s, b);
              return;
            }
          }
        }
      }
    }
  }
  this.t = 0;
  this.s = 0;
  var i = s.length,
    mi = false,
    sh = 0;
  while (--i >= 0) {
    var x = k == 8 ? s[i] & 255 : intAt(s, i);
    if (x < 0) {
      if (s.charAt(i) == '-') {
        mi = true;
      }
      continue;
    }
    mi = false;
    if (sh == 0) {
      this[this.t++] = x;
    } else {
      if (sh + k > this.DB) {
        this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
        this[this.t++] = x >> (this.DB - sh);
      } else {
        this[this.t - 1] |= x << sh;
      }
    }
    sh += k;
    if (sh >= this.DB) {
      sh -= this.DB;
    }
  }
  if (k == 8 && (s[0] & 128) != 0) {
    this.s = -1;
    if (sh > 0) {
      this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
    }
  }
  this.clamp();
  if (mi) {
    BigInteger.ZERO.subTo(this, this);
  }
}
function bnpClamp() {
  var c = this.s & this.DM;
  while (this.t > 0 && this[this.t - 1] == c) {
    --this.t;
  }
}
function bnToString(b) {
  if (this.s < 0) {
    return '-' + this.negate().toString(b);
  }
  var k;
  if (b == 16) {
    k = 4;
  } else {
    if (b == 8) {
      k = 3;
    } else {
      if (b == 2) {
        k = 1;
      } else {
        if (b == 32) {
          k = 5;
        } else {
          if (b == 4) {
            k = 2;
          } else {
            return this.toRadix(b);
          }
        }
      }
    }
  }
  var km = (1 << k) - 1,
    d,
    m = false,
    r = '',
    i = this.t;
  var p = this.DB - ((i * this.DB) % k);
  if (i-- > 0) {
    if (p < this.DB && (d = this[i] >> p) > 0) {
      m = true;
      r = int2char(d);
    }
    while (i >= 0) {
      if (p < k) {
        d = (this[i] & ((1 << p) - 1)) << (k - p);
        d |= this[--i] >> (p += this.DB - k);
      } else {
        d = (this[i] >> (p -= k)) & km;
        if (p <= 0) {
          p += this.DB;
          --i;
        }
      }
      if (d > 0) {
        m = true;
      }
      if (m) {
        r += int2char(d);
      }
    }
  }
  return m ? r : '0';
}
function bnNegate() {
  var r = nbi();
  BigInteger.ZERO.subTo(this, r);
  return r;
}
function bnAbs() {
  return this.s < 0 ? this.negate() : this;
}
function bnCompareTo(a) {
  var r = this.s - a.s;
  if (r != 0) {
    return r;
  }
  var i = this.t;
  r = i - a.t;
  if (r != 0) {
    return r;
  }
  while (--i >= 0) {
    if ((r = this[i] - a[i]) != 0) {
      return r;
    }
  }
  return 0;
}
function nbits(x) {
  var r = 1,
    t;
  if ((t = x >>> 16) != 0) {
    x = t;
    r += 16;
  }
  if ((t = x >> 8) != 0) {
    x = t;
    r += 8;
  }
  if ((t = x >> 4) != 0) {
    x = t;
    r += 4;
  }
  if ((t = x >> 2) != 0) {
    x = t;
    r += 2;
  }
  if ((t = x >> 1) != 0) {
    x = t;
    r += 1;
  }
  return r;
}
function bnBitLength() {
  if (this.t <= 0) {
    return 0;
  }
  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
}
function bnpDLShiftTo(n, r) {
  var i;
  for (i = this.t - 1; i >= 0; --i) {
    r[i + n] = this[i];
  }
  for (i = n - 1; i >= 0; --i) {
    r[i] = 0;
  }
  r.t = this.t + n;
  r.s = this.s;
}
function bnpDRShiftTo(n, r) {
  for (var i = n; i < this.t; ++i) {
    r[i - n] = this[i];
  }
  r.t = Math.max(this.t - n, 0);
  r.s = this.s;
}
function bnpLShiftTo(n, r) {
  var bs = n % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << cbs) - 1;
  var ds = Math.floor(n / this.DB),
    c = (this.s << bs) & this.DM,
    i;
  for (i = this.t - 1; i >= 0; --i) {
    r[i + ds + 1] = (this[i] >> cbs) | c;
    c = (this[i] & bm) << bs;
  }
  for (i = ds - 1; i >= 0; --i) {
    r[i] = 0;
  }
  r[ds] = c;
  r.t = this.t + ds + 1;
  r.s = this.s;
  r.clamp();
}
function bnpRShiftTo(n, r) {
  r.s = this.s;
  var ds = Math.floor(n / this.DB);
  if (ds >= this.t) {
    r.t = 0;
    return;
  }
  var bs = n % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << bs) - 1;
  r[0] = this[ds] >> bs;
  for (var i = ds + 1; i < this.t; ++i) {
    r[i - ds - 1] |= (this[i] & bm) << cbs;
    r[i - ds] = this[i] >> bs;
  }
  if (bs > 0) {
    r[this.t - ds - 1] |= (this.s & bm) << cbs;
  }
  r.t = this.t - ds;
  r.clamp();
}
function bnpSubTo(a, r) {
  var i = 0,
    c = 0,
    m = Math.min(a.t, this.t);
  while (i < m) {
    c += this[i] - a[i];
    r[i++] = c & this.DM;
    c >>= this.DB;
  }
  if (a.t < this.t) {
    c -= a.s;
    while (i < this.t) {
      c += this[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c += this.s;
  } else {
    c += this.s;
    while (i < a.t) {
      c -= a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = c < 0 ? -1 : 0;
  if (c < -1) {
    r[i++] = this.DV + c;
  } else {
    if (c > 0) {
      r[i++] = c;
    }
  }
  r.t = i;
  r.clamp();
}
function bnpMultiplyTo(a, r) {
  var x = this.abs(),
    y = a.abs();
  var i = x.t;
  r.t = i + y.t;
  while (--i >= 0) {
    r[i] = 0;
  }
  for (i = 0; i < y.t; ++i) {
    r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
  }
  r.s = 0;
  r.clamp();
  if (this.s != a.s) {
    BigInteger.ZERO.subTo(r, r);
  }
}
function bnpSquareTo(r) {
  var x = this.abs();
  var i = (r.t = 2 * x.t);
  while (--i >= 0) {
    r[i] = 0;
  }
  for (i = 0; i < x.t - 1; ++i) {
    var c = x.am(i, x[i], r, 2 * i, 0, 1);
    if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
      r[i + x.t] -= x.DV;
      r[i + x.t + 1] = 1;
    }
  }
  if (r.t > 0) {
    r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
  }
  r.s = 0;
  r.clamp();
}
function bnpDivRemTo(m, q, r) {
  var pm = m.abs();
  if (pm.t <= 0) {
    return;
  }
  var pt = this.abs();
  if (pt.t < pm.t) {
    if (q != null) {
      q.fromInt(0);
    }
    if (r != null) {
      this.copyTo(r);
    }
    return;
  }
  if (r == null) {
    r = nbi();
  }
  var y = nbi(),
    ts = this.s,
    ms = m.s;
  var nsh = this.DB - nbits(pm[pm.t - 1]);
  if (nsh > 0) {
    pm.lShiftTo(nsh, y);
    pt.lShiftTo(nsh, r);
  } else {
    pm.copyTo(y);
    pt.copyTo(r);
  }
  var ys = y.t;
  var y0 = y[ys - 1];
  if (y0 == 0) {
    return;
  }
  var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
  var d1 = this.FV / yt,
    d2 = (1 << this.F1) / yt,
    e = 1 << this.F2;
  var i = r.t,
    j = i - ys,
    t = q == null ? nbi() : q;
  y.dlShiftTo(j, t);
  if (r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t, r);
  }
  BigInteger.ONE.dlShiftTo(ys, t);
  t.subTo(y, y);
  while (y.t < ys) {
    y[y.t++] = 0;
  }
  while (--j >= 0) {
    var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
    if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
      y.dlShiftTo(j, t);
      r.subTo(t, r);
      while (r[i] < --qd) {
        r.subTo(t, r);
      }
    }
  }
  if (q != null) {
    r.drShiftTo(ys, q);
    if (ts != ms) {
      BigInteger.ZERO.subTo(q, q);
    }
  }
  r.t = ys;
  r.clamp();
  if (nsh > 0) {
    r.rShiftTo(nsh, r);
  }
  if (ts < 0) {
    BigInteger.ZERO.subTo(r, r);
  }
}
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a, null, r);
  if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
    a.subTo(r, r);
  }
  return r;
}
function Classic(m) {
  this.m = m;
}
function cConvert(x) {
  if (x.s < 0 || x.compareTo(this.m) >= 0) {
    return x.mod(this.m);
  } else {
    return x;
  }
}
function cRevert(x) {
  return x;
}
function cReduce(x) {
  x.divRemTo(this.m, null, x);
}
function cMulTo(x, y, r) {
  x.multiplyTo(y, r);
  this.reduce(r);
}
function cSqrTo(x, r) {
  x.squareTo(r);
  this.reduce(r);
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
function bnpInvDigit() {
  if (this.t < 1) {
    return 0;
  }
  var x = this[0];
  if ((x & 1) == 0) {
    return 0;
  }
  var y = x & 3;
  y = (y * (2 - (x & 15) * y)) & 15;
  y = (y * (2 - (x & 255) * y)) & 255;
  y = (y * (2 - (((x & 65535) * y) & 65535))) & 65535;
  y = (y * (2 - ((x * y) % this.DV))) % this.DV;
  return y > 0 ? this.DV - y : -y;
}
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp & 32767;
  this.mph = this.mp >> 15;
  this.um = (1 << (m.DB - 15)) - 1;
  this.mt2 = 2 * m.t;
}
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t, r);
  r.divRemTo(this.m, null, r);
  if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
    this.m.subTo(r, r);
  }
  return r;
}
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}
function montReduce(x) {
  while (x.t <= this.mt2) {
    x[x.t++] = 0;
  }
  for (var i = 0; i < this.m.t; ++i) {
    var j = x[i] & 32767;
    var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
    j = i + this.m.t;
    x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
    while (x[j] >= x.DV) {
      x[j] -= x.DV;
      x[++j]++;
    }
  }
  x.clamp();
  x.drShiftTo(this.m.t, x);
  if (x.compareTo(this.m) >= 0) {
    x.subTo(this.m, x);
  }
}
function montSqrTo(x, r) {
  x.squareTo(r);
  this.reduce(r);
}
function montMulTo(x, y, r) {
  x.multiplyTo(y, r);
  this.reduce(r);
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnpIsEven() {
  return (this.t > 0 ? this[0] & 1 : this.s) == 0;
}
function bnpExp(e, z) {
  if (e > 4294967295 || e < 1) {
    return BigInteger.ONE;
  }
  var r = nbi(),
    r2 = nbi(),
    g = z.convert(this),
    i = nbits(e) - 1;
  g.copyTo(r);
  while (--i >= 0) {
    z.sqrTo(r, r2);
    if ((e & (1 << i)) > 0) {
      z.mulTo(r2, g, r);
    } else {
      var t = r;
      r = r2;
      r2 = t;
    }
  }
  return z.revert(r);
}
function bnModPowInt(e, m) {
  var z;
  if (e < 256 || m.isEven()) {
    z = new Classic(m);
  } else {
    z = new Montgomery(m);
  }
  return this.exp(e, z);
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
var amUtil = {};
amUtil.byte2dword = function (bin) {
  var _84 = new Array();
  for (var i = 0; i < bin.length; i++) {
    _84[i >> 2] |= bin[i] << (24 - (i % 4) * 8);
  }
  return _84;
};
amUtil.dword2byte = function (_85) {
  var _86 = new Array();
  for (var i = 0; i < _85.length * 4; i++) {
    _86[i] = (_85[i >> 2] >> (24 - (i % 4) * 8)) & 255;
  }
  return _86;
};
amUtil.hexDecode = function (_87) {
  var wrt = 0;
  var rd = 0;
  var tmp = new Array(1);
  var _88 = ' ';
  var ch = 0;
  while (rd < _87.length) {
    if (_87.charCodeAt(rd) == _88.charCodeAt(0)) {
      ++rd;
      continue;
    }
    ch = (amUtil.HexToNib(_87.charCodeAt(rd)) << 4) + amUtil.HexToNib(_87.charCodeAt(rd + 1));
    if (wrt >= tmp.length) {
      tmp.push(ch);
    } else {
      tmp[wrt] = ch;
    }
    ++wrt;
    rd += 2;
  }
  return tmp;
};
amUtil.HexToNib = function (h) {
  if (h >= 65 && h <= 70) {
    return h - 55;
  }
  if (h >= 97 && h <= 102) {
    return h - 87;
  } else {
    return h - 48;
  }
};
amUtil.int2bin = function (num, _89) {
  var _8a = [];
  for (var i = _89 - 1; i >= 0; i--) {
    _8a[_89 - 1 - i] = (num >>> (i * 8)) & 255;
  }
  return _8a;
};
amUtil.str2bin = function (_8b) {
  var _8c = [];
  var _8d = unescape(encodeURIComponent(_8b));
  for (var i = 0; i < _8d.length; i++) {
    _8c[i] = _8d.charCodeAt(i) & 255;
  }
  return _8c;
};
amUtil.bin2str = function (_8e) {
  var str = '';
  for (var i = 0; i < _8e.length; i++) {
    str = str + String.fromCharCode(_8e[i]);
  }
  return decodeURIComponent(escape(str));
};
amUtil.hex2b64 = function (_8f) {
  return amUtil.base64Encode(amUtil.hexDecode(_8f));
};
amUtil.hexEncode = function (_90) {
  var ctr = 0;
  var tmp = '';
  var _91 = [];
  ctr = 0;
  while (ctr < _90.length) {
    _91[ctr] = amUtil.addHex(_90[ctr]);
    ++ctr;
  }
  tmp = _91.join('');
  return tmp;
};
amUtil.addHex = function (val) {
  var x = (val >>> 4) & 15;
  if (x > 9) {
    x += 55;
  } else {
    x += 48;
  }
  var s = String.fromCharCode(x);
  x = val & 15;
  if (x > 9) {
    x += 55;
  } else {
    x += 48;
  }
  s = s + String.fromCharCode(x);
  return s;
};
amUtil.pkcs7Type1 = function (_92, _93) {
  var _94 = 0;
  if (_92.length < _93) {
    _94 = _93 - _92.length;
  } else {
    _94 = _93 - (_92.length % _93);
  }
  var _95 = [];
  for (var i = 1; i <= _94; i++) {
    _95[i - 1] = _94 & 255;
  }
  return _92.concat(_95);
};
amUtil.pkcs7GetPaddingCount = function (_96, _97) {
  var _98 = _96[_96.length - 1];
  if (_98 > _96.length || _98 == 0) {
    throw 'pad block corrupted';
  }
  for (var i = 1; i <= _98; i++) {
    if (_96[_96.length - i] != _98) {
      throw 'pad block corrupted';
    }
  }
  return _98;
};
amUtil.zeroPad = function (_99, _9a) {
  var _9b = _99;
  for (; _9b.length < _9a; ) {
    _9b = '0' + _9b;
  }
  return _9b;
};
amUtil.parseBigInt = function (str, r) {
  return new BigInteger(str, r);
};
amUtil.xor = function (_9c, _9d) {
  var _9e = [];
  if (_9c.length != _9d.length) {
    throw 'XOR failure: two binaries have different lengths';
  }
  for (var i = 0; i < _9c.length; i++) {
    _9e[i] = _9c[i] ^ _9d[i];
  }
  return _9e;
};
amUtil.generateRandom = function (_9f) {
  var a = [];
  let i=0;
  if (window.crypto && window.crypto.getRandomValues) {
    var ua = new Uint8Array(_9f);
    window.crypto.getRandomValues(ua);
    for (i = 0; i < _9f; i++) {
      a[i] = ua[i];
    }
  } else {
    for (i = 0; i < _9f; i++) {
      a[i] = Math.floor(256 * Math.random());
    }
  }
  return a;
};
amUtil.base64Encode = function (_a0) {
  return Base64.encodeByteArray(_a0);
};
amUtil.Arcfour = function () {
  this.i = 0;
  this.j = 0;
  this.S = new Array();
};
amUtil.ARC4init = function (key) {
  var i, j, t;
  for (i = 0; i < 256; ++i) {
    this.S[i] = i;
  }
  j = 0;
  for (i = 0; i < 256; ++i) {
    j = (j + this.S[i] + key[i % key.length]) & 255;
    t = this.S[i];
    this.S[i] = this.S[j];
    this.S[j] = t;
  }
  this.i = 0;
  this.j = 0;
};
amUtil.ARC4next = function () {
  var t;
  this.i = (this.i + 1) & 255;
  this.j = (this.j + this.S[this.i]) & 255;
  t = this.S[this.i];
  this.S[this.i] = this.S[this.j];
  this.S[this.j] = t;
  return this.S[(t + this.S[this.i]) & 255];
};
amUtil.Arcfour.prototype.init = amUtil.ARC4init;
amUtil.Arcfour.prototype.next = amUtil.ARC4next;
amUtil.prng_newstate = function () {
  return new amUtil.Arcfour();
};
amUtil.rng_psize = 256;
amUtil.rng_state;
amUtil.rng_pool;
amUtil.rng_pptr;
amUtil.rng_seed_int = function (x) {
  amUtil.rng_pool[amUtil.rng_pptr++] ^= x & 255;
  amUtil.rng_pool[amUtil.rng_pptr++] ^= (x >> 8) & 255;
  amUtil.rng_pool[amUtil.rng_pptr++] ^= (x >> 16) & 255;
  amUtil.rng_pool[amUtil.rng_pptr++] ^= (x >> 24) & 255;
  if (amUtil.rng_pptr >= amUtil.rng_psize) {
    amUtil.rng_pptr -= amUtil.rng_psize;
  }
};
amUtil.rng_seed_time = function () {
  amUtil.rng_seed_int(new Date().getTime());
};
if (amUtil.rng_pool == null) {
  amUtil.rng_pool = new Array();
  amUtil.rng_pptr = 0;
  var t;
  if (window.crypto && window.crypto.getRandomValues) {
    var ua = new Uint8Array(32);
    window.crypto.getRandomValues(ua);
    for (t = 0; t < 32; ++t) {
      amUtil.rng_pool[amUtil.rng_pptr++] = ua[t];
    }
  }
  if (navigator.appName == 'Netscape' && navigator.appVersion < '5' && window.crypto) {
    var z = window.crypto.random(32);
    for (t = 0; t < z.length; ++t) {
      amUtil.rng_pool[amUtil.rng_pptr++] = z.charCodeAt(t) & 255;
    }
  }
  while (amUtil.rng_pptr < amUtil.rng_psize) {
    t = Math.floor(65536 * Math.random());
    amUtil.rng_pool[amUtil.rng_pptr++] = t >>> 8;
    amUtil.rng_pool[amUtil.rng_pptr++] = t & 255;
  }
  amUtil.rng_pptr = 0;
  amUtil.rng_seed_time();
}
amUtil.rng_get_byte = function () {
  if (amUtil.rng_state == null) {
    amUtil.rng_seed_time();
    amUtil.rng_state = amUtil.prng_newstate();
    amUtil.rng_state.init(amUtil.rng_pool);
    for (amUtil.rng_pptr = 0; amUtil.rng_pptr < amUtil.rng_pool.length; ++amUtil.rng_pptr) {
      amUtil.rng_pool[amUtil.rng_pptr] = 0;
    }
    amUtil.rng_pptr = 0;
  }
  return amUtil.rng_state.next();
};
amUtil.rng_get_bytes = function (ba) {
  var i;
  for (i = 0; i < ba.length; ++i) {
    var _a1 = amUtil.rng_get_byte();
    while (i == 0 && (_a1 & 128) != 0) {
      _a1 = amUtil.rng_get_byte();
    }
    ba[i] = _a1;
  }
};
amUtil.SecureRandom = function () {};
amUtil.SecureRandom.prototype.nextBytes = amUtil.rng_get_bytes;
amUtil.log = (function (log) {
  try {
    document.testform.debug.value = document.testform.debug.value + log + '\n';
  } catch (err) {}
})(
  (function (_a2) {
    'use strict';
    var _a3 = 4 | 2 | 1;
    function _a4(_a5, _a6) {
      this.highOrder = _a5;
      this.lowOrder = _a6;
    }
    function _a7(str, _a8) {
      var bin = [],
        _a9 = (1 << _a8) - 1,
        _aa = str.length * _a8,
        i;
      for (i = 0; i < _aa; i += _a8) {
        bin[i >>> 5] |= (str.charCodeAt(i / _a8) & _a9) << (32 - _a8 - (i % 32));
      }
      return { value: bin, binLen: _aa };
    }
    function _ab(str) {
      var bin = [],
        _ac = str.length,
        i,
        num;
      if (0 !== _ac % 2) {
        throw 'String of HEX type must be in byte increments';
      }
      for (i = 0; i < _ac; i += 2) {
        num = parseInt(str.substr(i, 2), 16);
        if (!isNaN(num)) {
          bin[i >>> 3] |= num << (24 - 4 * (i % 8));
        } else {
          throw 'String of HEX type contains invalid characters';
        }
      }
      return { value: bin, binLen: _ac * 4 };
    }
    function _ad(str) {
      var _ae = [],
        _af = 0,
        _b0,
        i,
        j,
        _b1,
        _b2,
        _b3,
        _b4 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      if (-1 === str.search(/^[a-zA-Z0-9=+\/]+$/)) {
        throw 'Invalid character in base-64 string';
      }
      _b3 = str.indexOf('=');
      str = str.replace(/\=/g, '');
      if (-1 !== _b3 && _b3 < str.length) {
        throw "Invalid '=' found in base-64 string";
      }
      for (i = 0; i < str.length; i += 4) {
        _b2 = str.substr(i, 4);
        _b1 = 0;
        for (j = 0; j < _b2.length; j += 1) {
          _b0 = _b4.indexOf(_b2[j]);
          _b1 |= _b0 << (18 - 6 * j);
        }
        for (j = 0; j < _b2.length - 1; j += 1) {
          _ae[_af >> 2] |= ((_b1 >>> (16 - j * 8)) & 255) << (24 - 8 * (_af % 4));
          _af += 1;
        }
      }
      return { value: _ae, binLen: _af * 8 };
    }
    function _b5(_b6, _b7) {
      var _b8 = '0123456789abcdef',
        str = '',
        _b9 = _b6.length * 4,
        i,
        _ba;
      for (i = 0; i < _b9; i += 1) {
        _ba = _b6[i >>> 2] >>> ((3 - (i % 4)) * 8);
        str += _b8.charAt((_ba >>> 4) & 15) + _b8.charAt(_ba & 15);
      }
      return _b7['outputUpper'] ? str.toUpperCase() : str;
    }
    function _bb(_bc, _bd) {
      var str = '',
        _be = _bc.length * 4,
        i,
        j,
        _bf,
        _c0 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      for (i = 0; i < _be; i += 3) {
        _bf =
          (((_bc[i >>> 2] >>> (8 * (3 - (i % 4)))) & 255) << 16) |
          (((_bc[(i + 1) >>> 2] >>> (8 * (3 - ((i + 1) % 4)))) & 255) << 8) |
          ((_bc[(i + 2) >>> 2] >>> (8 * (3 - ((i + 2) % 4)))) & 255);
        for (j = 0; j < 4; j += 1) {
          if (i * 8 + j * 6 <= _bc.length * 32) {
            str += _c0.charAt((_bf >>> (6 * (3 - j))) & 63);
          } else {
            str += _bd['b64Pad'];
          }
        }
      }
      return str;
    }
    function _c1(_c2) {
      var _c3 = { outputUpper: false, b64Pad: '=' };
      try {
        if (Object.prototype.hasOwnProperty(_c2, 'outputUpper')) {
          _c3['outputUpper'] = _c2['outputUpper'];
        }
        if (Object.prototype.hasOwnProperty(_c2, 'b64Pad')) {
          _c3['b64Pad'] = _c2['b64Pad'];
        }
      } catch (e) {}
      if ('boolean' !== typeof _c3['outputUpper']) {
        throw 'Invalid outputUpper formatting option';
      }
      if ('string' !== typeof _c3['b64Pad']) {
        throw 'Invalid b64Pad formatting option';
      }
      return _c3;
    }
    function _c4(x, n) {
      return (x << n) | (x >>> (32 - n));
    }
    function _c5(x, n) {
      return (x >>> n) | (x << (32 - n));
    }
    function _c6(x, n) {
      var _c7 = null,
        tmp = new _a4(x.highOrder, x.lowOrder);
      if (32 >= n) {
        _c7 = new _a4(
          ((tmp.highOrder >>> n) & 4294967295) | ((tmp.lowOrder << (32 - n)) & 4294967295),
          ((tmp.lowOrder >>> n) & 4294967295) | ((tmp.highOrder << (32 - n)) & 4294967295)
        );
      } else {
        _c7 = new _a4(
          ((tmp.lowOrder >>> (n - 32)) & 4294967295) | ((tmp.highOrder << (64 - n)) & 4294967295),
          ((tmp.highOrder >>> (n - 32)) & 4294967295) | ((tmp.lowOrder << (64 - n)) & 4294967295)
        );
      }
      return _c7;
    }
    function _c8(x, n) {
      return x >>> n;
    }
    function _c9(x, n) {
      var _ca = null;
      if (32 >= n) {
        _ca = new _a4(x.highOrder >>> n, (x.lowOrder >>> n) | ((x.highOrder << (32 - n)) & 4294967295));
      } else {
        _ca = new _a4(0, x.highOrder >>> (n - 32));
      }
      return _ca;
    }
    function _cb(x, y, z) {
      return x ^ y ^ z;
    }
    function _cc(x, y, z) {
      return (x & y) ^ (~x & z);
    }
    function _cd(x, y, z) {
      return new _a4(
        (x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
        (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
      );
    }
    function _ce(x, y, z) {
      return (x & y) ^ (x & z) ^ (y & z);
    }
    function _cf(x, y, z) {
      return new _a4(
        (x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder),
        (x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)
      );
    }
    function _d0(x) {
      return _c5(x, 2) ^ _c5(x, 13) ^ _c5(x, 22);
    }
    function _d1(x) {
      var _d2 = _c6(x, 28),
        _d3 = _c6(x, 34),
        _d4 = _c6(x, 39);
      return new _a4(_d2.highOrder ^ _d3.highOrder ^ _d4.highOrder, _d2.lowOrder ^ _d3.lowOrder ^ _d4.lowOrder);
    }
    function _d5(x) {
      return _c5(x, 6) ^ _c5(x, 11) ^ _c5(x, 25);
    }
    function _d6(x) {
      var _d7 = _c6(x, 14),
        _d8 = _c6(x, 18),
        _d9 = _c6(x, 41);
      return new _a4(_d7.highOrder ^ _d8.highOrder ^ _d9.highOrder, _d7.lowOrder ^ _d8.lowOrder ^ _d9.lowOrder);
    }
    function _da(x) {
      return _c5(x, 7) ^ _c5(x, 18) ^ _c8(x, 3);
    }
    function _db(x) {
      var _dc = _c6(x, 1),
        _dd = _c6(x, 8),
        _de = _c9(x, 7);
      return new _a4(_dc.highOrder ^ _dd.highOrder ^ _de.highOrder, _dc.lowOrder ^ _dd.lowOrder ^ _de.lowOrder);
    }
    function _df(x) {
      return _c5(x, 17) ^ _c5(x, 19) ^ _c8(x, 10);
    }
    function _e0(x) {
      var _e1 = _c6(x, 19),
        _e2 = _c6(x, 61),
        _e3 = _c9(x, 6);
      return new _a4(_e1.highOrder ^ _e2.highOrder ^ _e3.highOrder, _e1.lowOrder ^ _e2.lowOrder ^ _e3.lowOrder);
    }
    function _e4(a, b) {
      var lsw = (a & 65535) + (b & 65535),
        msw = (a >>> 16) + (b >>> 16) + (lsw >>> 16);
      return ((msw & 65535) << 16) | (lsw & 65535);
    }
    function _e5(a, b, c, d) {
      var lsw = (a & 65535) + (b & 65535) + (c & 65535) + (d & 65535),
        msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (lsw >>> 16);
      return ((msw & 65535) << 16) | (lsw & 65535);
    }
    function _e6(a, b, c, d, e) {
      var lsw = (a & 65535) + (b & 65535) + (c & 65535) + (d & 65535) + (e & 65535),
        msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16) + (lsw >>> 16);
      return ((msw & 65535) << 16) | (lsw & 65535);
    }
    function _e7(x, y) {
      var lsw, msw, _e8, _e9;
      lsw = (x.lowOrder & 65535) + (y.lowOrder & 65535);
      msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
      _e8 = ((msw & 65535) << 16) | (lsw & 65535);
      lsw = (x.highOrder & 65535) + (y.highOrder & 65535) + (msw >>> 16);
      msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
      _e9 = ((msw & 65535) << 16) | (lsw & 65535);
      return new _a4(_e9, _e8);
    }
    function _ea(a, b, c, d) {
      var lsw, msw, _eb, _ec;
      lsw = (a.lowOrder & 65535) + (b.lowOrder & 65535) + (c.lowOrder & 65535) + (d.lowOrder & 65535);
      msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
      _eb = ((msw & 65535) << 16) | (lsw & 65535);
      lsw =
        (a.highOrder & 65535) + (b.highOrder & 65535) + (c.highOrder & 65535) + (d.highOrder & 65535) + (msw >>> 16);
      msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
      _ec = ((msw & 65535) << 16) | (lsw & 65535);
      return new _a4(_ec, _eb);
    }
    function _ed(a, b, c, d, e) {
      var lsw, msw, _ee, _ef;
      lsw =
        (a.lowOrder & 65535) +
        (b.lowOrder & 65535) +
        (c.lowOrder & 65535) +
        (d.lowOrder & 65535) +
        (e.lowOrder & 65535);
      msw =
        (a.lowOrder >>> 16) +
        (b.lowOrder >>> 16) +
        (c.lowOrder >>> 16) +
        (d.lowOrder >>> 16) +
        (e.lowOrder >>> 16) +
        (lsw >>> 16);
      _ee = ((msw & 65535) << 16) | (lsw & 65535);
      lsw =
        (a.highOrder & 65535) +
        (b.highOrder & 65535) +
        (c.highOrder & 65535) +
        (d.highOrder & 65535) +
        (e.highOrder & 65535) +
        (msw >>> 16);
      msw =
        (a.highOrder >>> 16) +
        (b.highOrder >>> 16) +
        (c.highOrder >>> 16) +
        (d.highOrder >>> 16) +
        (e.highOrder >>> 16) +
        (lsw >>> 16);
      _ef = ((msw & 65535) << 16) | (lsw & 65535);
      return new _a4(_ef, _ee);
    }
    function _f0(_f1, _f2) {
      var W = [],
        a,
        b,
        c,
        d,
        e,
        T,
        ch = _cc,
        _f3 = _cb,
        maj = _ce,
        _f4 = _c4,
        _f5 = _e4,
        i,
        t,
        _f6 = _e6,
        _f7,
        H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
        K = [
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1518500249,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          1859775393,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          2400959708,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
          3395469782,
        ];
      _f1[_f2 >>> 5] |= 128 << (24 - (_f2 % 32));
      _f1[(((_f2 + 65) >>> 9) << 4) + 15] = _f2;
      _f7 = _f1.length;
      for (i = 0; i < _f7; i += 16) {
        a = H[0];
        b = H[1];
        c = H[2];
        d = H[3];
        e = H[4];
        for (t = 0; t < 80; t += 1) {
          if (t < 16) {
            W[t] = _f1[t + i];
          } else {
            W[t] = _f4(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
          }
          if (t < 20) {
            T = _f6(_f4(a, 5), ch(b, c, d), e, K[t], W[t]);
          } else {
            if (t < 40) {
              T = _f6(_f4(a, 5), _f3(b, c, d), e, K[t], W[t]);
            } else {
              if (t < 60) {
                T = _f6(_f4(a, 5), maj(b, c, d), e, K[t], W[t]);
              } else {
                T = _f6(_f4(a, 5), _f3(b, c, d), e, K[t], W[t]);
              }
            }
          }
          e = d;
          d = c;
          c = _f4(b, 30);
          b = a;
          a = T;
        }
        H[0] = _f5(a, H[0]);
        H[1] = _f5(b, H[1]);
        H[2] = _f5(c, H[2]);
        H[3] = _f5(d, H[3]);
        H[4] = _f5(e, H[4]);
      }
      return H;
    }
    function _f8(_f9, _fa, _fb) {
      var a,
        b,
        c,
        d,
        e,
        f,
        g,
        h,
        T1,
        T2,
        H,
        _fc,
        _fd,
        i,
        t,
        _fe,
        _ff,
        _100,
        _101,
        _102,
        _103,
        _104,
        _105,
        _106,
        ch,
        maj,
        Int,
        K,
        W = [],
        _107,
        _108;
      if ((_fb === 'SHA-224' || _fb === 'SHA-256') && 2 & _a3) {
        _fc = 64;
        _fd = (((_fa + 65) >>> 9) << 4) + 15;
        _fe = 16;
        _ff = 1;
        Int = Number;
        _100 = _e4;
        _101 = _e5;
        _102 = _e6;
        _103 = _da;
        _104 = _df;
        _105 = _d0;
        _106 = _d5;
        maj = _ce;
        ch = _cc;
        K = [
          1116352408,
          1899447441,
          3049323471,
          3921009573,
          961987163,
          1508970993,
          2453635748,
          2870763221,
          3624381080,
          310598401,
          607225278,
          1426881987,
          1925078388,
          2162078206,
          2614888103,
          3248222580,
          3835390401,
          4022224774,
          264347078,
          604807628,
          770255983,
          1249150122,
          1555081692,
          1996064986,
          2554220882,
          2821834349,
          2952996808,
          3210313671,
          3336571891,
          3584528711,
          113926993,
          338241895,
          666307205,
          773529912,
          1294757372,
          1396182291,
          1695183700,
          1986661051,
          2177026350,
          2456956037,
          2730485921,
          2820302411,
          3259730800,
          3345764771,
          3516065817,
          3600352804,
          4094571909,
          275423344,
          430227734,
          506948616,
          659060556,
          883997877,
          958139571,
          1322822218,
          1537002063,
          1747873779,
          1955562222,
          2024104815,
          2227730452,
          2361852424,
          2428436474,
          2756734187,
          3204031479,
          3329325298,
        ];
        if ('SHA-224' === _fb) {
          H = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
        } else {
          H = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
        }
      } else {
        if ((_fb === 'SHA-384' || _fb === 'SHA-512') && 4 & _a3) {
          _fc = 80;
          _fd = (((_fa + 128) >>> 10) << 5) + 31;
          _fe = 32;
          _ff = 2;
          Int = _a4;
          _100 = _e7;
          _101 = _ea;
          _102 = _ed;
          _103 = _db;
          _104 = _e0;
          _105 = _d1;
          _106 = _d6;
          maj = _cf;
          ch = _cd;
          K = [
            new Int(1116352408, 3609767458),
            new Int(1899447441, 602891725),
            new Int(3049323471, 3964484399),
            new Int(3921009573, 2173295548),
            new Int(961987163, 4081628472),
            new Int(1508970993, 3053834265),
            new Int(2453635748, 2937671579),
            new Int(2870763221, 3664609560),
            new Int(3624381080, 2734883394),
            new Int(310598401, 1164996542),
            new Int(607225278, 1323610764),
            new Int(1426881987, 3590304994),
            new Int(1925078388, 4068182383),
            new Int(2162078206, 991336113),
            new Int(2614888103, 633803317),
            new Int(3248222580, 3479774868),
            new Int(3835390401, 2666613458),
            new Int(4022224774, 944711139),
            new Int(264347078, 2341262773),
            new Int(604807628, 2007800933),
            new Int(770255983, 1495990901),
            new Int(1249150122, 1856431235),
            new Int(1555081692, 3175218132),
            new Int(1996064986, 2198950837),
            new Int(2554220882, 3999719339),
            new Int(2821834349, 766784016),
            new Int(2952996808, 2566594879),
            new Int(3210313671, 3203337956),
            new Int(3336571891, 1034457026),
            new Int(3584528711, 2466948901),
            new Int(113926993, 3758326383),
            new Int(338241895, 168717936),
            new Int(666307205, 1188179964),
            new Int(773529912, 1546045734),
            new Int(1294757372, 1522805485),
            new Int(1396182291, 2643833823),
            new Int(1695183700, 2343527390),
            new Int(1986661051, 1014477480),
            new Int(2177026350, 1206759142),
            new Int(2456956037, 344077627),
            new Int(2730485921, 1290863460),
            new Int(2820302411, 3158454273),
            new Int(3259730800, 3505952657),
            new Int(3345764771, 106217008),
            new Int(3516065817, 3606008344),
            new Int(3600352804, 1432725776),
            new Int(4094571909, 1467031594),
            new Int(275423344, 851169720),
            new Int(430227734, 3100823752),
            new Int(506948616, 1363258195),
            new Int(659060556, 3750685593),
            new Int(883997877, 3785050280),
            new Int(958139571, 3318307427),
            new Int(1322822218, 3812723403),
            new Int(1537002063, 2003034995),
            new Int(1747873779, 3602036899),
            new Int(1955562222, 1575990012),
            new Int(2024104815, 1125592928),
            new Int(2227730452, 2716904306),
            new Int(2361852424, 442776044),
            new Int(2428436474, 593698344),
            new Int(2756734187, 3733110249),
            new Int(3204031479, 2999351573),
            new Int(3329325298, 3815920427),
            new Int(3391569614, 3928383900),
            new Int(3515267271, 566280711),
            new Int(3940187606, 3454069534),
            new Int(4118630271, 4000239992),
            new Int(116418474, 1914138554),
            new Int(174292421, 2731055270),
            new Int(289380356, 3203993006),
            new Int(460393269, 320620315),
            new Int(685471733, 587496836),
            new Int(852142971, 1086792851),
            new Int(1017036298, 365543100),
            new Int(1126000580, 2618297676),
            new Int(1288033470, 3409855158),
            new Int(1501505948, 4234509866),
            new Int(1607167915, 987167468),
            new Int(1816402316, 1246189591),
          ];
          if ('SHA-384' === _fb) {
            H = [
              new Int(3418070365, 3238371032),
              new Int(1654270250, 914150663),
              new Int(2438529370, 812702999),
              new Int(355462360, 4144912697),
              new Int(1731405415, 4290775857),
              new Int(41048885895, 1750603025),
              new Int(3675008525, 1694076839),
              new Int(1203062813, 3204075428),
            ];
          } else {
            H = [
              new Int(1779033703, 4089235720),
              new Int(3144134277, 2227873595),
              new Int(1013904242, 4271175723),
              new Int(2773480762, 1595750129),
              new Int(1359893119, 2917565137),
              new Int(2600822924, 725511199),
              new Int(528734635, 4215389547),
              new Int(1541459225, 327033209),
            ];
          }
        } else {
          throw 'Unexpected error in SHA-2 implementation';
        }
      }
      _f9[_fa >>> 5] |= 128 << (24 - (_fa % 32));
      _f9[_fd] = _fa;
      _107 = _f9.length;
      for (i = 0; i < _107; i += _fe) {
        a = H[0];
        b = H[1];
        c = H[2];
        d = H[3];
        e = H[4];
        f = H[5];
        g = H[6];
        h = H[7];
        for (t = 0; t < _fc; t += 1) {
          if (t < 16) {
            W[t] = new Int(_f9[t * _ff + i], _f9[t * _ff + i + 1]);
          } else {
            W[t] = _101(_104(W[t - 2]), W[t - 7], _103(W[t - 15]), W[t - 16]);
          }
          T1 = _102(h, _106(e), ch(e, f, g), K[t], W[t]);
          T2 = _100(_105(a), maj(a, b, c));
          h = g;
          g = f;
          f = e;
          e = _100(d, T1);
          d = c;
          c = b;
          b = a;
          a = _100(T1, T2);
        }
        H[0] = _100(a, H[0]);
        H[1] = _100(b, H[1]);
        H[2] = _100(c, H[2]);
        H[3] = _100(d, H[3]);
        H[4] = _100(e, H[4]);
        H[5] = _100(f, H[5]);
        H[6] = _100(g, H[6]);
        H[7] = _100(h, H[7]);
      }
      if ('SHA-224' === _fb && 2 & _a3) {
        _108 = [H[0], H[1], H[2], H[3], H[4], H[5], H[6]];
      } else {
        if ('SHA-256' === _fb && 2 & _a3) {
          _108 = H;
        } else {
          if ('SHA-384' === _fb && 4 & _a3) {
            _108 = [
              H[0].highOrder,
              H[0].lowOrder,
              H[1].highOrder,
              H[1].lowOrder,
              H[2].highOrder,
              H[2].lowOrder,
              H[3].highOrder,
              H[3].lowOrder,
              H[4].highOrder,
              H[4].lowOrder,
              H[5].highOrder,
              H[5].lowOrder,
            ];
          } else {
            if ('SHA-512' === _fb && 4 & _a3) {
              _108 = [
                H[0].highOrder,
                H[0].lowOrder,
                H[1].highOrder,
                H[1].lowOrder,
                H[2].highOrder,
                H[2].lowOrder,
                H[3].highOrder,
                H[3].lowOrder,
                H[4].highOrder,
                H[4].lowOrder,
                H[5].highOrder,
                H[5].lowOrder,
                H[6].highOrder,
                H[6].lowOrder,
                H[7].highOrder,
                H[7].lowOrder,
              ];
            } else {
              throw 'Unexpected error in SHA-2 implementation';
            }
          }
        }
      }
      return _108;
    }
    var _109 = function (_10a, _10b, _10c) {
      var sha1 = null,
        _10d = null,
        _10e = null,
        _10f = null,
        _110 = null,
        _111 = 0,
        _112 = [0],
        _113 = 0,
        _114 = null;
      _113 = 'undefined' !== typeof _10c ? _10c : 8;
      if (!(8 === _113 || 16 === _113)) {
        throw 'charSize must be 8 or 16';
      }
      if ('HEX' === _10b) {
        if (0 !== _10a.length % 2) {
          throw 'srcString of HEX type must be in byte increments';
        }
        _114 = _ab(_10a);
        _111 = _114['binLen'];
        _112 = _114['value'];
      } else {
        if ('ASCII' === _10b || 'TEXT' === _10b) {
          _114 = _a7(_10a, _113);
          _111 = _114['binLen'];
          _112 = _114['value'];
        } else {
          if ('B64' === _10b) {
            _114 = _ad(_10a);
            _111 = _114['binLen'];
            _112 = _114['value'];
          } else {
            throw 'inputFormat must be HEX, TEXT, ASCII, or B64';
          }
        }
      }
      this.getHash = function (_115, _116, _117) {
        var _118 = null,
          _119 = _112.slice(),
          _11a = '';
        switch (_116) {
          case 'HEX':
            _118 = _b5;
            break;
          case 'B64':
            _118 = _bb;
            break;
          default:
            throw 'format must be HEX or B64';
        }
        if ('SHA-1' === _115 && 1 & _a3) {
          if (null === sha1) {
            sha1 = _f0(_119, _111);
          }
          _11a = _118(sha1, _c1(_117));
        } else {
          if ('SHA-224' === _115 && 2 & _a3) {
            if (null === _10d) {
              _10d = _f8(_119, _111, _115);
            }
            _11a = _118(_10d, _c1(_117));
          } else {
            if ('SHA-256' === _115 && 2 & _a3) {
              if (null === _10e) {
                _10e = _f8(_119, _111, _115);
              }
              _11a = _118(_10e, _c1(_117));
            } else {
              if ('SHA-384' === _115 && 4 & _a3) {
                if (null === _10f) {
                  _10f = _f8(_119, _111, _115);
                }
                _11a = _118(_10f, _c1(_117));
              } else {
                if ('SHA-512' === _115 && 4 & _a3) {
                  if (null === _110) {
                    _110 = _f8(_119, _111, _115);
                  }
                  _11a = _118(_110, _c1(_117));
                } else {
                  throw 'Chosen SHA variant is not supported';
                }
              }
            }
          }
        }
        return _11a;
      };
      this.getHMAC = function (key, _11b, _11c, _11d, _11e) {
        var _11f,
          _120,
          _121,
          _122,
          i,
          _123,
          _124,
          _125,
          _126,
          _127 = [],
          _128 = [],
          _114 = null;
        switch (_11d) {
          case 'HEX':
            _11f = _b5;
            break;
          case 'B64':
            _11f = _bb;
            break;
          default:
            throw 'outputFormat must be HEX or B64';
        }
        if ('SHA-1' === _11c && 1 & _a3) {
          _121 = 64;
          _126 = 160;
        } else {
          if ('SHA-224' === _11c && 2 & _a3) {
            _121 = 64;
            _126 = 224;
          } else {
            if ('SHA-256' === _11c && 2 & _a3) {
              _121 = 64;
              _126 = 256;
            } else {
              if ('SHA-384' === _11c && 4 & _a3) {
                _121 = 128;
                _126 = 384;
              } else {
                if ('SHA-512' === _11c && 4 & _a3) {
                  _121 = 128;
                  _126 = 512;
                } else {
                  throw 'Chosen SHA variant is not supported';
                }
              }
            }
          }
        }
        if ('HEX' === _11b) {
          _114 = _ab(key);
          _125 = _114['binLen'];
          _120 = _114['value'];
        } else {
          if ('ASCII' === _11b || 'TEXT' === _11b) {
            _114 = _a7(key, _113);
            _125 = _114['binLen'];
            _120 = _114['value'];
          } else {
            if ('B64' === _11b) {
              _114 = _ad(key);
              _125 = _114['binLen'];
              _120 = _114['value'];
            } else {
              throw 'inputFormat must be HEX, TEXT, ASCII, or B64';
            }
          }
        }
        _122 = _121 * 8;
        _124 = _121 / 4 - 1;
        if (_121 < _125 / 8) {
          if ('SHA-1' === _11c && 1 & _a3) {
            _120 = _f0(_120, _125);
          } else {
            if (6 & _a3) {
              _120 = _f8(_120, _125, _11c);
            } else {
              throw 'Unexpected error in HMAC implementation';
            }
          }
          _120[_124] &= 4294967040;
        } else {
          if (_121 > _125 / 8) {
            _120[_124] &= 4294967040;
          }
        }
        for (i = 0; i <= _124; i += 1) {
          _127[i] = _120[i] ^ 909522486;
          _128[i] = _120[i] ^ 1549556828;
        }
        if ('SHA-1' === _11c && 1 & _a3) {
          _123 = _f0(_128.concat(_f0(_127.concat(_112), _122 + _111)), _122 + _126);
        } else {
          if (6 & _a3) {
            _123 = _f8(_128.concat(_f8(_127.concat(_112), _122 + _111, _11c)), _122 + _126, _11c);
          } else {
            throw 'Unexpected error in HMAC implementation';
          }
        }
        return _11f(_123, _c1(_11e));
      };
    };
    _a2['jsSHA'] = _109;
  })(window)
);
// Base64 = {};
// Base64.byteToCharMap_ = null;
// Base64.charToByteMap_ = null;
// Base64.byteToCharMapWebSafe_ = null;
// Base64.charToByteMapWebSafe_ = null;
// Base64.ENCODED_VALS_BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789';
// Base64.ENCODED_VALS = Base64.ENCODED_VALS_BASE + '+/=';
// Base64.ENCODED_VALS_WEBSAFE = Base64.ENCODED_VALS_BASE + '-_.';
// Base64.encodeByteArray = function (_129, _12a) {
//   Base64.init_();
//   var _12b = _12a ? Base64.byteToCharMapWebSafe_ : Base64.byteToCharMap_;
//   var _12c = [];
//   for (var i = 0; i < _129.length; i += 3) {
//     var _12d = _129[i];
//     var _12e = i + 1 < _129.length;
//     var _12f = _12e ? _129[i + 1] : 0;
//     var _130 = i + 2 < _129.length;
//     var _131 = _130 ? _129[i + 2] : 0;
//     var _132 = _12d >> 2;
//     var _133 = ((_12d & 3) << 4) | (_12f >> 4);
//     var _134 = ((_12f & 15) << 2) | (_131 >> 6);
//     var _135 = _131 & 63;
//     if (!_130) {
//       _135 = 64;
//       if (!_12e) {
//         _134 = 64;
//       }
//     }
//     _12c.push(_12b[_132], _12b[_133], _12b[_134], _12b[_135]);
//   }
//   return _12c.join('');
// };
// Base64.init_ = function () {
//   if (!Base64.byteToCharMap_) {
//     Base64.byteToCharMap_ = {};
//     Base64.charToByteMap_ = {};
//     Base64.byteToCharMapWebSafe_ = {};
//     Base64.charToByteMapWebSafe_ = {};
//     for (var i = 0; i < Base64.ENCODED_VALS.length; i++) {
//       Base64.byteToCharMap_[i] = Base64.ENCODED_VALS.charAt(i);
//       Base64.charToByteMap_[Base64.byteToCharMap_[i]] = i;
//       Base64.byteToCharMapWebSafe_[i] = Base64.ENCODED_VALS_WEBSAFE.charAt(i);
//       Base64.charToByteMapWebSafe_[Base64.byteToCharMapWebSafe_[i]] = i;
//     }
//   }
// };
