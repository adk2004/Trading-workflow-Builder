import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { NodeKind } from "./CreateWorkflow"
import { SelectGroup,} from "@radix-ui/react-select";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { SUPPORTED_ASSETS } from "@/commonExports";
import type { TradingMetadata } from "@/components/nodes/actions/Lighter";


const SUPPORTED_ACTIONS =[
    {
        id  : "lighter",
        title: "Lighter",
        description : "Place a trade on Lighter",
    },
    {
        id  : "hyperliquid",
        title: "HyperLiquid",
        description : "Place a trade on HyperLiquid",
    },
    {
        id  : "backpack",
        title: "Backpack",
        description : "Place a trade on Backpack",
    },
];

const SUPPORTED_TRADES = ["LONG","SHORT"];

export function ActionSheet({ onSelect, open, setOpen }: {onSelect: (kind: NodeKind, metadata : any) => void, open: boolean, setOpen: (arg: boolean) => void }) {
    const [metadata, setMetadata] =  useState<TradingMetadata>({
      type: "LONG",
      qty: 0,
      symbol: "BTC"
    });
    const [selectedAction, setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id);
    return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">Add Action</SheetTitle>
          <SheetDescription className="text-base">
            Select and configure an action for your workflow.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          {/* Action Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">Select Action</label>
            <Select value= {selectedAction} onValueChange={(value) => setSelectedAction(value)}>
                <SelectTrigger className="w-full border-2 border-slate-200 rounded-lg">
                    <SelectValue placeholder="Select an Action" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {SUPPORTED_ACTIONS.map((t) => (
                            <SelectItem  key={t.id} value={t.id} >
                                {t.title}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <p className="text-xs text-slate-500">
              {SUPPORTED_ACTIONS.find(a => a.id === selectedAction)?.description}
            </p>
          </div>

          {/* Trade Configuration */}
          {(selectedAction === "lighter" || selectedAction === "backpack" || selectedAction === "hyperliquid") && (
            <div className="space-y-4 bg-slate-50 p-4 rounded-lg border-2 border-slate-200">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Quantity</label>
                <Input 
                  required={true} 
                  type="number" 
                  placeholder="Enter quantity"
                  className="w-full border-2 border-slate-200 rounded-lg focus:border-blue-400"
                  onChange={(e) => setMetadata(metadata => ({...metadata, qty: Number(e.target.value)}))}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Asset</label>
                <Select value= {metadata.symbol} onValueChange={(value) => {setMetadata(metadata => ({...metadata, symbol: value } as TradingMetadata))}}>
                  <SelectTrigger className="w-full border-2 border-slate-200 rounded-lg">
                      <SelectValue placeholder="Select an Asset" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectGroup>
                          {SUPPORTED_ASSETS.map((a) => (
                              <SelectItem  key={a} value={a} >
                                  {a}
                              </SelectItem>
                          ))}
                      </SelectGroup>
                  </SelectContent>
              </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Trade Type</label>
                <Select value= {metadata.type} onValueChange={(value) => {setMetadata(metadata => ({...metadata, type: value} as TradingMetadata))}}>
                  <SelectTrigger className="w-full border-2 border-slate-200 rounded-lg">
                      <SelectValue placeholder="Select type of trade" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectGroup>
                          {SUPPORTED_TRADES.map((a) => (
                              <SelectItem  key={a} value={a} >
                                  {a}
                              </SelectItem>
                          ))}
                      </SelectGroup>
                  </SelectContent>
              </Select>
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="mt-8 space-x-3">
          <SheetClose asChild>
            <Button 
              variant="outline" 
              className="flex-1 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </SheetClose>
          <Button 
            type="submit" 
            className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
            onClick={() => {onSelect(selectedAction as NodeKind, metadata);}}
          >
            Add Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}