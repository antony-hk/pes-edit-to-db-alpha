import { join } from "https://deno.land/std@0.168.0/path/mod.ts";
import generate from "https://x.nest.land/denoname@0.8.2/mod.ts";

const { dirname } = generate(import.meta);
const projectRoot = join(dirname, '..');

export default function relativePath(...input: string[]): string {
    return join(projectRoot, ...input);
}
