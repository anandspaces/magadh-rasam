import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getAddress } from "../../services/apiGeocoding";

// function getPosition() {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // const positionObj = await getPosition();
    // const position = {
    //   latitude: positionObj.coords.latitude,
    //   longitude: positionObj.coords.longitude,
    // };
    const position = {
      latitude: 37.7749,
      longitude: -122.4194,
    };

    // const addressObj = await getAddress(position);
    const addressObj = {
      locality: "San Francisco",
      city: "California",
      postcode: "94105",
      countryName: "United States",
    };
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    status: "idle",
    position: {},
    address: "",
    error: "",
  },
  reducers: {
    updateName(state, action) {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
