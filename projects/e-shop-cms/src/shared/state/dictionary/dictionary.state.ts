import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CustomerDTO } from '@cmsApp/shared/models/dto/customer-dto.model';
import { DictionaryStateModel } from '@cmsApp/shared/models/state/dictionary-state.model';
import { GetDictionaries } from './dictionary.actions';
import { ProductDTO } from '@cmsApp/shared/models/dto/product-dto.model';
import { ShopApiService } from '@cmsApp/services/shop-api.service';

/**
 *  the state holds dictionaries of customers and products
 */

/** default state */
const defaultDictionaryState = (): DictionaryStateModel => {
    return {
        customers: undefined,
        products: undefined
    } as DictionaryStateModel;
};

@State<DictionaryStateModel>({
    name: 'dictionaryState',
    defaults: defaultDictionaryState()
})

export class DictionaryState implements NgxsOnInit {

    @Selector()
    static allCustomers(state: DictionaryStateModel): CustomerDTO[] {
        return state.customers;
    }

    @Selector()
    static allProducts(state: DictionaryStateModel): ProductDTO[] {
        return state.products;
    }

    constructor(private apiService: ShopApiService) { }

    /** load all dictionaries on initialisation */
    public ngxsOnInit({ dispatch }: StateContext<DictionaryStateModel>): void {
        dispatch(GetDictionaries);
    }

    @Action(GetDictionaries)
    getDictionaries({ setState }: StateContext<DictionaryStateModel>) {
        return forkJoin(
            this.apiService.getCustomersDictionary(),
            this.apiService.getProductsDictionary()
        ).pipe(
            tap(([customers, products]) => setState({
                customers,
                products
            }))
        );
    }
}
