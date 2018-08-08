const manifestDiff = (ml, mr) => {
  const result = {
    added: [],
    removed: [],
    changed: [],
  };

  // According to the manifest both builds are equal
  // nothing to here
  if (ml.sum === mr.sum) {
    return result;
  }

  // Go to the left manifest and find:
  // 1. Files that do not exist on the right manifest (Added files)
  // 2. File with a different checkums (changed files)
  ml.snapshot.reduce((acc, file) => {
    const fileR = mr.snapshot.find(fr => fr.name === file.name);

    if (!fileR) {
      acc.added.push(file);
    } else if (fileR.sum !== file.sum) {
      acc.changed.push(file);
    }

    return acc;
  }, result);

  // Go to the right manifest and find:
  // 1. Files that do not exist on the left manifest (Removed files)
  mr.snapshot.reduce((acc, file) => {
    const fileL = ml.snapshot.find(fl => fl.name === file.name);

    if (!fileL) {
      acc.removed.push(file);
    }

    return acc;
  }, result);

  return result;
};

module.exports = manifestDiff;
