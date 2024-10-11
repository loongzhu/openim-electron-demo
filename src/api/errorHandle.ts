// import { message } from "@/AntdGlobalComp";
import { ErrCodeMap } from "@/constants";
import { useGlobalStore } from "@/store/global";

interface ErrorData {
  errCode: number;
  errMsg?: string;
}

export const errorHandle = (err: unknown) => {
  const errData = err as ErrorData;
  const globalStore = useGlobalStore();
  if (errData.errMsg) {
    // message.error(ErrCodeMap[errData.errCode] || errData.errMsg);
    globalStore.message.error(ErrCodeMap[errData.errCode] || errData.errMsg);
  }
};
