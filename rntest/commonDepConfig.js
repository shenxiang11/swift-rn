function createModuleIdFactory() {
  return function createModuleId(path) {
    const projectRootPath = __dirname;
    let moduleId = path.substr(projectRootPath.length + 1);
    return moduleId;
  };
}

module.exports = {
  serializer: {
    createModuleIdFactory,
  },
};
