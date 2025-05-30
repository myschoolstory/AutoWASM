"use server";

import { NextResponse } from 'next/server';
import { runBuildPipeline } from '@/services/buildOrchestrator';
import { addBuild } from '@/store/buildStore';

export async function POST(request: Request) {
  try {
    const { repoUrl, oauthToken } = await request.json();
    if (!repoUrl) {
      return NextResponse.json({ error: 'Repository URL is required' }, { status: 400 });
    }

    const match = repoUrl.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/?$/);
    if (!match) {
      return NextResponse.json({ error: 'Invalid GitHub repository URL' }, { status: 400 });
    }

    const owner = match[1];
    const repo = match[2];
    const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    const headers: any = {};
    if (oauthToken) {
      headers['Authorization'] = `token ${oauthToken}`;
    }

    const response = await fetch(githubApiUrl, { headers });
    if (response.status === 200) {
      // Trigger build pipeline orchestrator asynchronously (using placeholder repo path and language)
      runBuildPipeline("/path/to/repo", "Rust").catch(err => console.error(err));
      
      // Store build submission in our in-memory store
      addBuild({
        id: Date.now().toString(),
        repo: `${owner}/${repo}`,
        status: "progress",
        wasmResult: { output: "Compilation in progress" },
        staticResult: { qualityScore: "Pending", codeMetrics: {} },
        builtAgo: "Just now"
      });
      
      return NextResponse.json({ message: 'Repository validated successfully. Build pipeline initiated.' });
    } else if (response.status === 404) {
      return NextResponse.json({ error: 'Repository not found' }, { status: 404 });
    } else {
      return NextResponse.json({ error: 'Failed to validate repository' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
