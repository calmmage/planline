# Instead of linear scale parameters use log / exponential ones 

Use simple conversion formula to assign values 
- update values in [config.tsx](../../../src/config/config.tsx)

Make sure to update usage properly everywhere
- [ ] update [timeline.tsx](../../../src/components/timeline/timeline.tsx)

```
<div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between p-2 bg-opacity-80 bg-gray-100 dark:bg-gray-800">
  <div className="text-sm">Visible time range: {calculateVisibleTimeRange()}</div>
  <Slider
    min={MIN_SCALE}
    max={MAX_SCALE}
    step={0.0001}
    value={[scale]}
    onValueChange={handleZoomChange}
    className="w-64"
  />
```