import { CustomerDTO } from '../dto/customer-dto.model';
import { ProductDTO } from '../dto/product-dto.model';

/** the dictionary store */
export interface DictionaryStateModel {
    /** array holds all existing customers */
    customers: CustomerDTO[];
    /** array holds all existing products */
    products: ProductDTO[];
}
