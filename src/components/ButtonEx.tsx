import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ContextJsx } from "@/context/Context";

interface Info {
  valor: string;
}

export default function ButtonEx({ valor }: Info) {
  
  const { SendApi } = useContext(ContextJsx);

  return (
    <Button onClick={() => SendApi(valor)} className="text-white">
      {valor}
    </Button>
  );
}
