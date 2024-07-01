import React from 'react'
import './NumbersSection.scss'

const numbers = [
  { id: '1', title: 'Total Income', number: '9,720', info: '21% more than last month' },
  { id: '2', title: 'Total products sold', number: '54', info: '13% more than last month' },
  { id: '3', title: 'Total Products', number: '12', info: '27% more than last month' },
  { id: '4', title: 'Total Page Views', number: '590', info: '75% more than last month' },
]

export const NumbersSection = () => {
  return (
    <section className='section'>
      <div className='container-fluid'>
        <div className='numbers-items items row'>
          {numbers.map((el) => {
            return (
              <div key={el.id} className='col-lg-3 col-12 items__item numbers-items__item item-bg item-bg--grid'>
                <div className='numbers-items__bg item-bg__bg'></div>
                <h3 className='numbers-items__title h4'>{el.title}</h3>
                <div className='numbers-items__number'>{el.number}</div>
                <div className='numbers-items__info'>{el.info}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
