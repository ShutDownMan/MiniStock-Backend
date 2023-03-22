/*
  Warnings:

  - You are about to drop the `_ClienteToUsuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FornecedorToUsuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ClienteToUsuario` DROP FOREIGN KEY `_ClienteToUsuario_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ClienteToUsuario` DROP FOREIGN KEY `_ClienteToUsuario_B_fkey`;

-- DropForeignKey
ALTER TABLE `_FornecedorToUsuario` DROP FOREIGN KEY `_FornecedorToUsuario_A_fkey`;

-- DropForeignKey
ALTER TABLE `_FornecedorToUsuario` DROP FOREIGN KEY `_FornecedorToUsuario_B_fkey`;

-- DropTable
DROP TABLE `_ClienteToUsuario`;

-- DropTable
DROP TABLE `_FornecedorToUsuario`;
