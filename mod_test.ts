/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { assertEquals } from "./test_deps.ts";
import * as _ from "./mod.ts";

// TODO: Add more tests
Deno.test("foo test", () => {
  assertEquals(true, true);
});
