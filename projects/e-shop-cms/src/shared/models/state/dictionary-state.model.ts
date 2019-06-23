import { CustomerDTO } from '@cmsApp/shared/models/dto/customer-dto.model';
import { ProductDTO } from '@cmsApp/shared/models/dto/product-dto.model';

/** the dictionary store */
export interface DictionaryStateModel {
    /** array holds all existing customers */
    customers: CustomerDTO[];
    /** array holds all existing products */
    products: ProductDTO[];
}
