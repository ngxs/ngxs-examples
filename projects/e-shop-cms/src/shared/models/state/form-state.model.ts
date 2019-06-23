import { ValidationErrors } from '@angular/forms';

import { OrdersFilterForm } from '@cmsApp/shared/models/orders-filter.model';

/** interface for saving filter form input in the store
 */

export interface FilterFormState {
    model: OrdersFilterForm;
    dirty: boolean;
    status: string;
    errors: ValidationErrors | null;
}
