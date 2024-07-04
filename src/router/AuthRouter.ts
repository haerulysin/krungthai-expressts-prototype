import express, { NextFunction, Request, Response } from "express";
import { KTBank } from "../controller/KTBank";
import SubmitTransfer, {
  SubmitLoginOTP,
  SubmiTransferWebConfirmation,
  SubmitTransferMobile,
} from "../controller/SubmitTransfer";
import { KTBankError } from "../controller/KTBankError";

const AuthRouter = express.Router();

async function TestFn() {
  throw new KTBankError("TestFn", "Test:TestFn", 400);
  return "TestFn Called";
}
AuthRouter.get(
  "/test",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(201).json({ message: await TestFn() });
    } catch (e) {
      next(e);
    }
  }
);

AuthRouter.post(
  "/start",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let launchBot = await SubmitTransfer(req.body);
      return res.send(launchBot);
    } catch (e) {
      next(e);
    }
  }
);

AuthRouter.post(
  "/login/otp",
  async (req: Request, res: Response, next: NextFunction) => {
    let valid =
      req.body.companyId &&
      req.body.username &&
      req.body.password &&
      req.body.otp;
    if (!valid) {
      // throw new KTBankError({ message: "JSON Body Not Valid !" }, "POST:login/otp", 401);
      return res.status(401).json({
        message: "JSON Body not valid !",
      });
    }
    try {
      let submitOTP = await SubmitTransfer(req.body);
      return res.status(200).json(submitOTP);
    } catch (e) {
      next(e);
    }
    // return res.send("SubmitLoginOtp()");
  }
);

AuthRouter.post(
  "/submit",
  async (req: Request, res: Response, next: NextFunction) => {
    let valid =
      req.body.companyId &&
      req.body.username &&
      req.body.password &&
      req.body.otp.recipient;
    if (!valid) {
      // throw new KTBankError({ message: "JSON Body Not Valid !" }, "POST:login/otp", 401);
      return res.status(401).json({
        message: "JSON Body not valid !",
      });
    }
    try {
      let submit = await SubmitTransfer(req.body);
      return res.status(200).json(submit);
    } catch (e) {
      next(e);
    }
  }
);

AuthRouter.post(
  "/submit/confirm",
  async (req: Request, res: Response, next: NextFunction) => {
    let valid =
      req.body.companyId &&
      req.body.username &&
      req.body.otp;
    if (!valid) {
      // throw new KTBankError({ message: "JSON Body Not Valid !" }, "POST:login/otp", 401);
      return res.status(401).json({
        message: "JSON Body not valid !",
      });
    }

    try{
      let submitTransfer = await SubmiTransferWebConfirmation({
        companyId: req.body.companyId,
        username: req.body.username,
        password: req.body.password,
        otp:req.body.otp,
        mfaRefId:req.body.mfaRefId
      })

      return res.json(submitTransfer)
    }catch(e){
      next(e)
    }
  }
);

AuthRouter.post("/login", async (req: Request, res: Response) => {
  const { companyId, username, password } = req.body;
  const kt = new KTBank();
  try {
    const login = await kt.login();
    req.app.locals[login!.token!] = kt;
    return res.status(200).json(login);
  } catch (e) {
    if (e instanceof KTBankError) {
      return res.status(401).json({
        message: e.message,
      });
    }
    return res.status(500).json({
      message: "Unexpected Error",
    });
  }
});

AuthRouter.post(
  "/start/mobile",
  async (req: Request, res: Response, next: NextFunction) => {
    let valid =
      req.body.companyId &&
      req.body.username &&
      req.body.password &&
      req.body.pin &&
      req.body.deviceId &&
      req.body.recipient;
    if (!valid) {
      // throw new KTBankError({ message: "JSON Body Not Valid !" }, "POST:login/otp", 401);
      return res.status(401).json({
        message: "JSON Body not valid !",
      });
    }
    try {
      const submitTransfer = await SubmitTransferMobile(req.body);
      return res.status(200).json(submitTransfer);
    } catch (e) {
      next(e);
    }
  }
);

function _setKTClass(req: Request, res: Response) {
  const token = req.headers.authorization;
  const { otp } = req.params;
  if (!token) {
    return null;
  }

  return req.app.locals[token];
}
export default AuthRouter;
