import { IsString, MaxLength, MinLength } from 'class-validator';

export class Produto {
    @IsString()
    @MinLength(1)
    @MaxLength(45)
    codigoBarras: string;

    @IsString()
    @MinLength(1)
    @MaxLength(80)
    nomeProduto: string;

    precoCusto: number;

    precoVenda: number;

    qtdAtualEstoque: number;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    imagem: string;

    dataCadastro: Date;

    ItemCompra: ItemCompra[];

    ItemVenda: ItemVenda[];

    TipoProduto: TipoProduto[];
}

export class ItemCompra {
  Produto_codProduto: number;

  NotaCompra_nroNotaCompra: number;

  qtdItemCompra: number;

  valorItemCompra: number;

  // NotaCompra: NotaCompra;

  Produto: Produto;
}

export class ItemVenda {
  Produto_codProduto: number;

  NotaVenda_nroNotaVenda: number;

  qtdItemVenda: number;

  valorItemVenda: number;

  // NotaVenda: NotaVenda;

  Produto: Produto;
}

export class TipoProduto {
  idTipoProduto: number;

  nomeTipoProduto: string;

  Produto: Produto[];
}

