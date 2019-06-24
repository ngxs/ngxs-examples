import { defaultItemsOnPage } from './default-items-on-page.const';
import { SelectOption } from '@cmsApp/shared/models/select-option.model';

/** dropdown options for search results quantity */
export const itemsOnPageOptions: SelectOption[] = [
    {
        displayText: defaultItemsOnPage,
        value: defaultItemsOnPage
    },
    {
        displayText: defaultItemsOnPage * 3,
        value: defaultItemsOnPage * 3
    },
    {
        displayText: defaultItemsOnPage * 5,
        value: defaultItemsOnPage * 5
    },
    {
        displayText: 'All',
        value: Infinity
    }
];
