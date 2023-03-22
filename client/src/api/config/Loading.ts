import { ElLoading } from "element-plus";
let loadingInstance: ReturnType<typeof ElLoading.service>

const startLoading = () => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: "loading",
    background: "rgba(0,0,0,0.7)"
  })
}

const endLoading = () => {
  loadingInstance.close();
}


let needLoadingRequestCount = 0;
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount==0){
    startLoading();
  }
  needLoadingRequestCount++;
}

export const tryHideFullScreenLoading=()=>{
  if (needLoadingRequestCount<=0) return ;
  needLoadingRequestCount--;
  if (needLoadingRequestCount==0){
    endLoading();
  }
}