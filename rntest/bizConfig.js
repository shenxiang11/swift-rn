function createModuleId(path) {
  const projectRootPath = __dirname;
  let moduleId = path.substr(projectRootPath.length + 1);
  return moduleId;
}

const commonModules = ['react', 'react-native'];

function processModuleFilter(module) {
  const moduleId = createModuleId(module.path);

  for (let i = 0, len = commonModules.length; i < len; i++) {
    if (moduleId.includes(commonModules[i])) {
      return false;
    }
  }

  return true;
}

function createModuleIdFactory() {
  return createModuleId;
}

module.exports = {
  serializer: {
    createModuleIdFactory,
    processModuleFilter,
  },
};
