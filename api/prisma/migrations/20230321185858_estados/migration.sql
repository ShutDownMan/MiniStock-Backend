/*
  Warnings:

  - Added the required column `dataCadastro` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Produto` ADD COLUMN `dataCadastro` DATE NOT NULL;

-- AlterTable
ALTER TABLE `UnidadeFederativa` MODIFY `siglaUF` VARCHAR(5) NOT NULL;
