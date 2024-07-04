// Random number generator - requires a PRNG backend, e.g. prng4.js
import {Arcfour, prng_newstate, rng_psize} from "./prng4";
let rng_state:Arcfour;
let rng_pool:number[] | undefined = undefined;
let rng_pptr:number;
function rng_seed_int(x:number) {
  rng_pool![rng_pptr++] ^= x & 255;
  rng_pool![rng_pptr++] ^= (x >> 8) & 255;
  rng_pool![rng_pptr++] ^= (x >> 16) & 255;
  rng_pool![rng_pptr++] ^= (x >> 24) & 255;
  if(rng_pptr >= rng_psize) rng_pptr -= rng_psize;
}

function rng_seed_time() {
  rng_seed_int(new Date().getTime());
}
// Initialize the pool with junk if needed.
if (!rng_pool) {
  rng_pool = [];
  rng_pptr = 0;
  let t:number;
  
  if(crypto && crypto.getRandomValues){
    var ua = new Uint8Array(32);
    crypto.getRandomValues(ua)
    for(t= 0; t<32;++t){
      rng_pool[rng_pptr++] = ua[t];
    }
  }

  while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
    t = Math.floor(65536 * Math.random());
    rng_pool[rng_pptr++] = t >>> 8;
    rng_pool[rng_pptr++] = t & 255;
  }
  rng_pptr = 0;
  rng_seed_time();

}

function rng_get_byte() {
  if (rng_state == null) {
    rng_state = prng_newstate();
    // At this point, we may not have collected enough entropy.  If not, fall back to Math.random
    while (rng_pptr < rng_psize) {
      const random = Math.floor(65536 * Math.random());
      rng_pool![rng_pptr++] = random & 255;
    }
    rng_state.init(rng_pool!);
    for (rng_pptr = 0; rng_pptr < rng_pool!.length; ++rng_pptr) {
        rng_pool![rng_pptr] = 0;
    }
    rng_pptr = 0;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
}


export class SecureRandom {
  public nextBytes(ba:number[]) {
      for (let i = 0; i < ba.length; ++i) {
          ba[i] = rng_get_byte();
      }
  }
}