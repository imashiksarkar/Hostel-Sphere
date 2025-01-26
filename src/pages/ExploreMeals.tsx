import MealsList from '@/components/MealsList'
import NumberRange from '@/components/NumberRange'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { categories } from '@/constants'
import { cn } from '@/lib/utils'

import useFetchUpcomingMeals from '@/hooks/useFetchUpcomingMeals'
import { useCallback, useState } from 'react'

const ExploreMeals = () => {
  const { data: meals } = useFetchUpcomingMeals()

  const [range, setRange] = useState<[number, number]>([10, 50])
  const [min, max] = range

  const handleCategoryChange = (category: string) => console.log(category)
  const handleRangeChange = useCallback(
    (value: [number, number]) => setRange(value),
    []
  )

  return (
    <main className='meals-page'>
      <section className={cn('explore-meals')}>
        <div className='con py-8 space-y-8'>
          <header className='text-center space-y-2'>
            <h1 className='text-2xl font-bold'>Explore Meals</h1>
            <p>A sneak peek of our meals</p>
          </header>

          <section className='w-full max-w-5xl inputs flex flex-col gap-6 items-center justify-self-center'>
            <h1 className='sr-only'>Search</h1>
            <form className='w-full flex gap-4 flex-col md:flex-row justify-center'>
              <Input />
              <Button type='submit'>Search</Button>
            </form>

            <div className='min-w-full flex flex-col md:flex-row justify-between gap-6 md:gap-12'>
              <section className='flex items-center gap-4 w-full max-w-xl'>
                <Badge>{min}</Badge>
                <NumberRange
                  range={[0, 100]}
                  value={range}
                  delta={20}
                  step={1}
                  onChange={handleRangeChange}
                />
                <Badge>{max}</Badge>
              </section>
              <section>
                <Select onValueChange={handleCategoryChange} defaultValue='all'>
                  <SelectTrigger className='min-w-[10rem]'>
                    <SelectValue placeholder='SELECT CATEGORY' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>ALL</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category.name}>
                        {category.name.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>
            </div>
          </section>

          <MealsList meals={meals} />
        </div>
      </section>
    </main>
  )
}

export default ExploreMeals
