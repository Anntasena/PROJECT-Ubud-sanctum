import ReservationForm from "../features/reservations/ReservationForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Reservations() {
  return (
    <Row>
      <Heading as="h1">Reservation</Heading>
      <ReservationForm />
    </Row>
  );
}

export default Reservations;
