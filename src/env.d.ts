/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "@alpinejs/collapse" {
  import type { Alpine } from "alpinejs";
  const Collapse: (Alpine: Alpine) => void;
  export default Collapse;
}

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
