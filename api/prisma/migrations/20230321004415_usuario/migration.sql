-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeUsuario` VARCHAR(45) NOT NULL,
    `emailUsuario` VARCHAR(45) NOT NULL,
    `senhaUsuario` VARCHAR(45) NOT NULL,
    `isAdm` TINYINT NOT NULL,
    `isAtivo` TINYINT NOT NULL,
    `isLogado` TINYINT NOT NULL,
    `isPrimeiroAcesso` TINYINT NOT NULL,

    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClienteToUsuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClienteToUsuario_AB_unique`(`A`, `B`),
    INDEX `_ClienteToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FornecedorToUsuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FornecedorToUsuario_AB_unique`(`A`, `B`),
    INDEX `_FornecedorToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClienteToUsuario` ADD CONSTRAINT `_ClienteToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cliente`(`codCliente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToUsuario` ADD CONSTRAINT `_ClienteToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FornecedorToUsuario` ADD CONSTRAINT `_FornecedorToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `Fornecedor`(`codFornecedor`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FornecedorToUsuario` ADD CONSTRAINT `_FornecedorToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
