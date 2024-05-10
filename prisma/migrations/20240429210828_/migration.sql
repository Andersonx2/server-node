/*
  Warnings:

  - You are about to drop the `check_ins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "check_ins";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "check_in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendae_id" INTEGER NOT NULL,
    CONSTRAINT "check_in_attendae_id_fkey" FOREIGN KEY ("attendae_id") REFERENCES "attendaes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "check_in_attendae_id_key" ON "check_in"("attendae_id");
