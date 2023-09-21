import CustomerBooking from '../components/Admin/CustomerBooking'
import HotelInformation from '../components/Admin/HotelInformation'
import RoomAndProperty from '../components/Admin/RoomAndProperty'
import RoomManagement from '../components/Admin/RoomManagement'
import Sidebar from '../components/Admin/Sidebar'
function Admin() {
  return (
    <>
    <Sidebar/>
    <CustomerBooking/>
    <HotelInformation/>
    <RoomAndProperty/>
    <RoomManagement/>
    </>
  )
}

export default Admin