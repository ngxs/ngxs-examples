import { ShopApiService } from '@cmsApp/services/shop-api.service';

import { State, Action, StateContext, NgxsOnInit, Selector } from '@ngxs/store';

import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DictionaryStateModel } from '../../models/state/dictionary-state.model';

import { GetDictionaries } from './dictionary.actions';
import { ProductDTO } from '@cmsApp/shared/models/dto/product-dto.model';
import { CustomerDTO } from '@cmsApp/shared/models/dto/customer-dto.model';

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
    ngxsOnInit({ dispatch }: StateContext<DictionaryStateModel>) {
        dispatch(GetDictionaries);
    }

    @Action(GetDictionaries)
    getDictionaries({ patchState }: StateContext<DictionaryStateModel>) {
        return forkJoin(
            this.apiService.getCustomersDictionary(),
            this.apiService.getProductsDictionary()
        ).pipe(
            tap(([customers, products]) => patchState({
                customers,
                products
            }))
        );
    }
}
