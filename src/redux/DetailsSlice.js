
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllDetailsAsync = createAsyncThunk(
    'allDetails/getAllDetailsAsync',
    async () =>{
        const response = await fetch('https://covid19.mathdro.id/api');
        if(response.ok) {
            const allDetails = await response.json();
            return {allDetails}
        }
    }
);
export const getAllDetailsByCountryAsync = createAsyncThunk(
    'allDetails/getAllDetailsByCountryAsync',
    async (payload) =>{
        const response = await fetch(`https://covid19.mathdro.id/api/countries/${payload.selectedCountry}`);
        if(response.ok) {
            const allDetails = await response.json();
            return {allDetails}
        }
    }
);

// let FetchActions = id => async (dispatch, getState) => {
//     await API.post("companies/",id)
//       .then((res) => {
//         dispatch({ type: "FETCH_COMPANIES", payload: res.data })
//       })
//       .catch((err) => {
//         console.log(err)
//       });
//   };
  
const DetailsSlice = createSlice({
    name:"allDetails",
    initialState : {
        confirmed: "",
        recovered: "",
        deaths: "",
        lastUpdate: ""
    },
    reducers:{
        // getDataByCountryId:(state, action) =>{
        //     state.selectedCountry= action.payload.selectedCountry
        //     state.confirmed =  action.payload.allDetails.confirmed.value;
        //     state.recovered =  action.payload.allDetails.recovered.value
        //     state.deaths =  action.payload.allDetails.deaths.value }
    },
    extraReducers: {
        [getAllDetailsAsync.fulfilled]: (state, action)=>{
            console.log('state', action.payload.allDetails.lastUpdate);
            state.confirmed =  action.payload.allDetails.confirmed.value;
            state.recovered =  action.payload.allDetails.recovered.value;
            state.deaths =  action.payload.allDetails.deaths.value;
            state.lastUpdate = action.payload.allDetails.lastUpdate;
        },
        [getAllDetailsByCountryAsync.fulfilled]: (state, action)=>{
            state.confirmed =  action.payload.allDetails.confirmed.value;
            state.recovered =  action.payload.allDetails.recovered.value;
            state.deaths =  action.payload.allDetails.deaths.value;
            state.lastUpdate = action.payload.allDetails.lastUpdate;
        }, 
    }
});

export const {getDataByCountryId} = DetailsSlice.actions;

export default DetailsSlice.reducer;
