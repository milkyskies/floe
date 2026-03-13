import { execFileSync } from "node:child_process";

export interface ZenScriptConfig {
  /** Path to the zsc binary. Defaults to "zsc". */
  compiler?: string;
  /** File extensions to process. Defaults to [".zs"]. */
  extensions?: string[];
}

/**
 * Next.js plugin for ZenScript.
 *
 * Adds a webpack loader that compiles `.zs` files to TypeScript
 * during the Next.js build process. Works with both App Router
 * and Pages Router.
 *
 * @example
 * ```js
 * // next.config.js
 * import withZenScript from "next-zenscript"
 *
 * export default withZenScript({
 *   // your normal Next.js config
 * })
 * ```
 */
export default function withZenScript(
  zenConfig: ZenScriptConfig = {},
) {
  const compiler = zenConfig.compiler ?? "zsc";
  const extensions = zenConfig.extensions ?? [".zs"];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (nextConfig: any = {}) => {
    return {
      ...nextConfig,

      webpack(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options: any,
      ) {
        // Add .zs to resolve extensions
        config.resolve.extensions.push(...extensions);

        // Add the ZenScript loader
        config.module.rules.push({
          test: /\.zs$/,
          use: [
            {
              loader: "next-zenscript/loader",
              options: { compiler },
            },
          ],
        });

        // Chain with existing webpack config
        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    };
  };
}

/**
 * Webpack loader for ZenScript files.
 *
 * Compiles .zs source to TypeScript using the zsc compiler.
 */
export function zenscriptLoader(
  this: { resourcePath: string; getOptions: () => { compiler?: string } },
  source: string,
): string {
  const options = this.getOptions();
  const compiler = options.compiler ?? "zsc";

  try {
    const output = execFileSync(compiler, ["build", "--emit-stdout", "-"], {
      input: source,
      encoding: "utf-8",
      timeout: 30_000,
      env: {
        ...process.env,
        ZSC_FILENAME: this.resourcePath,
      },
    });

    return output;
  } catch (error) {
    if (error && typeof error === "object" && "stderr" in error) {
      const stderr = (error as { stderr: string | Buffer }).stderr;
      throw new Error(
        `ZenScript compilation failed for ${this.resourcePath}:\n${String(stderr)}`,
      );
    }
    throw error;
  }
}
