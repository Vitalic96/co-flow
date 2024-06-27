import { Link } from 'react-router-dom'
import { Arrow, Down, Up } from 'shared/ui/icon'

const items = [
  { id: '1', title: 'Total Income', number: '9,720', info: '21% more than last month' },
  { id: '2', title: 'Total products sold', number: '54', info: '13% more than last month' },
  { id: '3', title: 'Total Products', number: '12', info: '27% more than last month' },
  { id: '4', title: 'Total Page Views', number: '590', info: '75% more than last month' },
]

const transaction = [
  { title: 'Nick Carrots', date: 'Feb 2nd', price: '180 USD', status: 'up' },
  { title: 'Nick Carrots', date: 'Feb 2nd', price: '180 USD', status: 'up' },
  { title: 'Nick Carrots', date: 'Feb 2nd', price: '180 USD', status: 'up' },
  { title: 'Nick Carrots', date: 'Feb 2nd', price: '180 USD', status: 'up' },
  { title: 'Nick Carrots', date: 'Feb 2nd', price: '180 USD', status: 'up' },
  { title: 'Nick Carrots', date: 'Feb 2nd', price: '180 USD', status: 'down' },
]

export const MainPage = () => {
  return (
    <div className='container-fluid'>
      <section className='section s-numbers'>
        <div className='numbers-items row'>
          {items.map((el) => {
            return (
              <div className='col-lg-3 col-12' key={el.id}>
                <div className='numbers-items__item '>
                  <h3 className='numbers-items__title h4'>{el.title}</h3>
                  <div className='numbers-items__number'>{el.number}</div>
                  <div className='numbers-items__info'>{el.info}</div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <section className='section s-transaction'>
        <div className='transaction row'>
          <div className='col-lg-6 col-12'>
            <div className='transaction__item transaction__info'>
              <div className='transaction__item-head'>
                <div className='transaction__item-title h4'>Transactions</div>
                <div className='transaction__item-tabs tabs'>
                  <div className='tabs'>
                    <div className='tabs__item tabs__item--active'>USD</div>
                    <div className='tabs__item'>EUR</div>
                  </div>
                </div>
              </div>
              <ul className='transaction__list'>
                {transaction.map((el, i) => {
                  return (
                    <li key={i} className='transaction__list-item'>
                      <div className='transaction__list-title'>{el.title}</div>
                      <div className='transaction__list-date'>{el.date}</div>
                      <div className='transaction__list-price'>
                        {el.status === 'up' ? <Up /> : <Down />}
                        {el.price}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className='col-lg-6 col-12'>
            <div className='transaction__item transaction__chart'>
              <div className='transaction__chart-total'>21,500 USD</div>
              <Link to={'/'} className='transaction__chart-link text-link text-white'>
                Revenue report
                <Arrow />
              </Link>
            </div>
          </div>
          <div className='col-lg-4 col-12'>
            <div className='transaction__item transaction__info'>
              <div className='transaction__info-head'>
                <div className='transaction__title h4'>Sources</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
