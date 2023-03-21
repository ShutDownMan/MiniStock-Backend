-- CreateTable
CREATE TABLE `Bairro` (
    `idBairro` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeBairro` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idBairro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `codCliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCliente` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(20) NOT NULL,
    `cnpj` VARCHAR(20) NOT NULL,
    `isPessoaFisica` TINYINT NOT NULL,
    `telefoneCliente` VARCHAR(45) NOT NULL,
    `Endereco_idEndereco` INTEGER NOT NULL,

    INDEX `fk_Cliente_Endereco1_idx`(`Endereco_idEndereco`),
    PRIMARY KEY (`codCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `idEndereco` INTEGER NOT NULL AUTO_INCREMENT,
    `cepEndereco` VARCHAR(45) NOT NULL,
    `Bairro_idBairro` INTEGER NOT NULL,
    `Municipio_idMunicipio` INTEGER NOT NULL,
    `Logradouro_idLogradouro` INTEGER NOT NULL,

    INDEX `fk_Endereco_Bairro1_idx`(`Bairro_idBairro`),
    INDEX `fk_Endereco_Logradouro1_idx`(`Logradouro_idLogradouro`),
    INDEX `fk_Endereco_Municipio1_idx`(`Municipio_idMunicipio`),
    PRIMARY KEY (`idEndereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fornecedor` (
    `codFornecedor` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeFornecedor` VARCHAR(80) NOT NULL,
    `cnpj` VARCHAR(20) NOT NULL,
    `nroEndereco` INTEGER NOT NULL,
    `Endereco_idEndereco` INTEGER NOT NULL,

    INDEX `fk_Fornecedor_Endereco1_idx`(`Endereco_idEndereco`),
    PRIMARY KEY (`codFornecedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemCompra` (
    `Produto_codProduto` INTEGER NOT NULL,
    `NotaCompra_nroNotaCompra` INTEGER NOT NULL,
    `qtdItemCompra` INTEGER NOT NULL,
    `valorItemCompra` DOUBLE NOT NULL,

    INDEX `fk_Produto_has_NotaCompra_NotaCompra1_idx`(`NotaCompra_nroNotaCompra`),
    INDEX `fk_Produto_has_NotaCompra_Produto_idx`(`Produto_codProduto`),
    PRIMARY KEY (`Produto_codProduto`, `NotaCompra_nroNotaCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemVenda` (
    `Produto_codProduto` INTEGER NOT NULL,
    `NotaVenda_nroNotaVenda` INTEGER NOT NULL,
    `qtdItemVenda` INTEGER NOT NULL,
    `valorItemVenda` DOUBLE NOT NULL,

    INDEX `fk_Produto_has_NotaVenda_NotaVenda1_idx`(`NotaVenda_nroNotaVenda`),
    INDEX `fk_Produto_has_NotaVenda_Produto1_idx`(`Produto_codProduto`),
    PRIMARY KEY (`Produto_codProduto`, `NotaVenda_nroNotaVenda`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Logradouro` (
    `idLogradouro` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeLogradouro` VARCHAR(45) NOT NULL,
    `TipoLogradouro_idTipoLogradouro` INTEGER NOT NULL,

    INDEX `fk_Logradouro_TipoLogradouro1_idx`(`TipoLogradouro_idTipoLogradouro`),
    PRIMARY KEY (`idLogradouro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipio` (
    `idMunicipio` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeMunicipio` VARCHAR(45) NOT NULL,
    `UnidadeFederativa_idUnidadeFederativa` INTEGER NOT NULL,

    INDEX `fk_Municipio_UnidadeFederativa_idx`(`UnidadeFederativa_idUnidadeFederativa`),
    PRIMARY KEY (`idMunicipio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotaCompra` (
    `nroNotaCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `dataCompra` DATE NOT NULL,
    `Fornecedor_codFornecedor` INTEGER NOT NULL,
    `totalCompra` DOUBLE NOT NULL,
    `descontoCompra` DOUBLE NOT NULL,
    `valorLiquidoCompra` DOUBLE NOT NULL,

    INDEX `fk_NotaCompra_Fornecedor1_idx`(`Fornecedor_codFornecedor`),
    PRIMARY KEY (`nroNotaCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotaVenda` (
    `nroNotaVenda` INTEGER NOT NULL AUTO_INCREMENT,
    `dataVenda` DATE NOT NULL,
    `Cliente_codCliente` INTEGER NOT NULL,
    `totalVenda` DOUBLE NOT NULL,
    `descontoVenda` DOUBLE NOT NULL,
    `valorLiquidoVenda` DOUBLE NOT NULL,
    `isDinheiro` TINYINT NOT NULL,
    `Endereco_idEndereco` INTEGER NOT NULL,

    INDEX `fk_NotaVenda_Cliente1_idx`(`Cliente_codCliente`),
    INDEX `fk_NotaVenda_Endereco1_idx`(`Endereco_idEndereco`),
    PRIMARY KEY (`nroNotaVenda`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `codProduto` INTEGER NOT NULL AUTO_INCREMENT,
    `codigoBarras` VARCHAR(45) NOT NULL,
    `nomeProduto` VARCHAR(80) NOT NULL,
    `precoCusto` DOUBLE NOT NULL,
    `precoVenda` DOUBLE NOT NULL,
    `qtdAtualEstoque` INTEGER NOT NULL,
    `imagem` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`codProduto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto_has_TipoProduto` (
    `Produto_codProduto` INTEGER NOT NULL,
    `TipoProduto_idTipoProduto` INTEGER NOT NULL,

    INDEX `fk_Produto_has_TipoProduto_Produto1_idx`(`Produto_codProduto`),
    INDEX `fk_Produto_has_TipoProduto_TipoProduto1_idx`(`TipoProduto_idTipoProduto`),
    PRIMARY KEY (`Produto_codProduto`, `TipoProduto_idTipoProduto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoLogradouro` (
    `idTipoLogradouro` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeTipoLogradouro` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idTipoLogradouro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoProduto` (
    `idTipoProduto` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeTipoProduto` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idTipoProduto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnidadeFederativa` (
    `idUnidadeFederativa` INTEGER NOT NULL AUTO_INCREMENT,
    `siglaUF` VARCHAR(2) NOT NULL,
    `nomeUF` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idUnidadeFederativa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `fk_Cliente_Endereco1` FOREIGN KEY (`Endereco_idEndereco`) REFERENCES `Endereco`(`idEndereco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `fk_Endereco_Bairro1` FOREIGN KEY (`Bairro_idBairro`) REFERENCES `Bairro`(`idBairro`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `fk_Endereco_Logradouro1` FOREIGN KEY (`Logradouro_idLogradouro`) REFERENCES `Logradouro`(`idLogradouro`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `fk_Endereco_Municipio1` FOREIGN KEY (`Municipio_idMunicipio`) REFERENCES `Municipio`(`idMunicipio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Fornecedor` ADD CONSTRAINT `fk_Fornecedor_Endereco1` FOREIGN KEY (`Endereco_idEndereco`) REFERENCES `Endereco`(`idEndereco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ItemCompra` ADD CONSTRAINT `fk_Produto_has_NotaCompra_NotaCompra1` FOREIGN KEY (`NotaCompra_nroNotaCompra`) REFERENCES `NotaCompra`(`nroNotaCompra`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ItemCompra` ADD CONSTRAINT `fk_Produto_has_NotaCompra_Produto` FOREIGN KEY (`Produto_codProduto`) REFERENCES `Produto`(`codProduto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ItemVenda` ADD CONSTRAINT `fk_Produto_has_NotaVenda_NotaVenda1` FOREIGN KEY (`NotaVenda_nroNotaVenda`) REFERENCES `NotaVenda`(`nroNotaVenda`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ItemVenda` ADD CONSTRAINT `fk_Produto_has_NotaVenda_Produto1` FOREIGN KEY (`Produto_codProduto`) REFERENCES `Produto`(`codProduto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Logradouro` ADD CONSTRAINT `fk_Logradouro_TipoLogradouro1` FOREIGN KEY (`TipoLogradouro_idTipoLogradouro`) REFERENCES `TipoLogradouro`(`idTipoLogradouro`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Municipio` ADD CONSTRAINT `fk_Municipio_UnidadeFederativa` FOREIGN KEY (`UnidadeFederativa_idUnidadeFederativa`) REFERENCES `UnidadeFederativa`(`idUnidadeFederativa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `NotaCompra` ADD CONSTRAINT `fk_NotaCompra_Fornecedor1` FOREIGN KEY (`Fornecedor_codFornecedor`) REFERENCES `Fornecedor`(`codFornecedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `NotaVenda` ADD CONSTRAINT `fk_NotaVenda_Cliente1` FOREIGN KEY (`Cliente_codCliente`) REFERENCES `Cliente`(`codCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `NotaVenda` ADD CONSTRAINT `fk_NotaVenda_Endereco1` FOREIGN KEY (`Endereco_idEndereco`) REFERENCES `Endereco`(`idEndereco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Produto_has_TipoProduto` ADD CONSTRAINT `fk_Produto_has_TipoProduto_Produto1` FOREIGN KEY (`Produto_codProduto`) REFERENCES `Produto`(`codProduto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Produto_has_TipoProduto` ADD CONSTRAINT `fk_Produto_has_TipoProduto_TipoProduto1` FOREIGN KEY (`TipoProduto_idTipoProduto`) REFERENCES `TipoProduto`(`idTipoProduto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

