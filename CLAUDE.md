# Claude Code Instructions

## Package Manager

Always use **yarn** (not npm) for all package management tasks in this repository.

- Install dependencies: `yarn install`
- Add a package: `yarn add <package>`
- Add a dev dependency: `yarn add -D <package>`
- Remove a package: `yarn remove <package>`
- Run scripts: `yarn <script>` (e.g. `yarn dev`, `yarn build`, `yarn test`)

Do not use `npm install`, `npm run`, or any other npm commands.

## Running Tests

The test suite includes YouTube embeddability checks that make real outbound HTTP requests. This environment has no internet access, so those tests will always fail with network errors. Do not attempt to run the test suite to verify changes — rely on the logic of the code instead.
