const crypto = require("crypto");
const { DPK } = require('./constants/dpk.constants');

exports.deterministicPartitionKey = (event) => {
  return validateCandidate(getHashKey(event));
};


const updateHash = (data) => {
  const hash =  crypto.createHash("sha3-512").update(data).digest("hex")
  console.log(hash)
  return hash
}

const validateCandidate = (candidate) => {
  if (candidate) {
    if (typeof candidate !== "string") {
      candidate =  JSON.stringify(candidate);
    }
  } else {
    candidate = DPK.TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > DPK.MAX_PARTITION_KEY_LENGTH) {
    candidate = updateHash(candidate);
  }
  return candidate
}

const getHashKey = (event) => {
  if (event) {
    if (event.partitionKey) {
       return event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      return updateHash(data);
    }
  }
}

// const crypto = require("crypto");

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };