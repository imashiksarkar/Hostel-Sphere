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

import useFetchMeals from '@/hooks/useFetchMeals'
import { FormEvent, useCallback } from 'react'
import { useSearchParams } from 'react-router'

const ExploreMeals = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchInput = searchParams.get('q') ?? undefined
  const limit = parseInt(searchParams.get('limit') || '10')
  const skip = parseInt(searchParams.get('skip') || '0')
  const sort = searchParams.get('sort') ?? undefined
  const category = searchParams.get('category')
  const searchPriceMin = searchParams.get('price[gte]')
  const searchPriceMax = searchParams.get('price[lte]')
  const range = [
    parseInt(searchPriceMin || '0') || 0,
    parseInt(searchPriceMax || '1000') || 1000,
  ] as [number, number]

  const { data } = useFetchMeals({
    q: searchInput,
    limit,
    skip,
    sort,
    category: category === 'all' ? undefined : category ?? undefined,
    minPrice: range[0],
    maxPrice: range[1],
  })

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSearchParams(
      (prev) => {
        prev.set('q', new FormData(event.currentTarget).get('query') as string)

        return prev
      },
      {
        replace: true,
      }
    )
  }
  const handleCategoryChange = (category: string) => {
    setSearchParams(
      (prev) => {
        if (category) {
          prev.set('category', category)
        }

        return prev
      },
      {
        replace: true,
      }
    )
  }
  const handleRangeChange = useCallback(
    (value: [number, number]) => {
      setSearchParams(
        (prev) => {
          prev.set('price[gte]', value[0].toString())
          prev.set('price[lte]', value[1].toString())

          return prev
        },
        {
          replace: true,
        }
      )
    },
    [category, searchInput, setSearchParams]
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
            <form
              onSubmit={handleSearchSubmit}
              className='w-full flex gap-4 flex-col md:flex-row justify-center'
            >
              <Input name='query' defaultValue={searchInput || ''} />
              <Button type='submit'>Search</Button>
            </form>

            <div className='min-w-full flex flex-col md:flex-row justify-between gap-6 md:gap-12'>
              <section className='flex items-center gap-4 w-full max-w-xl'>
                <Badge>{searchPriceMin}</Badge>
                <NumberRange
                  range={[0, 2000]}
                  value={range}
                  delta={200}
                  step={1}
                  onChange={handleRangeChange}
                />
                <Badge>{searchPriceMax}</Badge>
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
          {!data?.meals.length && <p className='flex items-center justify-center w-full h-full py-12'>No meals found</p>}
          {data?.meals && <MealsList meals={data?.meals} />}
        </div>
      </section>
    </main>
  )
}

export default ExploreMeals
