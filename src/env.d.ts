// declare CSS modules and inline imports
declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.css?inline' {
  const content: string;
  export default content;
}

// Extend Window and WorkerGlobalScope
interface Window {
  LanguageDetector: typeof LanguageDetector;
}

interface WorkerGlobalScope {
  LanguageDetector: typeof LanguageDetector;
}