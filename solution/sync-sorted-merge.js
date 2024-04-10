"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const combinedLogEntries = [];

  logSources.forEach((logSource) => {
    combinedLogEntries.push(logSource.last);

    let popped = logSource.pop();

    while (popped !== false) {
      combinedLogEntries.push(popped);
      popped = logSource.pop();
    }
  });

  combinedLogEntries.sort((a, b) => {
    return a.date.valueOf() - b.date.valueOf();
  });

  combinedLogEntries.forEach((logEntry) => {
    printer.print(logEntry);
  });

  printer.done();
  return console.log("Sync sort complete.");
};
