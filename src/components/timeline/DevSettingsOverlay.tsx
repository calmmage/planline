import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DevSettingsOverlayProps {
  zoomLevelsScale: number
  setZoomLevelsScale: (value: number) => void
  numTicks: number
  setNumTicks: (value: number) => void
  onClose: () => void
}

export function DevSettingsOverlay({
  zoomLevelsScale,
  setZoomLevelsScale,
  numTicks,
  setNumTicks,
  onClose,
}: DevSettingsOverlayProps) {
  return (
    <div className="absolute top-12 right-2 z-20 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs w-full">
      <h2 className="text-lg font-bold mb-2">Dev Settings</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="zoom-levels-scale" className="text-sm">
            Zoom Levels Scale
          </Label>
          <div className="flex items-center space-x-2">
            <Slider
              id="zoom-levels-scale"
              min={0.1}
              max={10}
              step={0.1}
              value={[zoomLevelsScale]}
              onValueChange={(value) => setZoomLevelsScale(value[0])}
              className="w-32"
            />
            <Input
              type="number"
              value={zoomLevelsScale}
              onChange={(e) => setZoomLevelsScale(Number.parseFloat(e.target.value))}
              className="w-16 text-sm"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="num-ticks" className="text-sm">
            Number of Ticks
          </Label>
          <Input
            id="num-ticks"
            type="number"
            value={numTicks}
            onChange={(e) => setNumTicks(Number.parseInt(e.target.value))}
            className="w-16 text-sm"
          />
        </div>
      </div>
      <Button onClick={onClose} className="mt-4 w-full" size="sm">
        Close
      </Button>
    </div>
  )
}

