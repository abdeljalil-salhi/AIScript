import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  // Define GraphQL schema provided by Refine
  schema: "http://localhost:3000/graphql",
  extensions: {
    /**
     * `codegen` is a plugin that generates typescript types from GraphQL schema
     * @see https://the-guild.dev/graphql/codegen
     */
    codegen: {
      // Hooks are commands that are executed after a certain event
      hooks: {
        afterOneFileWrite: ["eslint --fix", "prettier --write"],
      },
      // Generates typescript types from GraphQL schema
      generates: {
        // Specify the output path of the generated types
        "src/graphql/schema.types.ts": {
          // Use typescript plugin
          plugins: ["typescript"],
          // Set the config of the typescript plugin
          // This defines how the generated types will look like
          config: {
            skipTypename: true, // `skipTypename` is used to remove __typename from the generated types
            enumsAsTypes: true, // `enumsAsTypes` is used to generate enums as types instead of enums.
            // Scalars is used to define how the scalars i.e. DateTime, JSON, etc. will be generated
            // Scalar is a type that is not a list and does not have fields. Meaning it is a primitive type.
            scalars: {
              // `DateTime` is a scalar type that is used to represent date and time
              DateTime: {
                input: "string",
                output: "string",
                format: "date-time",
              },
            },
          },
        },
        // Generates typescript types from GraphQL operations
        // GraphQL operations are queries, mutations, and subscriptions we write in our code to communicate with the GraphQL API
        "src/graphql/types.ts": {
          // `preset` is a plugin that is used to generate typescript types from GraphQL operations
          // `import-types` suggests to import types from schema.types.ts or other files
          // This is used to avoid duplication of types
          // https://the-guild.dev/graphql/codegen/plugins/presets/import-types-preset
          preset: "import-types",
          // `documents` is used to define the path of the files that contain GraphQL operations
          documents: ["src/**/*.{ts,tsx}"],
          // `plugins` is used to define the plugins that will be used to generate typescript types from GraphQL operations
          plugins: ["typescript-operations"],
          config: {
            skipTypename: true,
            enumsAsTypes: true,
            // Determine whether the generated types should be resolved ahead of time or not.
            // When `preResolveTypes` is set to false, the code generator will not try to resolve the types ahead of time.
            // Instead, it will generate more generic types, and the actual types will be resolved at runtime.
            preResolveTypes: false,
            // `useTypeImports` is used to import types using import type instead of import.
            useTypeImports: true,
          },
          // `presetConfig` is used to define the config of the preset
          presetConfig: {
            typesPath: "./schema.types",
          },
        },
      },
    },
  },
};

export default config;
