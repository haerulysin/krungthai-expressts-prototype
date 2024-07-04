const config = {
  ktb_api_base_link:
    "https://business.krungthai.com/ktb/rest/biznext-channel/v1",
  // ktb_api_base_link : "https://460595d2-bc55-4e71-b759-1342ed0b869a.mock.pstmn.io/v1",
  defaultHeader: {
    "X-Channel-ID": "WB",
    "Accept-Language": "en-TH",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0",
    "X-Correlation-ID": "",
  },
  defaultHeaderMobile: {
    "Accept-Language": "en-TH",
    "X-Channel-ID": "MB",
    "User-Agent": "Krungthai/1 CFNetwork/1494.0.7 Darwin/23.4.0",
    "Content-Type": "application/json",
    "X-Client-Version": "3.3.1",
    "X-Correlation-ID": "",
  },
} as const;
export default config;
