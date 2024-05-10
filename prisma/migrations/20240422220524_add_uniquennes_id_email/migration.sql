/*
  Warnings:

  - A unique constraint covering the columns `[event_id,email]` on the table `attendaes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attendaes_event_id_email_key" ON "attendaes"("event_id", "email");
 