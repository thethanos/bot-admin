import { Reduce } from "../../../hooks/reducer";

export const Mode = {
    CREATE: 0,
    EDIT: 1,
}

export function validate(state) {
    const error = { error: true, help: "Обязательное поле" };
    if (!state.name.value) {
        return [false, { type: Reduce.UpdateName, value: { value: state.name.value, ...error } }];
    }
    if (!state.city.value) {
        return [false, { type: Reduce.UpdateCity, value: { value: state.city.value, ...error } }];
    }
    if (!state.category.value) {
        return [false, { type: Reduce.UpdateCategory, value: { value: state.category.value, ...error } }];
    }
    if (state.services.values[0] === "0") {
        return [false, { type: Reduce.UpdateServices, value: { values: state.services.values, ...error } }];
    }
    if (!state.description.value) {
        return [false, { type: Reduce.UpdateDescription, value: { value: state.description.value, ...error } }];
    }
    if (!state.contact.value) {
        return [false, { type: Reduce.UpdateContact, value: { value: state.contact.value, ...error } }];
    }

    return [true, {}];
};