-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_attendaes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" TEXT NOT NULL,
    CONSTRAINT "attendaes_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_attendaes" ("create_at", "email", "event_id", "id", "name") SELECT "create_at", "email", "event_id", "id", "name" FROM "attendaes";
DROP TABLE "attendaes";
ALTER TABLE "new_attendaes" RENAME TO "attendaes";
CREATE UNIQUE INDEX "attendaes_event_id_email_key" ON "attendaes"("event_id", "email");
CREATE TABLE "new_check_in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_att" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendae_id" INTEGER NOT NULL,
    CONSTRAINT "check_in_attendae_id_fkey" FOREIGN KEY ("attendae_id") REFERENCES "attendaes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_check_in" ("attendae_id", "created_att", "id") SELECT "attendae_id", "created_att", "id" FROM "check_in";
DROP TABLE "check_in";
ALTER TABLE "new_check_in" RENAME TO "check_in";
CREATE UNIQUE INDEX "check_in_attendae_id_key" ON "check_in"("attendae_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
