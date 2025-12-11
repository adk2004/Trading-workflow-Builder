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
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { NodeKind } from "./CreateWorkflow"
import { SelectGroup,} from "@radix-ui/react-select";
import { useState } from "react";
import type { PriceTriggerData } from "commondata/types";
import type { TimerData } from "commondata/types";
import { Input } from "./ui/input";
import { SUPPORTED_ASSETS } from "commondata/types";


const SUPPORTED_TRIGGERS =[
    {
        id : "timeTrigger",
        title: "Time Trigger",
        description : "Triggers at a specific time or interval.",
    },
    {
        id  : "priceTrigger",
        title: "Price Trigger",
        description : "Triggers when a specific price point is reached.",
    }  
];


export function TriggerSheet({ onSelect}: {onSelect: (kind: NodeKind, metadata : any) => void}) {
    const [metadata, setMetadata] =  useState<PriceTriggerData | TimerData>({time:3600} as TimerData);
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);
    return (
    <Sheet open={true}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">Choose Trigger</SheetTitle>
          <SheetDescription className="text-base">
            Select a trigger to start your workflow.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Trigger Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">Select Trigger Type</label>
            <Select value= {selectedTrigger} onValueChange={(value) => setSelectedTrigger(value)}>
                <SelectTrigger className="w-full border-2 border-slate-200 rounded-lg">
                    <SelectValue placeholder="Select a Trigger" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {SUPPORTED_TRIGGERS.map((t) => (
                            <SelectItem  key={t.id} value={t.id} >
                                {t.title}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <p className="text-xs text-slate-500">
              {SUPPORTED_TRIGGERS.find(t => t.id === selectedTrigger)?.description}
            </p>
          </div>

          {/* Timer Configuration */}
          {selectedTrigger === "timeTrigger" && (
            <div className="space-y-2 bg-linear-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200">
              <label className="block text-sm font-semibold text-green-900">Interval (Seconds)</label>
              <Input 
                required={true} 
                type="number" 
                placeholder="Enter number of seconds"
                className="w-full border-2 border-green-300 rounded-lg focus:border-green-400 bg-white"
                onChange={(e) => setMetadata({time: Number(e.target.value)})}
              />
              <p className="text-xs text-green-700 mt-2">Workflow will trigger every N seconds</p>
            </div>
          )}

          {/* Price Trigger Configuration */}
          {selectedTrigger === "priceTrigger" && (
            <div className="space-y-4 bg-linear-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-2 border-orange-200">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-orange-900">Asset</label>
                <Select value= {(metadata as PriceTriggerData).asset} onValueChange={(value) => {setMetadata(metadata => ({...metadata, asset: value}))}}>
                  <SelectTrigger className="w-full border-2 border-orange-300 rounded-lg bg-white">
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
                <label className="block text-sm font-semibold text-orange-900">Target Price ($)</label>
                <Input 
                  required={true} 
                  type="number" 
                  placeholder="Enter price threshold"
                  className="w-full border-2 border-orange-300 rounded-lg focus:border-orange-400 bg-white"
                  onChange={(e) => setMetadata(metadata => ({...metadata, price: Number(e.target.value)}))}
                />
              </div>

              <p className="text-xs text-orange-700 mt-2">Workflow will trigger when price reaches this threshold</p>
            </div>
          )}
        </div>

        <SheetFooter className="mt-8">
          <Button 
            type="submit" 
            className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow py-2"
            onClick={() => {onSelect(selectedTrigger as NodeKind, metadata);}}
          >
            ✓ Set Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}