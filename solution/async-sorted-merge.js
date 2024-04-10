"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  const combinedLogEntries = [];

  await Promise.all(
    logSources.map(async (logSource) => {
      combinedLogEntries.push(logSource.last);
      let popped = await logSource.popAsync();

      while (popped !== false) {
        combinedLogEntries.push(popped);
        popped = await logSource.popAsync();
      }
    })
  );

  combinedLogEntries.sort((a, b) => {
    return a.date.valueOf() - b.date.valueOf();
  });

  combinedLogEntries.forEach((logEntry) => {
    printer.print(logEntry);
  });

  printer.done();

  return console.log("Async sort complete.");
};
