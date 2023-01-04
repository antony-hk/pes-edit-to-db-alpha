# pes-edit-to-db-alpha

`pes-edit-to-db-alpha` is a prototype of a tool merging the Edit Data (`EDIT00000000`) back into the `pesdb` binary files for "eFootball PES 2021 SEASON UPDATE".

## Usages
Currently it supports merging the data from EDIT00000000 to the following files:

* PlayerAssignment.bin
* Tactics.bin
* TacticsFormation.bin


## How to use
1. Clone the code
2. Run the following command in your shell / common prompt
```
deno --unstable run --allow-env --allow-read --allow-run --allow-write cli.ts
```
