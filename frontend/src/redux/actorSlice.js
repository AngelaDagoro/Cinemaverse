import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllActor = createAsyncThunk(
    'actor/getAllActor',
    async(obj,{rejectWithValue}) => {
        try {
            let keywords = '';
                if(obj.toString().length > 0) {
                    keywords = Object.keys(obj).map((item,index) => {
                        return `${item}=${obj[item]}`
                    }).join('&')
                }


            const response = await axios.get(`/api/v1/smember?role=Actor&role=Actress&${keywords}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)

export const getActorDetail = createAsyncThunk(
    'actor/getActorDetail', 
    async(obj, {rejectWithValue}) => {
        try {
            console.log(obj);
            const response = await axios.get(`/api/v1/smember/detail/${obj.id.id}`)
            response.data.smember = obj.user._id

            console.log(response);
            console.log(response.data.smember.review);
            console.log(response.data);
            console.log(response.data.smember);


            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)

export const getActorDetailEdit = createAsyncThunk(
    'actor/getActorDetail', 
    async(obj, {rejectWithValue}) => {
        try {
            console.log(obj);
            const response = await axios.get(`/api/v1/smember/detail/${obj.id}`)
            response.data.smember = obj.user._id

            console.log(response);
            console.log(response.data.smember.review);
            console.log(response.data);
            console.log(response.data.smember);

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)

export const getActorNames = createAsyncThunk(
    'Actor/getActorNames',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/smembers/all/names?role=Actors&role=Actress`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)
export const createActorReview = createAsyncThunk(
    'actor/createActorReview',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/smember/review/all`, {...obj});
            response.data.review = obj;
            return response.data
            
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)
export const deleteReview =  createAsyncThunk(
    'actor/deleteReview',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/smember/review/all?id=${obj.id}&memberId=${obj.memberId}`)
            return response.data
            
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)

export const addActor = createAsyncThunk(
    'actor/addActor', 
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

export const deleteActor = createAsyncThunk(
    'actor/deleteActor', 
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

export const editActor = createAsyncThunk(
    'actor/editActor', 
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
    actorNames:[],
    actor:null,
    name:null,
    bio:null,
    ratings:null,
    role:null,
    avatar:null,
    id:null,
    moviesact:[],
    reviews:[],
    userReview:null,
    membersCount:0,
    resPerPage:20,
    isLoading:false,
    errors:null,
    hasMore:true,
    page:1
};



const actorSlice = createSlice({
    name : 'smember',
    initialState,
    reducers: {
        setHasMore : (state,action) => {
            state.hasMore = action.payload
        },
        setPage : (state,action) => {
            state.page = action.payload
        },
        clearActors : (state) =>{
            state.smembers = []
            state.page = 1
        },
        clearActorDetails : (state) =>{
            state.name = null
            state.bio = null
            state.role = null
        }

    },
    extraReducers: {
        [getAllActor.pending] : (state) => {
            state.isLoading = true
        },
        [getAllActor.fulfilled] : (state,action) => {
        
            state.smembers = [...state.smembers, ...action.payload.smembers]
            
            state.actor = action.payload.smembers
            state.membersCount = action.payload.membersCount
            state.resPerpage = action.payload.resPerPage
            state.page = state.page + 1
            state.isLoading = false
        },
        [getAllActor.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getActorDetail.pending] : (state) => {
            state.isLoading = true
        },
        [getActorDetail.fulfilled] : (state,action) => {
            console.log(action.payload);
            state.smember = action.payload.smember
            state.name = action.payload.name
            state.bio = action.payload.bio
            state.ratings = action.payload.ratings
            state.role = action.payload.role
            state.reviews = action.payload.reviews
            state.avatar = action.payload.avatar
            state.id = action.payload.id
            state.moviesact = action.payload.moviesact
            // state.reviews = [...action.payload.smember.reviews.filter(review => review.user !== action.payload.user)]
            // state.userReview = action.payload.smember.reviews.filter(review => review.user === action.payload.user)
            state.isLoading = false
        },
        [getActorDetail.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading =false
        },
        [getActorNames.pending] : (state) => {
            state.isLoading = true
        },
        [getActorNames.fulfilled] : (state,action) => {

            const names = []

            action.payload.names.reduce((obj,item) => {
            return names.push({"title" : item})
            })
            state.actorNames = names
            state.isLoading = false
        },
        [getActorNames.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [createActorReview.pending] : (state) => {
            state.isLoading = true
        },
        [createActorReview.fulfilled] : (state,action) => {
            state.reviews = action.payload.reviews
            // state.id = action.payload._id
            // state.reviews = [...action.payload.reviews.filter(review => review.user !== action.payload.review.user._id)]
            // state.userReview = action.payload.reviews.filter(review => review.user === action.payload.review.user._id)
            state.isLoading = false
        },
        [createActorReview.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [deleteReview.pending] : (state) => {
            state.isLoading = true
        },
        [deleteReview.fulfilled] : (state,action) => {
            state.message = action.payload.message
            state.userReview = null
            state.isLoading  = false
        },
        [deleteReview.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [addActor.pending] : (state) => {
                state.isLoading = true
        },
        [addActor.fulfilled] : (state,action) => {
                // console.log(action.payload);
                // console.log(...state.Actor);

                state.smembers = [...state.smembers, action.payload]
                // state.Actor = [action.payload, ...state.Actor]
                state.isLoading = false
        },
        [addActor.rejected] : (state,action) => {
                state.errors = action.payload
                state.isLoading = false
        },
        [deleteActor.pending] : (state) => {
            state.isLoading = false
        },
        [deleteActor.fulfilled] : (state, action) => {
            // state.smembers = state.smembers.filter(smember => smember._id !== action.payload.smembers)
            state.smembers = action.payload.smember
            state.message = action.payload.message
            state.isLoading = false
        },
        [deleteActor.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [editActor.pending] : (state) => {
            state.isLoading = true
        },
        [editActor.fulfilled] : (state,action) => {
            const actorIndex = state.smembers.findIndex(act => act._id === action.payload._id);
            state.smembers[actorIndex] = {...action.payload}
            state.isLoading = false
        },
        [editActor.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getActorDetailEdit.pending] : (state) => {
            state.isLoading = true
        },
        [getActorDetailEdit.fulfilled] : (state,action) => {
        
            state.name = action.payload.name
            state.bio = action.payload.bio
            state.ratings = action.payload.ratings
            state.role = action.payload.role
            state.reviews = action.payload.reviews
            state.avatar = action.payload.avatar
            state.id = action.payload.id
            state.moviesact = action.payload.moviesact
            state.isLoading = false
        },
        [getActorDetailEdit.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading =false
        }

    }
})
export const { setHasMore, setPage, clearActors, clearActorDetails } = actorSlice.actions
export default actorSlice.reducer
