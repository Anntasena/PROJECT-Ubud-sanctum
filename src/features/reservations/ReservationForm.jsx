import styled from "styled-components";
import { useEffect } from "react";
import { HiMiniHomeModern, HiMiniUser } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Textarea from "../../ui/Textarea";

import { useCabins } from "../cabins/useCabins";
import { useCreateBooking } from "../bookings/useCreateBooking";
import { createGuest } from "../../services/apiGuest";
import { useSettings } from "../settings/useSettings";
import { COUNTRIES } from "../../lib/countries";

//= Styles ==============================
const TitleForm = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  color: var(--color-indigo-700);
  font-size: 2rem;
  font-weight: 500;
  padding: 2.5rem 0rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-indigo-700);
    transition: all 0.3s;
  }
`;

const P = styled.p`
  font-size: 1.2rem;
  color: var(--color-blue-700);
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 4rem 4em 3rem 4rem;
`;

//= Components ==========================
function ReservationForm() {
  const { cabins, isLoading } = useCabins();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { createBooking, isCreateBooking } = useCreateBooking();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      nationalID: "",
      nationality: "",
      cabinId: "",
      numGuests: 1,
      startDate: "",
      endDate: "",
      hasBreakfast: false,
      observations: "",
      cabinPrice: 0,
      extrasPrice: 0,
      totalPrice: 0,
      isPaid: false,
    },
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (cabins && cabins.length > 0) {
      setValue("cabinId", cabins[0].id);
      setValue("cabinPrice", cabins[0].regularPrice);
    }
  }, [cabins, setValue]);

  if (!cabins || cabins.length === 0 || isLoading || isLoadingSettings)
    return <Spinner />;

  const selectedCabin = cabins.find(
    (cabin) => cabin.id === Number(watch("cabinId"))
  );
  if (!selectedCabin) return <Spinner />;

  const breakfastPrice = settings.breakfastPrice;
  const minNights = settings.minBookingLength;
  const maxNights = settings.maxBookingLength;
  const maxGuests = settings.maxGuestsPerBooking;

  const numNights =
    watch("startDate") && watch("endDate")
      ? Math.ceil(
          (new Date(watch("endDate")) - new Date(watch("startDate"))) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const extrasPrice = watch("hasBreakfast")
    ? watch("numGuests") * breakfastPrice * numNights
    : 0;

  const totalPrice = selectedCabin.regularPrice * numNights + extrasPrice;

  const validateDates = (endDate) => {
    const startDate = watch("startDate");
    if (!startDate || !endDate) return true;

    const nights = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );

    if (nights < minNights) {
      return `Minimum booking length is ${minNights} nights.`;
    }

    if (nights > maxNights) {
      return `Maximum booking length is ${maxNights} nights.`;
    }

    return true;
  };

  const onSubmit = async (data) => {
    try {
      const [nationalityCode, nationalityName] = data.nationality.split(" ");

      const guest = await createGuest({
        fullName: data.fullName,
        email: data.email,
        nationalID: data.nationalID,
        nationality: nationalityName,
        countryFlag: `https://flagcdn.com/${nationalityCode.toLowerCase()}.svg`,
      });

      await createBooking({
        guestId: guest.id,
        cabinId: data.cabinId,
        startDate: data.startDate,
        endDate: data.endDate,
        numNights,
        numGuests: data.numGuests,
        status: "unconfirmed",
        hasBreakfast: data.hasBreakfast,
        observations: data.observations,
        cabinPrice: selectedCabin.regularPrice,
        extrasPrice,
        totalPrice,
        isPaid: data.isPaid,
      });

      // Reset form
      setValue("fullName", "");
      setValue("email", "");
      setValue("nationalID", "");
      setValue("nationality", "");
      setValue("cabinId", cabins[0].id);
      setValue("numGuests", 1);
      setValue("startDate", "");
      setValue("endDate", "");
      setValue("hasBreakfast", false);
      setValue("observations", "");
      setValue("cabinPrice", cabins[0].regularPrice);
      setValue("extrasPrice", 0);
      setValue("totalPrice", 0);
      setValue("isPaid", false);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TitleForm>
        <HiMiniUser />
        <p as="h2">Guest register</p>
      </TitleForm>

      {/* //= FULL NAME */}
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          {...register("fullName", { required: "Full name is required" })}
        />
      </FormRow>

      {/* //= EMAIL */}
      <FormRow label="Email" error={errors.email?.message}>
        <Input
          type="email"
          {...register("email", { required: "Email is required" })}
        />
      </FormRow>

      {/* //= NATIONAL ID */}
      <FormRow label="National ID" error={errors.nationalID?.message}>
        <Input
          type="text"
          {...register("nationalID", { required: "National ID is required" })}
        />
      </FormRow>

      {/* //= NATIONALITY */}
      <FormRow label="Nationality" error={errors.nationality?.message}>
        <Select
          {...register("nationality", { required: "Nationality is required" })}
          options={COUNTRIES.map((country) => ({
            value: `${country.value} ${country.title}`,
            label: country.title,
          }))}
        />
      </FormRow>

      <TitleForm>
        <HiMiniHomeModern />
        <p as="h2">Property reservation</p>
      </TitleForm>

      {/* //= CABIN ROOM */}
      <FormRow label="Property" error={errors.cabinId?.message}>
        <Select
          {...register("cabinId", { required: "Cabin selection is required" })}
          options={cabins.map((cabin) => ({
            value: cabin.id,
            label: cabin.name,
          }))}
        />
      </FormRow>

      {/* //= NUM GUEST */}
      <FormRow
        label={`Persons (${selectedCabin.maxCapacity} person capacity)`}
        error={errors.numGuests?.message}
      >
        <Input
          type="number"
          {...register("numGuests", {
            required: "Number of guests is required",
            min: { value: 1, message: "Minimum 1 guest" },
            max: {
              value: Math.min(selectedCabin.maxCapacity, maxGuests),
              message: `Maximum ${Math.min(
                selectedCabin.maxCapacity,
                maxGuests
              )} guests`,
            },
          })}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);

            const clampedValue = Math.min(
              Math.max(value, 1),
              Math.min(selectedCabin.maxCapacity, maxGuests)
            );

            setValue("numGuests", clampedValue);
          }}
          min={1}
          max={Math.min(selectedCabin.maxCapacity, maxGuests)}
        />
      </FormRow>

      {/* //= CHECKIN DATES */}
      <FormRow label="Check-in dates" error={errors.startDate?.message}>
        <Input
          type="date"
          {...register("startDate", { required: "Check-in date is required" })}
          min={today}
        />
      </FormRow>

      {/* //= CHECKOUT DATES */}
      <FormRow label="Check-out dates" error={errors.endDate?.message}>
        <Input
          type="date"
          {...register("endDate", {
            required: "Check-out date is required",
            validate: validateDates, // Validate against minNights and maxNights
          })}
          min={watch("startDate") || today}
        />
      </FormRow>

      {/* //= BREAKFAST */}
      <FormRow label="Breakfast">
        <Checkbox {...register("hasBreakfast")}>
          <P>Check if guest wants breakfast</P>
        </Checkbox>
      </FormRow>

      {/* //= OBSERVATION */}
      <FormRow label="Guest notes">
        <Textarea {...register("observations")} />
      </FormRow>

      {/* //= BUTTON */}
      <Div>
        <Button type="submit" disabled={isCreateBooking}>
          Booking & Register
        </Button>
      </Div>
    </Form>
  );
}

export default ReservationForm;
