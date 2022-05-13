import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'user/login',
    async(obj, {rejectWithValue}) => {
        try {
            console.log(obj);
            const response = await axios.post('/api/v1/login',obj);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async(obj, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/logout`);
            return response.data           
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/register',
    async(obj, { rejectWithValue }) => {
        try {
            // console.log(obj);
            const response = await axios.post('/api/v1/users', obj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            // console.log(response.data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async(obj,{rejectWithValue}) => {
        try {
            console.log(obj);
            const response = await axios.get(`/api/v1/users/${obj.id}`);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const googleAuth = createAsyncThunk(
    'user/googleAuth',
    async(obj, {rejectWithValue}) => {
        try {
            const response =await axios.post('/api/v1/google/register', obj);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    user: null,
    name:'',
    email:'',
    type:'',
    avatar:'',
    token: null,
    isLogin: false,
    isLoading: false,
    errors: null,
    onRegister:false,
    onRegisterAvatar:'',
    onGoogle:false,
    isAdmin: false,

};


const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {

        setRegister: (state,action) => {
            state.onRegister = action.payload
        }, 
        setOnRegisterAvatar: (state, action) => {
            state.onRegisterAvatar = action.payload
        },  
        setEmail : (state,action) => {
            state.email = action.payload
        },
        setOnGoogle : (state,action) => {
            state.email = action.payload
        },
        clearError: (state) => {
            state.errors = null
        }
    },
    extraReducers: {
        [loginUser.pending] : (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled] : (state,action) => {
            state.user = action.payload.user
            state.type = action.payload.user.type
            state.email = action.payload.user.email
            state.token = action.payload.token
            state.isLogin = true
            // state.isAdmin = action.payload.user.role === 'Admin' ? true : false
            state.name = action.payload.user.name
            state.isLoading = false
            if(action.payload.success === true) localStorage.setItem('id',action.payload.user._id)
        },
        [loginUser.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [logout.pending] : (state) => {
            state.isLoading = true
        },
        [logout.fulfilled] : (state,action) => {
            state.user = null
            state.name = ''
            state.email = ''
            state.avatar = ''
            state.token = null
            state.isLogin = false
            state.isLoading = false
            state.errors = null
            state.onRegister = false
            state.onRegisterAvatar = ''
            state.onGoogle = false
            state.isAdmin = false
            localStorage.clear()
            window.location.reload()
        },
        [logout.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [registerUser.pending] : (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled] : (state,action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLogin = true
            // state.isAdmin = action.payload.user.role === 'Admin' ? true : false
            state.name = action.payload.user.name
            state.isLoading = false
            if(action.payload.success === true) localStorage.setItem('id',action.payload.user._id)
          
        },
        [registerUser.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [getUserInfo.pending] : (state) => {
            state.isLoading = true
        },
        [getUserInfo.fulfilled] : (state,action) => {
            state.user = action.payload.user
            // state.token = action.payload.token
            state.name = action.payload.user.name
            state.type = action.payload.user.type
            state.isLogin = true
            // state.isAdmin = action.payload.role === 'Admin' ? true : false
            state.isLoading = false
        },
        [getUserInfo.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false
        },
        [googleAuth.pending] : (state) => {
            state.isLoading = true
        },
        [googleAuth.fulfilled] : (state,action) => {
            state.user = action.payload.user
            state.type = action.payload.user.type
            state.email = action.payload.user.email
            state.token = action.payload.token
            state.isLogin = true
            state.isLoading = false
            // state.isAdmin = action.payload.user.role === 'Admin' ? true : false
            if(action.payload.success === true) localStorage.setItem('id',action.payload.user._id)
            // if(action.payload.success === true) localStorage.setItem('googleId',action.payload.user._id)
            state.isLoading = false
        },
        [googleAuth.rejected] : (state,action) => {
            state.errors = action.payload
            state.isLoading = false 
        }
    }
});
// export const {} =.actions
export const { setRegister, setOnRegisterAvatar, setEmail, setOnGoogle, clearError } = userSlice.actions
export default userSlice.reducer
