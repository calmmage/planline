import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

interface DevSettingsProps {
  zoomLevelsScale: number
  setZoomLevelsScale: (value: number) => void
  numTicks: number
  setNumTicks: (value: number) => void
}

export function DevSettings({ zoomLevelsScale, setZoomLevelsScale, numTicks, setNumTicks }: DevSettingsProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 space-y-4">
      <div>
        <Label htmlFor="zoom-levels-scale">Zoom Levels Scale</Label>
        <div className="flex items-center space-x-2">
          <Slider
            id="zoom-levels-scale"
            min={0.1}
            max={10}
            step={0.1}
            value={[zoomLevelsScale]}
            onValueChange={(value) => setZoomLevelsScale(value[0])}
            className="w-64"
          />
          <Input
            type="number"
            value={zoomLevelsScale}
            onChange={(e) => setZoomLevelsScale(Number.parseFloat(e.target.value))}
            className="w-20"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="num-ticks">Number of Ticks</Label>
        <Input
          id="num-ticks"
          type="number"
          value={numTicks}
          onChange={(e) => setNumTicks(Number.parseInt(e.target.value))}
          className="w-20"
        />
      </div>
    </div>
  )
}

