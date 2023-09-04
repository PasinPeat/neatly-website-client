import React from 'react'
import Navbar from '../components/Navbar'
import HorizontalSlidebar from '../components/HorizontalSlidebar'
import RoomDetailPageContent from '../components/RoomDetailPageContent'
import RoomDetailPageOtherRoom from '../components/RoomDetailPageOtherRoom'
import Footer from '../components/Footer'

function RoomDetail() {
  return (
    <>
    <Navbar/>
    <HorizontalSlidebar/>
    <RoomDetailPageContent/>
    <RoomDetailPageOtherRoom/>
    <Footer/>

    </>
  )
}

export default RoomDetail