/*
   deno --unstable run --allow-env --allow-read --allow-run --allow-write cli.ts
*/
import main from './edit-to-db.ts';

console.log(...Deno.args);
main(...Deno.args);