import { beginCell, Cell } from "ton";
import { SmartContract } from "ton-contract-executor";
import { internalMessage, randomAddress } from "./helpers";

import { hex } from "../build/main.compiled.json";

describe("sample test", () => {
  let contract: SmartContract;

  beforeEach(async () => {
    contract = await SmartContract.fromCell(
      Cell.fromBoc(hex)[0] as any, // code cell from build output
      beginCell().endCell(),
      {
        debug: true,
      }
    );
  });

  it("should not drop", async () => {
    const tx = await contract.sendInternalMessage(
      internalMessage({
        from: randomAddress("notowner"),
        body: beginCell()
          .storeUint(69, 32) // op code
          .storeUint(0, 32) // query
          .endCell(),
      }) as any
    );

    console.log(tx.type);
    console.log(tx.debugLogs);
    console.log(tx.gas_consumed);
  });

  it("run get method", async () => {
    const tx = await contract.invokeGetMethod('get_test_number', []);
    console.log(tx.type);
    console.log(tx.gas_consumed);
    console.log(tx.result[0]);
  });
});
