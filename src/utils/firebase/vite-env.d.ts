// src/vite-env.d.ts
interface ImportMetaEnv {
  DEV: any;
  VITE_firebaseConfig: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
