import useFetchMeals from '@/hooks/useFetchMeals'
import { Link } from 'react-router'

const NewMeals = () => {
  const { data } = useFetchMeals({
    sort: '-createdAt',
    limit: 5,
  })
  return (
    <section className='ending-soon-foods'>
      <div className='con py-10 space-y-6'>
        <h2 className='text-xl md:text-2xl font-bold mb-4'>
          Recently Added Meals
        </h2>
        <ul
          className='food-box-group grid
          grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]
           gap-4'
        >
          {data?.meals?.map((meal) => (
            <li key={meal._id}>
              <Link
                to={`/meals/${meal._id}`}
                className='block rounded-xl overflow-hidden'
              >
                <figure>
                  <img
                    className='w-full h-full object-cover max-w-[600px] aspect-[1.5/1]'
                    src={meal.image}
                    alt={meal.title}
                    loading='lazy'
                  />
                  <summary className='bg-black bg-opacity-80 p-4 py-1 text-white'>
                    {meal.title}
                  </summary>
                </figure>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default NewMeals
