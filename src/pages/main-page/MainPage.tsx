import { NumbersSection, TransactionSection } from 'widgets'

export const MainPage = () => {
  return (
    <>
      <NumbersSection />
      <TransactionSection />
    </>
  )
}

{
  /* <BarChart
                  dataset={totalByMounthTransaction}
                  xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                  series={[{ dataKey: 'total' }]}
                  width={600}
                  height={400}
                  colors={['#fff']}
                  borderRadius={7}
                /> */
}
