/// <reference path="./bignumber.d.ts" />

import rsa, { BigInteger } from "node-bignumber";
import { SecureRandom } from "./utils/rng";
import jsSHA from "jssha";
import crypto from "crypto";
class E2EE {
  mod: string;
  exp: string;
  e2eeSid: string;
  serverRandom: string;
  password: string;
  private formattedPin: number[] = [];

  constructor(
    pubKey: string,
    e2eeSid: string,
    serverRandom: string,
    password: string
  ) {
    let pubStr = pubKey.split(",");
    this.mod = pubStr[0];
    this.exp = pubStr[1];
    this.e2eeSid = e2eeSid;
    this.serverRandom = serverRandom;
    this.password = password;
  }

  private zeroPad(str: string, len: number) {
    let res = str;
    for (; res.length < len; ) {
      res = "0" + res;
    }
    return res;
  }

  private _formatPINMessage() {
    const str2bin = [...Buffer.from(this.password)];
    const pinBlock = [...this._createPINBlock(str2bin)];
    const hexDecode = [...Buffer.from(this.serverRandom, "hex")];
    this.formattedPin = [1].concat(pinBlock, hexDecode);
  }

  private _createPINBlock(pwBinArr: number[]): Buffer {
    let res: number[] = [193, pwBinArr.length];
    for (let strbin of pwBinArr) {
      res.push(strbin);
    }
    while (res.length % 8) {
      res.push(255);
    }
    return Buffer.from(res);
  }

  amHash256(hexPlain: number[]): number[] {
    const shaObj = new jsSHA("SHA-256", "UINT8ARRAY");
    return [
      ...Buffer.from(
        shaObj.update(new Uint8Array(hexPlain)).getHash("HEX"),
        "hex"
      ),
    ];
  }
  private oaepEncode(len: number, seed: number[]) {
    let a = 32,
      c = this.formattedPin.length,
      v: number[] = [],
      m: number,
      S: number;
    if (c > len - 2 * a - 2) {
      throw "The message to be encrypted is too long";
    }
    for (m = len - c - 2 * a - 2, S = 0; S < m; S++) {
      v[S] = 0;
    }
    let O = this.amHash256(seed);
    let C: any[] = [];
    C = O.concat(v, [1], this.formattedPin);
    // //MGF Seed 32 Len;
    // let L = [
    //   157, 64, 134, 137, 167, 126, 212, 219, 3, 228, 8, 65, 35, 251, 52, 111,
    //   108, 102, 231, 129, 138, 210, 80, 118, 153, 162, 209, 206, 107, 216, 221,
    //   98,
    // ];

    let L = [...new Uint8Array(crypto.randomBytes(32))];
    let D = this.MGF1(L, len - a - 1);
    if (C.length != D.length) {
      throw `XOR Error [The ${C.length} and ${D.length} not equal length]`;
    }
    let K = C.map((_, index) => C[index] ^ D[index]);
    let U = this.MGF1(K, a);
    if (L.length != U.length) {
      throw `XOR Error [The ${L.length} and ${U.length} not equal length]`;
    }
    let Z = L.map((_, index) => L[index] ^ U[index]);
    return [0].concat(Z, K);
  }

  private MGF1(r: number[], n: number) {
    let v: (s: number[]) => number[],
      o: number[] = [],
      a: number[] = [],
      s: number[] = [],
      c: number = 0;
    v = this.amHash256;
    for (var m = 0; c < n; m++) {
      (o[0] = (m >> 24) & 255),
        (o[1] = (m >> 16) & 255),
        (o[2] = (m >> 8) & 255),
        (o[3] = 255 & m),
        (s = v(r.concat(o)));
      for (var O = 0; O < s.length && c < n; O++, c++) a[c] = s[O];
    }
    return a;
  }
  encryptAndGenLabel() {
    let seed = new Array(16);
    new SecureRandom().nextBytes(seed);
    let sLabel = "";
    sLabel = seed.reduce(
      (a: string, b: number) => a.toString() + b.toString(16),
      ""
    );
    sLabel = this.zeroPad(sLabel, 32);
    let enc = this.encrypt(seed);
    return (sLabel + ":" + enc).toUpperCase();
  }
  encrypt(seed: number[]) {
    const pub = new rsa.Key();
    // pub.setPublic(new BigInteger(this.mod), new BigInteger(this.exp));
    pub.setPublic(this.mod, this.exp);
    const oaep = this.oaepEncode(this.mod.length / 2, seed);
    const enc = pub.doPublic(new BigInteger(oaep));
    const h =
      (enc.toString(16).length & 1) === 0
        ? enc.toString(16)
        : "0" + enc.toString(16);
    return this.zeroPad(h, this.mod.length).toUpperCase();
  }

  encryptRSAOAEPSHA512() {
    this._formatPINMessage();
    return this.e2eeSid + "," + this.encryptAndGenLabel();
  }
}

export default E2EE;