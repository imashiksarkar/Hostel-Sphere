import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { categories } from '@/constants'
import { Category } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const categoriesEnum = categories.map((category: Category) => category.name)

const formSchema = z.object({
  title: z.string().trim().min(2, 'Min 2 chars.'),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: z.enum(categoriesEnum as any),
  image: z
    .custom<File>((val) => val instanceof File, {
      message: 'Invalid file type',
    })
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: 'File size must be under 5MB',
    })
    .refine(
      (file) =>
        ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'].includes(
          file.type
        ),
      {
        message: 'Only image files are allowed',
      }
    ),
  description: z.string().trim().min(10, 'Min 10 chars.'),
  ingredients: z
    .array(
      z.object({
        name: z.string().trim().min(3, 'Min 3 chars.'),
      })
    )
    .min(1, 'Min 1 ingredient'),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(100, 'Min price $100.')
  ),
})

const AddMeal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      ingredients: [{ name: '' }],
      price: 120,
      description: '',
    },
    mode: 'all',
  })

  const {
    control,
    formState: { isValid, isSubmitting },
  } = form

  const {
    fields: ingredientFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'ingredients',
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <section className='add-food'>
      <div className='con p-4 md:p-8'>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Chicken Biryani' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Meal Image</FormLabel>
                  <FormControl>
                    <Input
                      id='picture'
                      type='file'
                      onChange={(event) => {
                        const file = event.target.files?.[0]
                        field.onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Price</FormLabel>
                  <FormControl>
                    <Input placeholder='$100' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='uppercase'>
                        <SelectValue placeholder='Select a category to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoriesEnum.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className='uppercase'
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Most Popular Chicken Biryani'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-4'>
              {ingredientFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={control}
                  name={`ingredients.${index}.name`}
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel>Ingredient {index + 1}</FormLabel>
                      <FormControl>
                        <span className='flex items-center gap-4'>
                          <Input placeholder='Enter an ingredient' {...field} />
                          {index > 0 && (
                            <Button
                              type='button'
                              variant='destructive'
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type='button'
                variant='secondary'
                onClick={() => append({ name: '' })}
              >
                Add Ingredient
              </Button>
            </div>

            <Button disabled={!isValid} type='submit'>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </FormProvider>
        {/* <DevTool control={form.control} /> */}
      </div>
    </section>
  )
}

export default AddMeal
