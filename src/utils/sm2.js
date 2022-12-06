import {
  sm2
} from 'sm-crypto';

//生成公私钥
export const getSm2Key = () => {
   const key = sm2.generateKeyPairHex()
  console.log('key', key)
  return key
}