/*
  Warnings:

  - Added the required column `saltSenha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `saltSenha` VARCHAR(45) NOT NULL;
