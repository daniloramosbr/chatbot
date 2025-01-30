/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ButtonEx from "@/components/ButtonEx"
import { ContextJsx } from "@/context/Context"

export default function Home() {
  const [showStart, setShowStart] = useState(true)
  const [showInput, setShowInput] = useState(false)
  const [showButton, setShowButton] = useState(false)
 const {SendApi, data} = useContext(ContextJsx)
 
  const [dataForm, setDataForm] = useState({
    name: "",
  })

  console.log(dataForm)

  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md  bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="flex flex-row items-center gap-2 p-4 border-b border-white/10">
          <Bot className="w-6 h-6 text-primary " />
          <h1 className="text-xl font-bold text-white">ChatBot</h1>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="min-h-[300px] max-h-[500px] overflow-y-auto space-y-4">
            {showStart && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white transition-all"
                  onClick={() => {
                    setShowInput(true)
                    setShowStart(false)
                    setShowButton(true)
                    SendApi("start")
                  }}
                >
                  Começar Conversa
                </Button>
              </div>
            )}

            {showInput && data.message && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3">
                <div className="flex gap-2 items-start">
                  <div className="w-8 h-8 rounded-full  bg-primary flex items-center justify-center text-white">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="flex-1 flex-col bg-white/5 rounded-lg p-3 text-white">
                  
                  {data.message}
                 {data.sabor && <div> Sabor: {data.sabor && data.sabor} </div> }
                  {data.quant && <div> Quantidade: {data.quant && data.quant} </div> }
                  
                  
                  </div>
                </div>
               <div className="flex gap-1 items-center justify-center">
              {data.menu && data.menu.map((item: any, index: any) => {
                return (
                <ButtonEx valor={item} key={index} />
                 );
        })}

               </div>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    HandleChange(e as any)
                  }}
                  className="flex gap-2"
                >
             {showButton || data.message === "Para começar, Digite seu nome: " ? (
  <div className="flex w-full gap-1">
    <Input
      className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
      placeholder="Digite sua mensagem..."
      onChange={HandleChange}
      name="name"
    />
    <Button
      onClick={() => {
        SendApi(dataForm.name);
        setDataForm({ name: "" });
        setShowButton(false);
      }}
      type="submit"
      size="icon"
      className="bg-primary hover:bg-primary/90"
    >
      <Send className="w-4 h-4" />
      <span className="sr-only">Enviar mensagem</span>
    </Button>
  </div>
) : null}

                  
                </form>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
