import classNames from 'classnames'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Arrow, Down, Up } from 'shared/ui/icon'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import dayjs from 'dayjs'
import { BarPlot, ChartContainer, LineChart, PieChart } from '@mui/x-charts'
import { transaction } from './transaction-data'
import './TransactionSection.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const currencies = ['USD', 'EUR'] as const
type Currencies = (typeof currencies)[number]

const converts: Record<Currencies, number> = {
  USD: 1,
  EUR: 0.9,
}

export const TransactionSection = () => {
  const [currentCurrency, changeCurrency] = useState<Currencies>('USD')

  const convertedTransaction = useMemo(
    () => transaction.map((el) => ({ ...el, price: Number((el.price * converts[currentCurrency]).toFixed(2)) })),
    [currentCurrency],
  )
  const total = useMemo(
    () => Number(convertedTransaction.reduce((prev, cur) => prev + cur.price, 0).toFixed(2)),
    [convertedTransaction],
  )

  const groupByMonthAndYearTransaction = useMemo(
    () =>
      convertedTransaction
        .reduce((prev, cur) => {
          const transaction = {
            year: cur.date.getFullYear(),
            month: cur.date.getMonth(),
            total: cur.price,
          }
          const found = prev.find((el) => el.month === transaction.month && el.year === transaction.year)
          if (found) found.total += transaction.total
          else prev.push(transaction)
          return prev
        }, [] as { month: number; year: number; total: number }[])
        .reverse(),
    [convertedTransaction],
  )

  const values = useMemo(
    () => Object.values(groupByMonthAndYearTransaction).map((el) => el.total),
    [groupByMonthAndYearTransaction],
  )
  const labels = useMemo(() => Object.entries(groupByMonthAndYearTransaction), [groupByMonthAndYearTransaction])

  return (
    <section className='section'>
      <div className='container-fluid'>
        <div className='transaction row'>
          <div className='col-lg-6 col-12'>
            <div className='transaction__item transaction__item--info'>
              <div className='transaction__item-head'>
                <div className='transaction__item-title h4'>Transactions</div>
                <div className='transaction__item-tabs tabs'>
                  {currencies.map((el, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => changeCurrency(el)}
                        className={classNames('tabs__item', { 'tabs__item--active': currentCurrency === el })}
                      >
                        {el}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='transaction__table-wrapper'>
                <table className='transaction__table'>
                  <tbody>
                    {convertedTransaction.map((el, i) => {
                      return (
                        <tr key={i} className='transaction__table-tr'>
                          <td className='transaction__table-td transaction__table-td--title'>{el.title}</td>
                          <td className='transaction__table-td transaction__table-td--date'>
                            {dayjs(el.date).format('MMM D, YYYY')}
                          </td>
                          <td className='transaction__table-td transaction__table-td--price'>
                            {el.price > 0 ? <Up /> : <Down />}
                            {el.price} {currentCurrency}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-12'>
            <div className='transaction__item transaction__item--chart'>
              <div className='transaction__item-total'>
                {total} {currentCurrency}
              </div>
              <Link to={'/'} className='transaction__item-link text-link text-white'>
                Revenue report
                <Arrow />
              </Link>

              <div className='transaction__item-chart'>
                <ChartContainer
                  width={680}
                  height={350}
                  series={[{ data: values, label: 'pv', type: 'bar' }]}
                  xAxis={[{ scaleType: 'band', data: labels }]}
                  colors={['rgba(255,255,255,.3)']}
                  className='transaction__item-chart'
                >
                  <BarPlot borderRadius={7} />
                </ChartContainer>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-12'>
            <div className='transaction__item transaction__item--info'>
              <h3 className='transaction__item-title h4'>Sources</h3>
              <div className='transaction__item-chart-bottom'>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: 'Direct' },
                        { id: 1, value: 15, label: 'Social' },
                        { id: 2, value: 20, label: 'Search' },
                        { id: 3, value: 5, label: 'Email' },
                      ],
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 180,
                      cx: 150,
                      cy: 150,
                    },
                  ]}
                  width={375}
                  height={250}
                />
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-12'>
            <div className='transaction__item transaction__item--info'>
              <h3 className='transaction__item-title h4'>Downloads</h3>
              <div className='transaction__item-total text-primary text-bold'>21,500</div>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    area: true,
                  },
                ]}
                width={375}
                height={250}
                colors={['#98D77A']}
              />
            </div>
          </div>
          <div className='col-lg-4 col-12'>
            <div className='transaction__item transaction__item--info'>
              <h3 className='transaction__item-title h4'>Unique visitors</h3>
              <div className='transaction__item-total text-primary text-bold'>32,800</div>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    area: true,
                  },
                ]}
                width={375}
                height={250}
                colors={['#52AADC']}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
