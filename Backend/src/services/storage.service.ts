import path from "node:path";
import { env } from "../config/env.js";

export function publicFileUrl(fileName: string) {
  return `${env.API_URL}/uploads/${encodeURIComponent(path.basename(fileName))}`;
}

export async function saveCloudReadyMetadata(fileName: string) {
  return {
    provider: process.env.STORAGE_PROVIDER ?? "local",
    key: fileName,
    url: publicFileUrl(fileName)
  };
}
