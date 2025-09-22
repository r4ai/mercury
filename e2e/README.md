# E2E Tests

This directory contains the e2e tests for the projects in the [`examples`](../examples/) directory.

## Test File Structure

The test for a specific project must be located in a corresponding test file. For example, the test for `examples/react` is written in `tests/react.spec.ts`.

When you test `tests/react.spec.ts`, it automatically starts the development or production server for `examples/react` and executes the tests against it.

```ts
// tests/react.spec.ts
import { test, expect } from "../utils/test";

// The `serverURL` variable contains the URL of the started local server.
test("to be rendered", async ({ page, serverURL }) => {
  await page.goto(serverURL);
  await expect(page.getByText("Presentation")).toBeVisible();
});
```

### How to Run Specific Tests

- Run all tests:

  ```shell
  bun run --cwd=e2e e2e
  ```

- Run only the tests for `examples/react`:

  ```shell
  bun run --cwd=e2e e2e -- --project "react-*"
  ```

- Run only the tests for `examples/react` on Chromium:

  ```shell
  bun run --cwd=e2e e2e -- --project "react-*-chrome"
  ```

- Run only the tests for `examples/react` in dev mode on Chromium:

  ```
  bun run --cwd=e2e e2e -- --project "react-dev-chromium"
  ```
