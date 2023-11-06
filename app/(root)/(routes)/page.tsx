
import Categories from '@/components/Categories'
import SearchInput from '@/components/SearchInput'
import prismadb from '@/lib/prismadb'
import React from 'react'
// server component which ahs access to the database
const RootPage = async () => {

  const category = await prismadb.category.findMany()
  return (
    <div  className='h-full p-4 space-y-2'>
      <SearchInput />
      <Categories 
        data={category}
      />
    </div>
  )
}

export default RootPage