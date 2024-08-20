// src/vite-env.d.ts
interface ImportMetaEnv {
  VITE_firebaseConfig: string;
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
