import { assertEquals } from "./test_deps.ts";
import { foo } from "./mod.ts";

Deno.test("foo test", () => {
  assertEquals(foo(), "hello");
});
