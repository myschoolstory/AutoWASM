const globalWithBuildStore = globalThis as any;
if (!globalWithBuildStore.__BUILD_STORE__) {
  globalWithBuildStore.__BUILD_STORE__ = [];
}

export function addBuild(build) {
  globalWithBuildStore.__BUILD_STORE__.push(build);
}

export function getBuilds() {
  return globalWithBuildStore.__BUILD_STORE__;
}
