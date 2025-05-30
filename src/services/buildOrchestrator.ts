import { compileWasm } from "./wasmCompilationService";
import { runStaticAnalysis } from "./staticAnalysisService";

export async function runBuildPipeline(repoPath: string, language: string) {
  try {
    const [wasmResult, staticResult] = await Promise.all([
      compileWasm(repoPath, language),
      runStaticAnalysis(repoPath)
    ]);
    if (!wasmResult.success || !staticResult.success) {
      throw new Error(`Build failed: WASM error: ${wasmResult.output}, Static Analysis error: ${staticResult.qualityScore}`);
    }
    return { wasmResult, staticResult };
  } catch (error) {
    console.error("Error in build pipeline:", error.message);
    throw error;
  }
}
