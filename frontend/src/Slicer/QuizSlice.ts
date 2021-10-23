import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllCards, validateAnswer} from "../services/apiService";
import { IQuestionCard, IQuizState} from "../Interfaces/IQuestionCard";
import {RootState} from "../app/store";
import { receiveError} from "./ErrorSlice";

const initialState: IQuizState = {
    allCards: [],
    answeredCards: [],
    status: 200,
    message: "",
    error: false,
    pointsCounter: 0,
}

interface IResponseData {
    data: IQuestionCard[],
    status: number,
    statusText: string
}

export const handleError = (err: any) => {
    return {...err, data:[]}
}
export const getApiData = createAsyncThunk(
    'quiz/fetchQuizcards'
    , async (_, thunkAPI) =>  {
        // @ts-ignore
        const token = thunkAPI.getState().login.token;
        const {data, status, statusText} = await getAllCards(token)
        if(status !== 200){
            thunkAPI.dispatch(receiveError({status, statusText}))
            return handleError({data, status,statusText})
        }
        return {data, status, statusText}
    }
    )

export const validateQuizcard = createAsyncThunk(
    'quiz/vaildateAnswer',
    async (answer: IQuestionCard, thunkAPI) => {
        // @ts-ignore
        const token = thunkAPI.getState().login.token
        const {data, status, statusText} = await validateAnswer(answer, token);
        console.log(status)
        if(status !== 200){
            thunkAPI.dispatch(receiveError({ status, statusText}))
            return handleError({data, status,statusText})
        }
        return {data, status, statusText}
    }
)

export const QuizSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        closeError: (state) => {
            state.error = false;
            state.status = 200;
            state.message = "";
        },
        moveCardToAnseweredCardsStack: (state, action: PayloadAction<IQuestionCard>) => {
            state.answeredCards = [...state.answeredCards, action.payload];
        },
    },
    extraReducers: (builder => {
        builder
            .addCase(getApiData.pending, state => {
            })
            .addCase(getApiData.fulfilled, (state, action: PayloadAction<IResponseData> ) => {
                state.allCards = action.payload.data
            })
            .addCase(validateQuizcard.fulfilled, (state, action: PayloadAction<any>) => {
                if (action.payload.data)state.pointsCounter += 1;
            })
    })
})

export const selectGetAllCards = (state: RootState) => state.quiz.allCards;
export const selectGetAnsweredCards = (state: RootState) => state.quiz.answeredCards;
export const selectErrorStatus = (state: RootState) => state.quiz.status;
export const selectPoints = (state: RootState) => state.quiz.pointsCounter;

export const {closeError, moveCardToAnseweredCardsStack} = QuizSlice.actions;
export default QuizSlice.reducer;
