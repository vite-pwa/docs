/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENABLE_SWKIT_LOGS: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
