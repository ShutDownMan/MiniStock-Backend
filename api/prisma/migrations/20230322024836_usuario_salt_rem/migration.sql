/*
  Warnings:

  - You are about to drop the column `saltSenha` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Usuario` DROP COLUMN `saltSenha`;

-- CreateTable
CREATE TABLE `Token` (
    `idToken` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(45) NOT NULL,
    `expiration` DATE NOT NULL,
    `expirado` TINYINT NOT NULL,
    `Usuario_idUsuario` INTEGER NOT NULL,

    UNIQUE INDEX `Token_token_key`(`token`),
    PRIMARY KEY (`idToken`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `fk_Token_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
