import axios from "axios";

export default new (class CallApi {
  /**
   * 輸入廠別、IP、參數呼叫API
   */
  async ExecuteApi(ip: string, json: object, header?: object) {
    if (ip) {
      return axios.post(ip, json, header ? header : {});
    }
  }
})();
