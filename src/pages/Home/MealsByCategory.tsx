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
import { foods } from '@/constants'
import useFetchCategories from '@/hooks/useFetchCategories'
import { Link } from 'react-router'

const MealsByCategory = () => {
  const { data: categories } = useFetchCategories()

  return (
    <section className='meals-categories'>
      <div className='con flex flex-col gap-4 items-center py-8'>
        <h1 className='text-2xl font-bold'>Meals By Category</h1>

        <section className='category-tab w-full'>
          <Tabs defaultValue='all' className='flex flex-col items-center'>
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
              value='all'
              className='product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 py-4 min-h-[24rem]'
            >
              <h1 className='sr-only'>Product List</h1>
              {foods.map((food) => (
                <Card key={food._id} className='text-wrap p-2 rounded-lg'>
                  <CardHeader className='space-y-0 p-0'>
                    <figure className='aspect-video bg-red-300 overflow-hidden'>
                      <img
                        className='w-full h-full object-cover'
                        src={food.image}
                        alt={food.title}
                        loading='lazy'
                      />
                    </figure>
                    <CardTitle className='pt-5 pb-3'>{food.title}</CardTitle>
                    <CardDescription className='pb-3'>
                      {food.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-2 p-0'>
                    <p className='capitalize p-2 bg-red-400/20 w-max rounded-md'>
                      {food.rating}
                    </p>
                  </CardContent>
                  <CardFooter className='p-0 mt-5'>
                    <Button asChild>
                      <Link to={`/meals/${food._id}`}>See Details</Link>
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
