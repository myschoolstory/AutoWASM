"use server";

import { NextResponse } from 'next/server';
import { getBuilds } from '@/store/buildStore';

export async function GET() {
  const buildResults = getBuilds();
  return NextResponse.json({ results: buildResults });
}
