import pino from "pino";

/**
 * Creates a namespaced pino logger instance.
 * Use this to generate module-specific loggers.
 */
export function createLogger(moduleName: string) {
  const isDev = process.env.NODE_ENV !== "production";
  const transport = isDev
    ? {
        target: "pino-pretty",
        options: { colorize: true, translateTime: "SYS:standard" }
      }
    : undefined;

  // Add module name as base binding for easy filtering
  return pino(
    {
      level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
      base: { module: moduleName }
    },
    transport as any
  );
}

/**
 * Returns a default logger (module name: App)
 */
export function getLogger() {
  return createLogger("App");
}
