/*
  Warnings:

  - You are about to drop the column `created_at` on the `check_in` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_check_in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_att" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendae_id" INTEGER NOT NULL,
    CONSTRAINT "check_in_attendae_id_fkey" FOREIGN KEY ("attendae_id") REFERENCES "attendaes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_check_in" ("attendae_id", "id") SELECT "attendae_id", "id" FROM "check_in";
DROP TABLE "check_in";
ALTER TABLE "new_check_in" RENAME TO "check_in";
CREATE UNIQUE INDEX "check_in_attendae_id_key" ON "check_in"("attendae_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
