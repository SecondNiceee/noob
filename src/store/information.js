import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import makeNewFile from "../functions/newMakeFile";

export const addWatch = createAsyncThunk(
  "information/addWatch",
  async function (advertisement) {
    try {
      let myData = new FormData();
      myData.append("views", String(Number(advertisement.viewsNumber) + 1));
      await axios.put("https://back-birga.ywa.su/advertisement", myData, {
        params: {
          id: String(advertisement.id),
        },
      });
    } catch (e) {
      alert(e);
      console.warn(e);
    }
  }
);
export const deleteAd = createAsyncThunk(
  "information/deleteMyAd",
  async function (id) {
    try {
      await axios.delete("https://back-birga.ywa.su/advertisement", {
        params: {
          id: id,
        },
      });
      return id;
    } catch (e) {
      alert(e);
      console.warn(e);
    }
  }
);
export const putMyTask = createAsyncThunk(
  "inforation/putMyTask",
  async function (data) {
    try {
      let answ = await axios.put(
        "https://back-birga.ywa.su/advertisement",
        data[0],
        {
          params: {
            id: String(data[1]),
          },
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      let localTask = data[2];
      let changedFiles = [];

      for (let i = 0; i < localTask.photos.length; i++) {
        let file = localTask.photos[i];
        let blob = file.slice(0, file.size, "image/png");
        let newFile = new File([blob], answ.data.photos[i], {
          type: "image/png",
        });
        changedFiles.push(newFile);
      }
      localTask.photos = changedFiles;
      localTask.photosNames = answ.data.photos;

      return localTask;
    } catch (e) {
      console.warn(e);
    }

    return false;
  }
);

export const postMyTask = createAsyncThunk(
  "information/postMytask",
  async function (arr) {
    let files = arr[1];
    try {
      let b;

      // for (let i = 0 ; i < 500; i++){

      //   b = await axios.post("https://back-birga.ywa.su/advertisement", arr[0], {
      //     headers: {
      //       "Content-Type" :'multipart/form-data',
      //       "Access-Control-Allow-Origin": "*"
      //     },
      //   });
      // }


      let localTask;

      let one = new Date(b.data.startTime);

      let two;
      if (b.data.endTime) {
        two = new Date(b.data.endTime);
      } else {
        two = "";
      }
      let changedFiles = [];
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let blob = file.slice(0, file.size, "image/png");
          let newFile = new File([blob], b.data.photos[i], {
            type: "image/png",
          });
          changedFiles.push(newFile);
        }
      }

      localTask = {
        id: b.data.id,
        taskName: b.data.title,
        executionPlace: "Можно выполнить удаленно",
        time: { start: one, end: two },
        tonValue: b.data.price,
        taskDescription: b.data.description,
        photos: changedFiles,
        photosNames: b.data.photos,
        customerName: b.data.fl,
        userPhoto: b.data.photo || "",
        rate: "5",
        isActive: true,
        creationTime: b.data.createdAt,
        viewsNumber: b.data.views,
        category : b.data.category,
        status: "active",
      };
      return localTask;
    } catch (e) {
      alert(e)
      alert("Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже");
      console.log(e);
    }

    return true;
  }
);

export const setStartTask = createAsyncThunk(
  "information/setStartTask",
  async function (id) {
    try {
      let myData = new FormData();
      myData.append("status", "inProcess");
      await axios.put("https://back-birga.ywa.su/advertisement", myData, {
        params: {
          id: id,
        },
      });
      return id;
    } catch (e) {
      alert("Ошибка!");
      console.log(e);
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  "information/fetchMyOrders",

  async function (page) {
    try {
      let tasks = [];
      let task = await axios.get(
        "https://back-birga.ywa.su/advertisement/findByUser",
        {
          params: {
            page: page,
            userId: 2144832745,
            limit: 4,
            // userId : 2144832745
          },
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      // const urlToObject= async(image)=> {
      //   const response = await fetch(image);
      //   // here image is url/location of image
      //   const blob = await response.blob();
      //   const file = new File([blob], image, {type: blob.type});
      //   return file
      // }

      if (task.data.length === 0) {
        return [];
      } else {
        for (let order of task.data) {
          let files = await makeNewFile(order.folder, order.photos);
          let responseCounter = await axios.get("https://back-birga.ywa.su/response/countByAdvertisement" , {
            params : {
              "advertisementId" : order.id
            }
          })
          tasks.push({
            id: order.id,
            taskName: order.title,
            executionPlace: "Можно выполнить удаленно",
            time: {
              start: new Date(order.startTime),
              end: new Date(order.endTime),
            },
            tonValue: order.price,
            taskDescription: order.description,
            photos: files,
            photosNames: order.photos,
            rate: "5",
            isActive: true,
            creationTime: order.createdAt,
            viewsNumber: order.views,
            removedFiles: [],
            addedFiles: [],
            status: order.status,
            user : order.user,
            responseCounter : responseCounter.data,
            category : order.category.id
          });
        }
        return tasks;
      }
    } catch (e) {
      console.warn(e);
    }
  }
);

export const fetchTasksInformation = createAsyncThunk(
  "information/fetchTasksInformation",
  async function (par) {
    // const urlToObject= async(image)=> {
    //   const response = await fetch(image);
    //   // here image is url/location of image
    //   const blob = await response.blob();
    //   const file = new File([blob], image, {type: blob.type});
    //   return file
    // }
    let tasks = [];
    let task;
    try {
      task = await axios.get(
        "https://back-birga.ywa.su/advertisement/findAll",
        {
          params: {
            limit: 4,
            page: par,
          },
        }
      );
    } catch (e) {
      alert(e);
      console.log(e);
    }

    if (task.data.length === 0) {
      return [];
    } else {
      try {
        for (let order of task.data) {
          let one = new Date(order.startTime);

          let two;
          if (order.endTime) {
            two = new Date(order.endTime);
          } else {
            two = "";
          }

          let files = await makeNewFile(order.folder, order.photos);

          let imTwo = await axios.get(
            "https://back-birga.ywa.su/advertisement/findCount",
            {
              params: {
                userId: order.user.id,
              },
            }
          );

          tasks.push({
            id: order.id,
            taskName: order.title,
            executionPlace: "Можно выполнить удаленно",
            time: { start: one, end: two },
            tonValue: order.price,
            taskDescription: order.description,
            photos: files,
            photosName: order.photos,
            customerName: order.user.fl,
            userPhoto: order.user.photo || "",
            rate: "5",
            isActive: true,
            creationTime: order.createdAt,
            viewsNumber: order.views,
            responces: order.responses,
            status: order.status,
            user: order.user,
            createNumber : imTwo.data,
            category : order.category.id,
            subCategory : order.subCategory[0].id
          });
        }

      } catch (e) {
        console.warn(e);
      }
      return tasks;
    }
  }
);
const information = createSlice({
  name: "taskInformation",
  initialState: {
    orderStatus: null,
    myOrderStatus: null,
    changeOrderStatus: null,
    postTaskStatus: null,
    putTaskStatus: null,
    taskInformation: {
      category: { name: "", value: "" },
      subCategory: "Выбрать",
      taskName: "",
      taskDescription: "",
      photos: [],
      budget: 0,
      tonValue: 0,
      startTime: "",
      endTime: "",
      singleTime: "",
      isPrivate: false,
      time: { start: null, end: null },
    },

    orderInformations: [],

    myAdsArray: [],
    myPaginationArray: [],
  },
  reducers: {
    getMoreMyAds(state, action) {
      for (let i = action.payload * 6; i < action.payload * 6 + 6; i++) {
        if (state.myAdsArray[i]) {
          state.myPaginationArray.push(state.myAdsArray[i]);
        } else {
          state.myOrderStatus = "all";
          break;
        }
      }
    },

    changeStatus(state, action) {
      state.orderStatus = action.payload;
      state.orderInformations = [];
    },
    addResponce(state, action) {
      state.orderInformations = state.orderInformations.map((e) => {
        if (e.id === action.payload[0]) {
          e.responces.push(action.payload[1]);
        }
        console.log(e);
        return e;
      });
    },
    changeTaskInformation(state, action) {
      state.taskInformation = action.payload;
    },
    changeMyAds(state, action) {
      state.myAdsArray = action.payload;
    },
    putMyAds(state, action) {
      let changedAd = action.payload;
      state.myAdsArray = state.myAdsArray.map((myAd) => {
        if (changedAd.id === myAd.id) {
          myAd.taskName = changedAd.taskName;
          myAd.taskDescription = changedAd.taskDescription;
          myAd.tonValue = changedAd.tonValue;
          myAd.time = { start: changedAd.time.start, end: changedAd.time.end };
        }
        return myAd;
      });
    },
    addMyAds(state, action) {
      state.myAdsArray.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasksInformation.pending, (state) => {
      if (state.orderInformations.length > 0) {
        state.orderStatus = "complete";
      } else {
        state.orderStatus = "loading";
      }
    });

    builder.addCase(setStartTask.fulfilled, (state, action) => {
      state.myAdsArray = state.myAdsArray.map((e) => {
        if (e.id === action.payload) {
          let copy = e;
          copy.status = "inProcess";
          return copy;
        }
        return e;
      });
    });

    builder.addCase(fetchTasksInformation.fulfilled, (state, action) => {
      state.orderStatus = "complete";
      if (action.payload.length < 4) {
        state.orderStatus = "all";
      }
      state.orderInformations.push(...action.payload);
    });
    builder.addCase(fetchTasksInformation.rejected, (state, action) => {
      state.orderStatus = "error";
    });

    builder.addCase(fetchMyOrders.pending, (state) => {
      if (state.myAdsArray.length > 0){
        state.myOrderStatus = "completed";
      }
      else{
        state.myOrderStatus = "loading";
      }
    });
    builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
      state.myAdsArray.push(...action.payload);
      if (action.payload.length < 4) {
        state.myOrderStatus = "all";
      } else {
        state.myOrderStatus = "completed";
      }
    });
    builder.addCase(fetchMyOrders.rejected, (state, action) => {
      state.myOrderStatus = "error";

      alert();
    });
    builder.addCase(postMyTask.pending, (state) => {
      state.postTaskStatus = "pending";
    });
    builder.addCase(postMyTask.fulfilled, (state, action) => {
      state.postTaskStatus = "complete";
      state.myAdsArray.push(action.payload);
    });
    builder.addCase(postMyTask.rejected, (state) => {
      state.postTaskStatus = "error";
    });

    builder.addCase(putMyTask.pending, (state) => {
      state.putTaskStatus = "pending";
    });
    builder.addCase(putMyTask.fulfilled, (state, action) => {
      state.putTaskStatus = "complete";

      state.myAdsArray = state.myAdsArray.map((e) => {
        if (e.id === action.payload.id) {
          return action.payload;
        } else {
          return e;
        }
      });
    });
    builder.addCase(putMyTask.rejected, (state) => {
      state.putTaskStatus = "error";
    });
    builder.addCase(deleteAd.fulfilled, (state, action) => {
      state.myAdsArray = state.myAdsArray.filter(
        (e) => e.id !== action.payload
      );
    });
  },
});
export const {
  changeTaskInformation,
  changeMyAds,
  addMyAds,
  putMyAds,
  addResponce,
  changeStatus,
  getMoreMyAds,
} = information.actions;
export default information.reducer;
