export const Reduce = {
    UpdateName: 0,
    UpdateCity: 1,
    UpdateCategory: 2,
    UpdateServices: 3,
    UpdateDescription: 4,
    UpdateImages: 5,
    UpdateContact: 6,
    ResetState: 7,
};

export function reducer(state, action) {
    switch (action.type) {
        case Reduce.UpdateName:
            return {...state, name: action.value};
        case Reduce.UpdateCity:
            return {...state, city: action.value};
        case Reduce.UpdateCategory:
            return {...state, category: action.value};
        case Reduce.UpdateServices:
            return {...state, services: action.value};
        case Reduce.UpdateDescription:
            return {...state, description: action.value};
        case Reduce.UpdateImages:
            return {...state, images: action.value};
        case Reduce.UpdateContact:
            return {...state, contact: action.value};
        case Reduce.ResetState:
            return {
                name: { value: "" },
                city: { value: 0 },
                category: { value: 0 },
                services: { values: [0] },
                description: {value: ""},
                images: {values: []},
                contact: {value: ""},
            };
        default:
            return state;
    }
};