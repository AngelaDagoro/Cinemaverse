import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllProducer = createAsyncThunk(
    'producer/getAllProducer',
    async(obj,{rejectWithValue}) => {
        try {
            let keywords = '';
                if(obj.toString().length > 0) {
                    keywords = Object.keys(obj).map((item,index) => {
                        return `${item}=${obj[item]}`
                    }).join('&')
                }


            const response = await axios.get(`/api/v1/smember?role=Producer&${keywords}`)

            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)

export const getProducerDetail = createAsyncThunk(
    'producer/getProducerDetail', 
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/smember/detail/${obj.id}`)
            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
    
)

// export const getProducerDetail = createAsyncThunk(
//     'producer/getProducerDetail', 
//     async(obj, {rejectWithValue}) => {
//         try {
//             const response = await axios.get(`/api/v1/smember/detail/${obj.id}`)
//             return response.data

//         } catch (error) {
//             return rejectWithValue(error.response.data)
            
//         }
//     }
    
// )

export const getProducerNames = createAsyncThunk(
    'producer/getProducerNames',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/smembers/all/names?role=Producer`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)

export const addProducer = createAsyncThunk(
    'producer/addProducer', 
    async(obj, {rejectWithValue}) => {
        try {
            console.log(obj);
            const response = await axios.post(`/api/v1/smember/new`, obj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log(response.data.smember);
            return response.data.smember
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteProducer = createAsyncThunk(
    'producer/deleteProducer', 
    async(obj, {rejectWithValue}) => {
        try {
            console.log(obj);
            const response = await axios.delete(`/api/v1/smember/delete/${obj}`)
            // response.data.id = obj

            console.log(response.data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const editProducer = createAsyncThunk(
    'producer/editProducer', 
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/smember/${obj.get('id')}`, obj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log(response);
            return response.data.smember
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



const initialState = {
    smembers:[],
    producer:null,
    name:null,
    bio:null,
    ratings:null,
    role:null,
    avatar:null,
    id:null,
    producerNames:[],
    membersCount:0,
    resPerPage:20,
    isLoading:false,
    errors:null,
    hasMore:true,
    page:1,
};



const producerSlice = createSlice({
    name : 'smember',
    initialState,
    reducers: {
        setHasMore : (state,action) => {
            state.hasMore = action.payload
        },
        setPage : (state,action) => {
            state.page = action.payload
        },
        clearProducer :(state) => {
            state.smembers = []
            state.page = 1

        }
    },
    extraReducers: {
        [getAllProducer.pending] : (state) => {
            state.isLoading = true
        },
        [getAllProducer.fulfilled] : (state,action) => {
            state.smembers = [...state.smembers, ...action.payload.smembers]
            state.producer = action.payload.smembers
            state.membersCount = action.payload.membersCount
            state.resPerpage = action.payload.resPerPage
            state.page = state.page + 1
            state.isLoading = false
        },
        [getAllProducer.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
    },
        [getProducerDetail.pending] : (state) => {
            state.isLoading = true
    },
        [getProducerDetail.fulfilled] : (state,action) => {
            // state.producer = action.payload.smember
            state.name = action.payload.name
            state.bio = action.payload.bio
            state.ratings = action.payload.ratings
            state.role = action.payload.role
            state.reviews = action.payload.reviews
            state.avatar = action.payload.avatar
            state.id = action.payload.id
            state.moviesprod = action.payload.moviesprod
            state.isLoading = false
    },
        [getProducerDetail.rejected] : (state,action) => {
        state.errors = action.payload
        state.isLoading =false
    },
    [getProducerNames.pending] : (state) => {
        state.isLoading = true
    },
    [getProducerNames.fulfilled] : (state,action) => {

        const names = []

        action.payload.names.reduce((obj,item) => {
            return names.push({"title" : item})
        })
        state.producerNames = names
        state.isLoading = false
    },
    [getProducerNames.rejected] : (state,action) => {
        state.errors = action.payload
        state.isLoading = false
    },
    [addProducer.pending] : (state) => {
            state.isLoading = true
    },
    [addProducer.fulfilled] : (state,action) => {
            console.log(action.payload);
            console.log(...state.producer);

            state.smembers = [...state.smembers, action.payload]
            // state.producer = [action.payload, ...state.producer]
            state.isLoading = false
    },
    [addProducer.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
    },
    [deleteProducer.pending] : (state) => {
        state.isLoading = false
    },
    [deleteProducer.fulfilled] : (state, action) => {
        // state.smembers = state.smembers.filter(smember => smember._id !== action.payload.smembers)
        state.smembers = action.payload.smember
        state.message = action.payload.message
        state.isLoading = false
    },
    [deleteProducer.rejected] : (state,action) => {
        state.errors = action.payload
        state.isLoading = false
    },
    [editProducer.pending] : (state) => {
        state.isLoading = true
    },
    [editProducer.fulfilled] : (state,action) => {
        const producerIndex = state.smembers.findIndex(act => act._id === action.payload._id);
        state.smembers[producerIndex] = {...action.payload}
        state.isLoading = false
    },
    [editProducer.rejected] : (state,action) => {
        state.errors = action.payload
        state.isLoading = false
    }

}
})
export const { setHasMore, setPage, clearProducer } = producerSlice.actions
export default producerSlice.reducer
