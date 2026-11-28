import { appendFile, writeFile } from 'node:fs/promises';
import { resolveScheduledRelease } from '../src/data/github.ts';

const { GITHUB_SHA, GITHUB_OUTPUT, ESO_RELEASE_SNAPSHOT_PATH } = process.env;
if (!GITHUB_SHA || !GITHUB_OUTPUT || !ESO_RELEASE_SNAPSHOT_PATH) {
  throw new Error('GITHUB_SHA, GITHUB_OUTPUT and ESO_RELEASE_SNAPSHOT_PATH are required.');
}

const { snapshot, reason } = await resolveScheduledRelease(GITHUB_SHA);
console.log(reason);

if (snapshot) {
  await writeFile(ESO_RELEASE_SNAPSHOT_PATH, JSON.stringify(snapshot));
  await appendFile(GITHUB_OUTPUT, `should_build=true\nsnapshot_path=${ESO_RELEASE_SNAPSHOT_PATH}\n`);
} else {
  await appendFile(GITHUB_OUTPUT, 'should_build=false\n');
}
