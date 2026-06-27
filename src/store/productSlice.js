import { createSlice } from "@reduxjs/toolkit";
import { products as initialProducts } from "../data/data";

const getSavedProducts = () => {
  try {
    const saved = localStorage.getItem("shop_products");
    return saved ? JSON.parse(saved) : initialProducts;
  } catch (error) {
    return initialProducts;
  }
};

const saveProducts = (products) => {
  try {
    localStorage.setItem("shop_products", JSON.stringify(products));
  } catch (error) {
    console.error("Failed to save products", error);
  }
};

const getSavedEarnings = () => {
  try {
    const saved = localStorage.getItem("shop_earnings");
    return saved ? Number(saved) : 0;
  } catch (error) {
    return 0;
  }
};

const saveEarnings = (earnings) => {
  try {
    localStorage.setItem("shop_earnings", earnings.toString());
  } catch (error) {
    console.error("Failed to save earnings", error);
  }
};

const initialState = {
  approvedProducts: getSavedProducts(),
  pendingProducts: [],
  totalEarnings: getSavedEarnings(),
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Admin directly manages products
    addProduct: (state, action) => {
      const newProduct = {
        id: Date.now(),
        name: action.payload.name,
        category: action.payload.category,
        price: Number(action.payload.price),
        image: action.payload.image || "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80",
        description: action.payload.description,
      };
      state.approvedProducts.unshift(newProduct);
      saveProducts(state.approvedProducts);
    },

    editProduct: (state, action) => {
      const { id, name, category, price, image, description } = action.payload;
      const product = state.approvedProducts.find((item) => item.id === id);
      if (product) {
        product.name = name;
        product.category = category;
        product.price = Number(price);
        if (image) {
          product.image = image;
        }
        product.description = description;
        saveProducts(state.approvedProducts);
      }
    },

    deleteProduct: (state, action) => {
      state.approvedProducts = state.approvedProducts.filter((item) => item.id !== action.payload);
      saveProducts(state.approvedProducts);
    },

    // Legacy reducers maintained for safety and compatibility
    addPendingProduct: (state, action) => {
      state.pendingProducts.unshift({
        id: Date.now(),
        status: "Beklemede",
        createdAt: new Date().toISOString().slice(0, 10),
        ...action.payload,
      });
    },

    approveProduct: (state, action) => {
      const product = state.pendingProducts.find((item) => {
        return item.id === action.payload;
      });

      if (product) {
        product.status = "Onaylandı";

        const alreadyAdded = state.approvedProducts.some((item) => {
          return item.id === product.id;
        });

        if (!alreadyAdded) {
          state.approvedProducts.unshift({
            id: product.id,
            name: product.name,
            category: product.category,
            price: Number(product.price),
            image: product.image,
            description: product.description,
          });
          saveProducts(state.approvedProducts);
        }
      }
    },

    rejectProduct: (state, action) => {
      const product = state.pendingProducts.find((item) => {
        return item.id === action.payload;
      });

      if (product) {
        product.status = "Reddedildi";
      }
    },

    deletePendingProduct: (state, action) => {
      state.pendingProducts = state.pendingProducts.filter((item) => {
        return item.id !== action.payload;
      });
    },

    addEarnings: (state, action) => {
      state.totalEarnings += action.payload;
      saveEarnings(state.totalEarnings);
    },
  },
});

export const {
  addProduct,
  editProduct,
  deleteProduct,
  addPendingProduct,
  approveProduct,
  rejectProduct,
  deletePendingProduct,
  addEarnings,
} = productSlice.actions;

export default productSlice.reducer;