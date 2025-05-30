"use server";

import { NextResponse } from 'next/server';
import { runBuildPipeline } from '@/services/buildOrchestrator';

export async function POST(request: Request) {
  try {
    const { repoUrl, oauthToken } = await request.json();
    if (!repoUrl) {
      return NextResponse.json({ error: 'Repository URL is required' }, { status: 400 });
    }

    // Validate GitHub repository URL format
    const match = repoUrl.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/?$/);
    if (!match) {
      return NextResponse.json({ error: 'Invalid GitHub repository URL' }, { status: 400 });
    }

    const owner = match[1];
    const repo = match[2];
    const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    const headers = {};
    if (oauthToken) {
      headers['Authorization'] = `token ${oauthToken}`;
    }

    const response = await fetch(githubApiUrl, { headers });
    if (response.status === 200) {
      // Repository exists: trigger the build pipeline orchestrator
      runBuildPipeline("/path/to/repo", "Rust").catch(err => console.error(err));
      return NextResponse.json({ message: 'Repository validated. Build pipeline initiated.', buildId: 'build_' + Date.now() });
    } else if (response.status === 404) {
      return NextResponse.json({ error: 'Repository not found' }, { status: 404 });
    } else {
      return NextResponse.json({ error: 'Failed to validate repository' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
