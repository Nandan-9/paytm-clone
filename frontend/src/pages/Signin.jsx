import { BottomWarning } from "../components/BottomWarning"
import  {Button}  from "../components/Button"
import {Heading} from "../components/Heading"
import  {InputBox}  from "../components/InputBox"
import  {SubHeading}  from "../components/SubHeading"

export const Signin = () => {

    return <div className="bg-gradient-to-r from-slate-700 to-slate-800 h-screen flex justify-center">
    <div className="flex flex-col justify-center ">
      <div className="rounded-lg bg-gradient-to-l from-gray-800 to-slate-700 	 w-[400px] text-center p-2 h-[500px] px-6 space-y-5">
        <Heading label={"sign in"}/>
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
      </div>
    </div>
  </div>
}