import { useProductsQuery } from 'entities/product/api/product.api'
import React from 'react'
import { SectionTitle } from 'shared/ui'

export const ProductListPage = () => {
  const { data: products } = useProductsQuery()

  return (
    <section className='section product-list'>
      <div className='container-fluid'>
        <SectionTitle>Digital product</SectionTitle>
        <div className='product-items row'>
          {products?.map((product) => {
            return (
              <div key={product.id} className='product-items__item col-lg-3 col-12'>
                <h3 className='product-items__title'>{product.title}</h3>
                <div className='product-items__descr'>{product.text}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
