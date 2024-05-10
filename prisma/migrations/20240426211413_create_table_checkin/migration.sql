-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendae_id" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendae_id_fkey" FOREIGN KEY ("attendae_id") REFERENCES "attendaes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendae_id_key" ON "check_ins"("attendae_id");
