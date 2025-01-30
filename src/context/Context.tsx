/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import axios from "axios";

let myVar: any;

export const ContextJsx = createContext(myVar);                //criando  context

type TitleProps = {
  children: any;
}

export const ContextProvider: any = ({ children }: TitleProps) => {

    async function SendApi(option: string) {
        try {
          const res = await axios.post("https://api-chatbot-ruby.vercel.app/bot", {
            option: option,
          })
          setData(res.data)
        } catch (error) {
          console.log(error)
        }
      }

      const [data, setData] = useState<any>({}); 

  return (
    <ContextJsx.Provider value={{ SendApi, data, setData  }}>{children}</ContextJsx.Provider>
  );
}