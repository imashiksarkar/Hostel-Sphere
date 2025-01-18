import MealsList from '@/components/MealsList'
import NumberRange from '@/components/NumberRange'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { meals } from '@/constants'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const ExploreMeals = () => {
  const [range, setRange] = useState<[number, number]>([10, 50])
  const [min, max] = range

  return (
    <main className='meals-page'>
      <section className={cn('explore-meals')}>
        <div className='con py-8 space-y-8'>
          <section className='inputs'>
            <h1 className='sr-only'>Search</h1>
            <form className='flex gap-4 flex-col md:flex-row justify-center'>
              <Input className='max-w-xl' />
              <Button type='submit'>Search</Button>
            </form>

            <section className='flex items-center gap-4'>
              <Badge>{min}</Badge>
              <NumberRange
                range={[0, 100]}
                value={[0, 100]}
                delta={20}
                step={1}
                onChange={(value) => setRange(value)}
                // onChange={(value) => console.log(value)}
                className='max-w-sm'
              />
              <Badge>{max}</Badge>
            </section>
          </section>

          <header className='text-center space-y-2'>
            <h1 className='text-2xl font-bold'>Explore Meals</h1>
            <p>A sneak peek of our meals</p>
          </header>

          <MealsList meals={meals} />
        </div>
      </section>
    </main>
  )
}

export default ExploreMeals
