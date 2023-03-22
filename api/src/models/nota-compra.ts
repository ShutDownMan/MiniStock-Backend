import { IsString, MaxLength, MinLength } from 'class-validator';
import { NotaCompra, Produto } from '@prisma/client';

export class NotaCompraCreateModel implements Pick<NotaCompra, 'dataCompra' | 'Fornecedor_codFornecedor' | 'totalCompra' | 'descontoCompra' | 'valorLiquidoCompra'> {
    dataCompra: Date;

    Fornecedor_codFornecedor: number;

    totalCompra: number;

    descontoCompra: number;

    valorLiquidoCompra: number;

    ItemCompra?: ItemCompra[];
}

// codNotaCompra required, rest is optional
export type NotaCompraUpdateModel = Pick<NotaCompra, 'nroNotaCompra'>;

export class ItemCompra {
    Produto_codProduto: number;

    // NotaCompra_nroNotaCompra: number;

    qtdItemCompra: number;

    valorItemCompra: number;

    // NotaCompra: NotaCompra;

    // Produto?: Produto;
}
