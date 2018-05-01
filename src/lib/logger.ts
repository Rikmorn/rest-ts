import { loggers, LoggerInstance } from "winston";

export enum Loggers {
  server,
  error,

  access,
}

loggers.add(Loggers[Loggers.server], {
  console: {
    label: "Server",
    colorize: true,
    timestamp: true,
    level: "silly",
  },
});

loggers.add(Loggers[Loggers.error], {
  console: {
    label: "Error",
    colorize: true,
    handleExceptions: false,
    prettyPrint: true,
    timestamp: true,
    level: "error",
  },
});

loggers.add(Loggers[Loggers.access], {
  console: {
    label: "Access",
    colorize: true,
    prettyPrint: false,
    timestamp: true,
    level: "info",
  },
});

export const get = (name: Loggers): LoggerInstance => {
  return loggers.get(Loggers[name]);
};
