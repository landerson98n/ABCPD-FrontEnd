import React, { ReactElement} from 'react'
import { HomeTemplate } from '@/src/components/HomeTemplate/HomeTemplate';

const Home = () => {
  return (
   <HomeTemplate />
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
      <>
        {page}
      </>
    );
  };
export default Home