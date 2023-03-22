/*
  Warnings:

  - You are about to drop the column `isAdm` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `isAtivo` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `isLogado` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `isPrimeiroAcesso` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `senhaUsuario` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailUsuario]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `TipoUsuario_idTipoUsuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashSenha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Usuario` DROP COLUMN `isAdm`,
    DROP COLUMN `isAtivo`,
    DROP COLUMN `isLogado`,
    DROP COLUMN `isPrimeiroAcesso`,
    DROP COLUMN `senhaUsuario`,
    ADD COLUMN `TipoUsuario_idTipoUsuario` INTEGER NOT NULL,
    ADD COLUMN `hashSenha` VARCHAR(45) NOT NULL;

-- CreateTable
CREATE TABLE `TipoUsuario` (
    `idTipoUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeTipoUsuario` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idTipoUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_emailUsuario_key` ON `Usuario`(`emailUsuario`);

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `fk_Usuario_TipoUsuario1` FOREIGN KEY (`TipoUsuario_idTipoUsuario`) REFERENCES `TipoUsuario`(`idTipoUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
