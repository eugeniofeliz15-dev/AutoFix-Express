/*
  Warnings:

  - You are about to drop the column `role` on the `Usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "role",
ADD COLUMN     "rol" "Role" NOT NULL DEFAULT 'RECEPCIONISTA';
