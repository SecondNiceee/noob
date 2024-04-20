import { createSlice } from "@reduxjs/toolkit";
const information = createSlice( {
    name : 'taskInformation',
    initialState : {
        taskInformation :  {
            category: { name: "Дизайн", value: "design1" },
            subCategory: "Выбрать",
            taskName: "",
            taskDescription: "",
            photos: "",
            budget: 0,
            tonValue: 0,
            taskDate: { start: "", end: "" },
            isPrivate : false
          } ,

          orderInformations :   [  {
            taskName: "UX/UI-дизайнер для разработки прототипа интернет-магазина",
            executionPlace: "Можно выполнить удаленно",
            photos : '',
            time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
            tonValue: 261,
            taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
            rate : '5',
            customerName : 'YourName',
            isActive : true,
            creationTime : 'Создано когда-то , ..timing',
            viewsNumber : '51'
          },
          {
            taskName: "UX/UI-дизайнер для разработки прототипа интернет-магазина",
            executionPlace: "Можно выполнить удаленно",
            photos : '',
            time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
            tonValue: 261,
            taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
            rate : '5',
            customerName : 'YourName',
            isActive : true,
            creationTime : 'Создано когда-то , ..timing',
            viewsNumber : '51'
          },
          {
            taskName: "UX/UI-дизайнер для разработки прототипа интернет-магазина",
            executionPlace: "Можно выполнить удаленно",
            photos : '',
            time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
            tonValue: 261,
            taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
            rate : '5',
            customerName : 'YourName',
            isActive : true,
            creationTime : 'Создано когда-то , ..timing',
            viewsNumber : '51'
          }  ],

          myAdsArray : [
            {
              taskName: "ЯЯЯ нее знаааааю название ... этооо первое заданиееее",
              executionPlace: "Можно выполнить удаленно",
              photos : '',
              time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
              tonValue: 261,
              taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
              rate : '5',
              customerName : 'YourName',
              isActive : true,
              creationTime : 'Создано когда-то , ..timing',
              viewsNumber : '51'
            },
            {
              taskName: "А это второе заданиеее поменяй названиеее , чтобы понятььь что оно меняется ",
              executionPlace: "Можно выполнить удаленно",
              photos : '',
              time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
              tonValue: 261,
              taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
              rate : '5',
              customerName : 'YourName',
              isActive : true,
              creationTime : 'Создано когда-то , ..timing',
              viewsNumber : '51'
            },
            {
              taskName: "Третье заданиеее",
              executionPlace: "Можно выполнить удаленно",
              photos : '',
              time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
              tonValue: 261,
              taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
              rate : '5',
              customerName : 'YourName',
              isActive : true,
              creationTime : 'Создано когда-то , ..timing',
              viewsNumber : '51'
            } 
          ]
          }    
,



    reducers : {
        changeTaskInformation(state , action) {
            state.taskInformation = action.payload
        },
        changeMyAds(state, action) {
          state.myAdsArray = action.payload
        }
    }
})
export const {changeTaskInformation , changeMyAds} = information.actions;
export default information.reducer;