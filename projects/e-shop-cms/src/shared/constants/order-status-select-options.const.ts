import { SelectOption } from '@cmsApp/shared/models/select-option.model';
import { OrderStatuses } from '@cmsApp/shared/enums/order-statuses.enum';
import { displayAllStatuses } from './display-all-statuses-select-option.const';

export const orderStatusOptions: SelectOption[] = [
    {
        displayText: 'Only new',
        value: OrderStatuses.new
    },
    {
        displayText: 'Only completed',
        value: OrderStatuses.completed
    },
    {
        displayText: 'Only cancelled',
        value: OrderStatuses.cancelled
    },
    {
        displayText: 'Any',
        value: displayAllStatuses
    }
];
