import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import makeNameFiles from "../functions/makeNameFiles";
import makeNewFile from "../functions/newMakeFile";


export const fetchValues = createAsyncThunk( 
  "fetchValues" , 
  async function (params) {
    let axiosUsers = await axios.get("https://back-birga.ywa.su/user/findAll")
    let numberUsers = axiosUsers.data.length
    let imTwo = await axios.get("https://back-birga.ywa.su/advertisement/findAll")
    let advertisements = imTwo.data
    let numberAdvertisements = advertisements.length
    let numberCompletedAdvertisements = 0
    let numberInProcessAdvertisements = 0
    for (let i = 0; i < numberAdvertisements; i++) {
      if (advertisements[i].status === "inProcess"){
        numberInProcessAdvertisements += 1
      }
      if (advertisements[i].status === "completed"){
        numberCompletedAdvertisements += 1
      }
      
    }
    let a = await axios.get("https://back-birga.ywa.su/response/findAll")
    let responseNumber = a.data.length
    return {
      users : numberUsers,
      advertisements : numberAdvertisements,
      reponses : responseNumber,
      completedAdvertisements : numberCompletedAdvertisements,
      advertisementsInProcess : numberInProcessAdvertisements,
    }
  }


)
export const deleteShablon = createAsyncThunk(
  "shablon/deleteShablon",
  async function(id){
    try{
      await axios.delete("https://back-birga.ywa.su/template" , {
        params : {
          id : id
        }
      })
      return id
    }
    catch(e){
      console.warn(e)
    }
  }
)
export const putShablon = createAsyncThunk(
  "shablon/putShablon" ,
  async function(data){
    try{
      let im = await axios.put("https://back-birga.ywa.su/template" , data[0] , 
        {
          params : {
            id : data[1]
          }
        }
      )
      let photos = makeNameFiles(data[2].photos , im.data.photos)
      return {
          ...data[2],
          photos : photos,
          photosNames : im.data.photos,
          id : im.data.id
      }

    }
    catch(e){
      window.Telegram.WebApp.showAlert('!')
        console.log(e)
    }
  }
)
export const postShablon = createAsyncThunk(
  "shablon/postShablon",
  async function(data){
    try{
        let im = await axios.post("https://back-birga.ywa.su/template" , data[0] , 
        {
          params : {
            userId : 2144832745
          },
          headers: {
            "Content-Type" :'multipart/form-data',
            "Access-Control-Allow-Origin": "*"
          },
        }
        )

        let files = makeNameFiles(data[1].photos, im.data.photos)
        return {
          ...data[1],
          photos : files,
          photosNames : im.data.photos,
          id : im.data.id
        }
        

    }
    catch(e){
      window.Telegram.WebApp.showAlert("Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.")
      console.warn(e)
    }
  }
)
export const fetchAllShablons = createAsyncThunk(
  "shablon/fetchAllShablons",
  async function(id){
    try{
        let im = await axios.get("https://back-birga.ywa.su/template/findByUser" , 
            {
                params : {
                    userId : 2144832745 
                    // userId : 2144832745 
                }
            }
        )
      
        let localShablons = []
        let servShablons = im.data
      
        for (let e of servShablons){
          
          let files = []
          if (e.photos){
             files = await makeNewFile(e.folder, e.photos)
          }
              localShablons.push({
                  id : e.id,
                  name : e.name,
                  text : e.text,
                  photos : files, // photos - это файлы
                  photosNames : e.photos // photosNames - это фотки
          })
        }
          
            
            
        
      
          
        
        return localShablons
        

    }
    catch(e){
        console.warn(e)
    }
  }
    
)
const shablon = createSlice({
  name: "shablon",
  initialState: {

    value : {
      users : 0,
      advertisements : 0,
      reponses : 0,
      completedAdvertisements : 0,
      advertisementsInProcess : 0,

    },
    status: null,
    shablonsArr: [
      { name: "Шаблон 1", description: "Это шаблон один хахахах", photos: [] },
      { name: "Шаблон 2222", description: "Это шаблон два хахахах", photos: [] },
    ],
  },
  reducers : {
    
  },
  extraReducers : (builder) => {


    builder.addCase(fetchValues.fulfilled , (state , action) => {
      state.value = action.payload
    })

    builder.addCase(fetchAllShablons.fulfilled , (state , action) => {
        state.shablonsArr = action.payload
    })
    builder.addCase(postShablon.fulfilled , (state , action) => {
      state.shablonsArr.push(action.payload)
    })
    builder.addCase(putShablon.fulfilled , (state, action) => {
      state.shablonsArr = state.shablonsArr.map((e , i) => {
        if (e.id === action.payload.id){
          return action.payload
        }
        else{
          return e
        }
      })
    })
    builder.addCase(deleteShablon.fulfilled, (state , action) => {
      state.shablonsArr = state.shablonsArr.filter(e => 
          e.id !== action.payload
      )
    } ) 
  }
});
export default shablon.reducer;
