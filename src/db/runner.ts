import { up, down } from "./migrations/posts";
import { up as up2, down as down2 } from "./migrations/users";

async function runMigration(migrationFunction: () => Promise<void>) {
  try {
    console.log(`Running migration: ${migrationFunction.name}`);
    await migrationFunction();
    console.log(`Migration ${migrationFunction.name} completed successfully`);
  } catch (error) {
    console.error(`Error running migration ${migrationFunction.name}:`, error);
  }
}

async function runMigrations(migrations: (() => Promise<void>)[]) {
  for (const migrationFunction of migrations) {
    await runMigration(migrationFunction);
  }
}

// const migrations = [down, down2];
const migrations = [up, up2];

runMigrations(migrations);
