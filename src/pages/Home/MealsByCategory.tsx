import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useFetchCategories from '@/hooks/useFetchCategories'
import useFetchMeals from '@/hooks/useFetchMeals'
import { useState } from 'react'
import { Link } from 'react-router'

const MealsByCategory = () => {
  const [category, setCategory] = useState<string>('all')
  const { data: categories } = useFetchCategories()
  const { data } = useFetchMeals({
    category: category === 'all' ? undefined : category,
    limit: 5,
  })

  return (
    <section className='meals-categories'>
      <div className='con flex flex-col gap-4 items-center py-8'>
        <h1 className='text-2xl font-bold'>Meals By Category</h1>

        <section className='category-tab w-full'>
          <Tabs
            defaultValue='all'
            className='flex flex-col items-center'
            onValueChange={(value) => setCategory(value)}
          >
            <TabsList>
              <TabsTrigger value='all'>All Meals</TabsTrigger>
              {categories?.map((category) => (
                <TabsTrigger
                  key={category._id}
                  value={category.name}
                  className='capitalize'
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent
              value={category}
              className='product-list grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 py-4 min-h-[24rem] w-full'
            >
              <h1 className='sr-only'>Product List</h1>

              {data?.meals.map((meal) => (
                <Card
                  key={meal._id}
                  className='text-wrap p-2 rounded-lg max-w-[20rem]'
                >
                  <CardHeader className='space-y-0 p-0'>
                    <figure className='aspect-video bg-red-300 overflow-hidden'>
                      <img
                        className='w-full h-full object-cover'
                        src={meal.image}
                        alt={meal.title}
                        loading='lazy'
                      />
                    </figure>
                    <CardTitle className='pt-5 pb-3 overflow-hidden'>{meal.title}</CardTitle>
                    <CardDescription className='pb-3'>
                      ${meal.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-2 p-0'>
                    <p className='capitalize p-2 bg-red-400/20 w-max rounded-md'>
                      {meal.rating.toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter className='p-0 mt-5'>
                    <Button asChild>
                      <Link to={`/meals/${meal._id}`}>See Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </section>
  )
}

export default MealsByCategory
