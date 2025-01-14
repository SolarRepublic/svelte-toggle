import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import svelteReadme from "svelte-readme";
import pkg from "./package.json";

export default () => {
  if (!process.env.BUNDLE) {
    return svelteReadme({
      style: `
        .code-fence > strong {
          display: block;
          margin-top: 1rem;
        }

        .code-fence > div {
          margin-bottom: 16px;
        }

        .code-fence strong {
          margin-left: 0.5rem;
        }
      `,
    });
  }

  return ["es", "umd"].map((format) => {
    const UMD = format === "umd";

    return {
      input: pkg.svelte,
      output: {
        format,
        file: UMD ? pkg.main : pkg.module,
        name: UMD ? pkg.name : undefined,
        exports: "named",
      },
      plugins: [svelte({ emitCss: false }), resolve()],
    };
  });
};
