import { cn } from '@/lib/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Slider } from './ui/slider'

interface Props {
  range: [number, number]
  value: [number, number]
  delta: number
  step: number
  onChange?: (value: [number, number]) => void
  className?: string
}

const NumberRange = ({
  range,
  value,
  delta,
  step,
  onChange,
  className,
}: Props) => {
  const [minValue, maxValue] = range
  const [minDefaultValue, maxDefaultValue] = value

  const [priceRange, setPriceRange] = useState({
    min: minDefaultValue,
    max: maxDefaultValue,
  })

  const handleChange = useCallback(
    (type: 'min' | 'max') => (value: number[]) => {
      let [val] = value

      if (type === 'min' && priceRange.max - delta === val) return
      else if (priceRange.min + delta === val) return

      if (type === 'min') {
        const maxPossibleValForMinField = priceRange.max - delta
        val = maxPossibleValForMinField < val ? maxPossibleValForMinField : val
      } else {
        const minPossibleValForMaxField = priceRange.min + delta
        val = minPossibleValForMaxField > val ? minPossibleValForMaxField : val
      }

      setPriceRange((prev) => ({
        ...prev,
        [type]: val,
      }))
    },
    [priceRange, delta]
  )

  useEffect(() => {
    onChange?.([priceRange.min, priceRange.max])
  }, [priceRange, onChange])

  const calcPercentage = useCallback(
    (fst: number, snd: number) => Math.floor((fst / snd) * 100),
    []
  )

  const { sliderLeftOffset, sliderRightOffset } = useMemo(
    () => ({
      sliderLeftOffset: calcPercentage(priceRange.min, maxValue),
      sliderRightOffset: 100 - calcPercentage(priceRange.max, maxValue),
    }),
    [priceRange, maxValue, calcPercentage]
  )

  return (
    <div className={cn('relative h-min min-w-[8rem] w-full', className)}>
      <span
        className='absolute top-1/2 h-1.5 bg-primary z-10 rounded-full'
        style={{
          left: `${sliderLeftOffset}%`,
          right: `${sliderRightOffset}%`,
        }}
      />
      <Slider
        className='absolute cursor-pointer [&>span:nth-child(2)]:z-20 [&>span:nth-child(1)>span]:hidden'
        value={[priceRange.min]}
        max={maxValue}
        min={minValue}
        step={step}
        onValueChange={handleChange('min')}
      />
      <Slider
        className='absolute cursor-pointer [&>span:nth-child(2)]:z-20 [&>span:nth-child(1)>span]:hidden'
        value={[priceRange.max]}
        max={maxValue}
        min={minValue}
        step={step}
        onValueChange={handleChange('max')}
      />
    </div>
  )
}

export default NumberRange
