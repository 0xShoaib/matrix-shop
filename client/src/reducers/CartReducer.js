export const CartReducer = (state, action) => {
  if (action.type === "ADD_PRODUCT") {
    return [
      ...state,
      {
        id: action.product.id,
        title: action.product.title,
        price: action.product.price,
        quantity: action.product.quantity,
        thumbnail: action.product.thumbnail,
      },
    ];
  }

  if (action.type === "REMOVE_PRODUCT") {
    return state.filter((product) => product.id !== action.id);
  }

  if (action.type === "CLEAR") {
    return [];
  }
};
