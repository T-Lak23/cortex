// import { cert, initializeApp } from "firebase-admin";

// const path = process.env.FIREBASE_KEY_PATH || "./serviceAccountKey.json";
// // import serviceAccount from "../serviceAccountKey.json" with { type: "json" };
// const serviceAccount = await import(path, {
//   assert: { type: "json" }, // Node 18+ supports JSON modules
// });

// export const app = initializeApp({
//   credential: cert(serviceAccount),
// });

import fs from "fs";
import { cert, initializeApp } from "firebase-admin/app";

const path = process.env.FIREBASE_KEY_PATH || "./serviceAccountKey.json";
const serviceAccount = JSON.parse(fs.readFileSync(path, "utf-8"));

export const app = initializeApp({
  credential: cert(serviceAccount),
});
