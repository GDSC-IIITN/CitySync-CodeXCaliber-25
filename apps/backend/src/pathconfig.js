const tsConfigPaths = require("tsconfig-paths");
const tsConfig = require("../tsconfig.json");

// Calculate the base URL relative to the current directory
const baseUrl = "./dist";

// Register the path mapping
tsConfigPaths.register({
    baseUrl,
    paths: tsConfig.compilerOptions.paths,
});
