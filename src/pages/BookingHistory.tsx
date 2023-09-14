import React from 'react'
import Navbar from '../components/Navbar'
import HistoryCard from '../components/BookingHistory/HistoryCard'
import Footer from '../components/Footer'

function BookingHistory() {
  return (
    <div>
        <Navbar/>
        <HistoryCard/>
        <Footer/>
    </div>
  )
}

export default BookingHistory