import { PrismaClient } from '@prisma/client'
import { randNumber, randRecentDate } from '@ngneat/falso'

const prisma = new PrismaClient()

async function createProdutos() {
    // return await prisma.produto.create({
    //     data: {
    //         codProduto: 1,
    //         nomeProduto: 'Produto 1',
    //         qtdAtualEstoque: 10,
    //         precoCusto: 150,
    //         precoVenda: 200,
    //         dataCadastro: new Date(),
    //     },
    // })

    await prisma.tipoProduto.createMany({
        data: [
            {
                nomeTipoProduto: 'Alimento',
            },
            {
                nomeTipoProduto: 'Bebida',
            },
            {
                nomeTipoProduto: 'Higiene',
            },
            {
                nomeTipoProduto: 'Limpeza',
            },
        ]
    });
}

async function createEnderecos() {
    try {
        await prisma.tipoLogradouro.createMany({
            data: [
                {
                    idTipoLogradouro: 1,
                    nomeTipoLogradouro: 'Rua',
                },
                {
                    idTipoLogradouro: 2,
                    nomeTipoLogradouro: 'Avenida',
                },
                {
                    idTipoLogradouro: 3,
                    nomeTipoLogradouro: 'Travessa',
                },
                {
                    idTipoLogradouro: 4,
                    nomeTipoLogradouro: 'Praça',
                },
            ]
        });
    } catch (error) {
        console.log("error: ", error)
    }

    try {
        let allBrazilianStates = require('./../data/estados')["estados"]
        console.log("allBrazilianStates: ", allBrazilianStates)
        await prisma.unidadeFederativa.createMany({
            data: allBrazilianStates.map((uf: any, index: any) => {
                return {
                    idUnidadeFederativa: index + 1,
                    siglaUF: uf.sigla,
                    nomeUF: uf.nome,
                }
            })
        })
    }
    catch (error) {
        console.log("error: ", error)
    }

    try {
        await prisma.bairro.createMany({
            data: [
                {
                    idBairro: 1,
                    nomeBairro: 'Centro',
                },
                {
                    idBairro: 2,
                    nomeBairro: 'Vila Nova',
                },
                {
                    idBairro: 3,
                    nomeBairro: 'Vila Velha',
                },
                {
                    idBairro: 4,
                    nomeBairro: 'Vila Rica',
                },
            ]
        })

        await prisma.municipio.createMany({
            data: [
                {
                    idMunicipio: 1,
                    nomeMunicipio: 'São Paulo',
                    UnidadeFederativa_idUnidadeFederativa: 25,
                },
                {
                    idMunicipio: 2,
                    nomeMunicipio: 'Rio de Janeiro',
                    UnidadeFederativa_idUnidadeFederativa: 19,
                },
                {
                    idMunicipio: 3,
                    nomeMunicipio: 'Belo Horizonte',
                    UnidadeFederativa_idUnidadeFederativa: 13,
                },
                {
                    idMunicipio: 4,
                    nomeMunicipio: 'Salvador',
                    UnidadeFederativa_idUnidadeFederativa: 5,
                },
            ]
        })

        await prisma.logradouro.createMany({
            data: [
                {
                    idLogradouro: 1,
                    nomeLogradouro: 'Rua 1',
                    TipoLogradouro_idTipoLogradouro: 1,
                },
                {
                    idLogradouro: 2,
                    nomeLogradouro: 'Rua 2',
                    TipoLogradouro_idTipoLogradouro: 1,
                },
                {
                    idLogradouro: 3,
                    nomeLogradouro: 'Rua 3',
                    TipoLogradouro_idTipoLogradouro: 1,
                },
                {
                    idLogradouro: 4,
                    nomeLogradouro: 'Rua 4',
                    TipoLogradouro_idTipoLogradouro: 1,
                },
            ]
        })

        await prisma.endereco.createMany({
            data: [
                {
                    idEndereco: 1,
                    cepEndereco: '12345678',
                    Bairro_idBairro: 1,
                    Municipio_idMunicipio: 1,
                    Logradouro_idLogradouro: 1,
                },
                {
                    idEndereco: 2,
                    cepEndereco: '12345678',
                    Bairro_idBairro: 2,
                    Municipio_idMunicipio: 2,
                    Logradouro_idLogradouro: 2,
                },
                {
                    idEndereco: 3,
                    cepEndereco: '12345678',
                    Bairro_idBairro: 3,
                    Municipio_idMunicipio: 3,
                    Logradouro_idLogradouro: 3,
                },
                {
                    idEndereco: 4,
                    cepEndereco: '12345678',
                    Bairro_idBairro: 4,
                    Municipio_idMunicipio: 4,
                    Logradouro_idLogradouro: 4,
                },
            ]
        })
    } catch (error) {
        console.log("error: ", error)
    }
}

async function createFornecedores() {
    const numOfEnderecos = await prisma.endereco.count();

    try {
        await prisma.fornecedor.createMany({
            data: [
                {
                    codFornecedor: 1,
                    nomeFornecedor: 'Coca-Cola',
                    cnpj: '12345678901234',
                    nroEndereco: 123,
                    Endereco_idEndereco: randNumber({ min: 1, max: numOfEnderecos }),
                },
                {
                    codFornecedor: 2,
                    nomeFornecedor: 'Pepsi',
                    cnpj: '12345678901234',
                    nroEndereco: 111,
                    Endereco_idEndereco: randNumber({ min: 1, max: numOfEnderecos }),
                },
                {
                    codFornecedor: 3,
                    nomeFornecedor: 'Nestlé',
                    cnpj: '12345678901234',
                    nroEndereco: 59,
                    Endereco_idEndereco: randNumber({ min: 1, max: numOfEnderecos }),
                },
                {
                    codFornecedor: 4,
                    nomeFornecedor: 'Omo',
                    cnpj: '12345678901234',
                    nroEndereco: 1548,
                    Endereco_idEndereco: randNumber({ min: 1, max: numOfEnderecos }),
                },
                {
                    codFornecedor: 5,
                    nomeFornecedor: 'P&G',
                    cnpj: '12345678901234',
                    nroEndereco: 1667,
                    Endereco_idEndereco: randNumber({ min: 1, max: numOfEnderecos }),
                },
            ]
        });
    } catch (error) {
        console.log("error: ", error)
    }
}

async function main() {
    try {
        await prisma.itemCompra.deleteMany({})
        await prisma.notaCompra.deleteMany({})
        await prisma.fornecedor.deleteMany({})
        await prisma.endereco.deleteMany({})
        await prisma.logradouro.deleteMany({})
        await prisma.municipio.deleteMany({})
        await prisma.bairro.deleteMany({})
        await prisma.unidadeFederativa.deleteMany({})
        await prisma.tipoLogradouro.deleteMany({})
    } catch (error) {
        console.log("error: ", error)
    }

    await createProdutos()
    await createEnderecos()
    await createFornecedores()
}

main()