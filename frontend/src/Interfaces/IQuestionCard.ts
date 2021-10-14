export interface IQuestionCard {
    id:number,
    question: string,
    choices: string[],
    answerIndices: number[],
}

export enum cardMode {
    RESULT = "RESULT",
    QUIZ = "QUIZ",
    ALL = "ALL",
    NEW = 'NEW',
}

export interface IError {
    status: number,
    message: string,
    error: boolean,
}

export interface IQuizState extends IError {
    allCards:IQuestionCard[],
    answeredCards: IQuestionCard[],
}

export enum createCardStatus {
    QUESTION = "QUESTION",
    ANSWER = "ANSWER",
    SELECT = "SELECT"
}
