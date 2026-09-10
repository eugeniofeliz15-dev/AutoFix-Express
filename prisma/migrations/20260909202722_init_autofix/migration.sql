/*
  Warnings:

  - You are about to drop the column `creadoEn` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `creadoEn` on the `vehiculos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "creadoEn",
ADD COLUMN     "creadoAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "telefono" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "vehiculos" DROP COLUMN "creadoEn",
ADD COLUMN     "creadoAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
