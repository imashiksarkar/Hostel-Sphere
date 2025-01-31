import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthProvider'
import useFetchMeal from '@/hooks/useFetchMeal'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

const FoodDetail = () => {
  const { user, loading } = useAuth()
  const { mealId } = useParams()
  const navigate = useNavigate()

  const { data: meal, isFetching } = useFetchMeal(mealId as string)

  // const deleteFoodMutation = useDeleteFood(mealId as string)
  // const createFoodRequestMutation = useCreateFoodRequest(mealId as string)

  const [isAuthor, setIsAuthor] = useState(false)

  user
    ?.getIdTokenResult(true)
    .then((res) => setIsAuthor(res.claims.role === 'admin'))

  const handleDeleteFood = async () => {
    // deleteFoodMutation.mutate(mealId as string, {
    //   onSuccess: () => {
    //     navigate('/dashboard/foods')
    //   },
    // })
  }

  const handleMakeRequest = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createFoodRequestMutation.mutate(null, {
      onSuccess: () => {
        navigate(`/foods/${mealId}`)
      },
    })
  }

  return (
    <section className='food-detail'>
      <div className='con py-12 grid gird-cols-1 sm:grid-cols-[2fr,_3fr] gap-4'>
        {isFetching || loading ? (
          <div className='h-screen w-full flex gap-7 flex-col justify-center items-center'>
            <p>Fetching Food...</p>
          </div>
        ) : (
          meal && (
            <>
              <div className='banner'>
                <figure className='w-full aspect-square overflow-hidden'>
                  <img
                    className='w-full h-full object-cover'
                    src={meal.image}
                    alt={meal.title}
                    loading='lazy'
                  />
                </figure>
              </div>
              <div className='details flex flex-col gap-4'>
                <h1 className='text-4xl font-bold'>{meal.title}</h1>
                <p>{meal.description}</p>
                <p>Donated By: {meal.distributor}</p>
                <p className='capitalize'>Category: {meal.category}</p>
                <p className='p-2 bg-red-600/15 w-max capitalize rounded-md'>
                  {meal.status}
                </p>

                <div className='flex items-center gap-4'>
                  {isAuthor && (
                    <>
                      <Button className='w-max' asChild>
                        <Link to={`/foods/${meal._id}/edit`}>Update food</Link>
                      </Button>
                      <Button onClick={handleDeleteFood} className='w-max'>
                        Delete food
                      </Button>
                    </>
                  )}
                  {!isAuthor && meal.status === 'available' && (
                    <Button onClick={handleMakeRequest} className='w-max'>
                      Make Request
                    </Button>
                  )}
                </div>
              </div>
            </>
          )
        )}
      </div>
    </section>
  )
}

export default FoodDetail
